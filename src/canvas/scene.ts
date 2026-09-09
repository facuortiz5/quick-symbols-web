import { SpatialGrid, type CircleBody } from "./collisions";
import { LANDING_SYMBOLS, type LandingSymbol } from "../data/landing-symbols";

export interface ScenePalette {
  symbol: string;
  symbolHover: string;
}

interface SymbolParticle extends CircleBody {
  readonly id: number;
  readonly entry: LandingSymbol;
  readonly sizeRatio: number;
  burstStartX: number;
  burstStartY: number;
  burstTargetX: number;
  burstTargetY: number;
  boundaryRadius: number;
  size: number;
  scale: number;
  targetScale: number;
  speedScale: number;
  targetSpeedScale: number;
  pulse: number;
  previousX: number;
  previousY: number;
  stalledFrames: number;
  hitBounds: GlyphBounds;
  metricsFont: string;
  metricLeftExtent: number;
  metricRightExtent: number;
  metricAscent: number;
  metricDescent: number;
}

interface CircleObstacle {
  x: number;
  y: number;
  radius: number;
}

interface ParticleBounds {
  minimumX: number;
  maximumX: number;
  minimumY: number;
  maximumY: number;
}

interface GlyphBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
}

const GRID_CELL_SIZE = 78;
const MAX_FRAME_SECONDS = 1 / 30;
const SPEED_INCREASE = 1.2;
const INITIAL_BURST_DURATION_SECONDS = 0.75;
const INITIAL_CLUSTER_RADIUS = 34;
const INITIAL_DRIFT_VELOCITY_BLEND = 0.35;
const MAX_BURST_TO_DRIFT_ANGLE = Math.PI * 0.44;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const OBSTACLE_CLEARANCE = 0.5;
const MINIMUM_ESCAPE_SPEED = 1.5;
const STALLED_DISTANCE = 0.02;
const STALLED_FRAME_LIMIT = 30;

export class SymbolScene {
  readonly #canvas: HTMLCanvasElement;
  readonly #obstacleElement: HTMLElement;
  readonly #context: CanvasRenderingContext2D;
  readonly #grid = new SpatialGrid(GRID_CELL_SIZE);
  readonly #pauseReasons = new Set<string>();
  readonly #reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  #particles: SymbolParticle[] = [];
  #obstacle: CircleObstacle = { x: 0, y: 0, radius: 0 };
  #palette: ScenePalette;
  #width = 1;
  #height = 1;
  #frameRequest: number | null = null;
  #lastFrameTime = 0;
  #hoveredId: number | null = null;
  #pressedId: number | null = null;
  #resizeRequest: number | null = null;
  #initialBurstElapsed = 0;
  #initialBurstActive = false;

  constructor(canvas: HTMLCanvasElement, obstacleElement: HTMLElement, palette: ScenePalette) {
    this.#canvas = canvas;
    this.#obstacleElement = obstacleElement;
    this.#palette = palette;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("Canvas 2D is not available in this browser.");
    this.#context = context;

    this.#resize();
    this.#initialBurstActive = !this.#reducedMotionQuery.matches;
    this.#particles = this.#createParticles(this.#initialBurstActive);
    for (const particle of this.#particles) {
      this.#resolveConstraints(particle);
      this.#stabilizeVelocity(particle);
      particle.previousX = particle.x;
      particle.previousY = particle.y;
    }
    this.#render(0);

    window.addEventListener("resize", this.#scheduleResize, { passive: true });
    window.visualViewport?.addEventListener("resize", this.#scheduleResize, { passive: true });
    this.#reducedMotionQuery.addEventListener("change", this.#handleMotionPreference);
    this.resume("initial");
  }

  get particleCount(): number {
    return this.#particles.length;
  }

  setPalette(palette: ScenePalette): void {
    this.#palette = palette;
    this.#render(0);
  }

  clientPointToLocal(clientX: number, clientY: number): { x: number; y: number } | null {
    const bounds = this.#canvas.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) return null;

    const cssX = clientX - bounds.left;
    const cssY = clientY - bounds.top;
    if (cssX < 0 || cssY < 0 || cssX > bounds.width || cssY > bounds.height) return null;

    return {
      x: cssX * (this.#width / bounds.width),
      y: cssY * (this.#height / bounds.height),
    };
  }

  hitTest(x: number, y: number, pointerType = "mouse"): number | null {
    let closestId: number | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    const padding = pointerType === "touch" || pointerType === "pen" ? 5 : 3;

    for (const particle of this.#particles) {
      const bounds = particle.hitBounds;
      if (
        x < bounds.left - padding ||
        x > bounds.right + padding ||
        y < bounds.top - padding ||
        y > bounds.bottom + padding
      ) {
        continue;
      }

      const deltaX = x - bounds.centerX;
      const deltaY = y - bounds.centerY;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;
      if (distanceSquared < closestDistance) {
        closestDistance = distanceSquared;
        closestId = particle.id;
      }
    }

    return closestId;
  }

  getParticleById(id: number): { id: number; symbol: string; name: string } | null {
    const particle = this.#particles.find((candidate) => candidate.id === id);
    return particle
      ? { id: particle.id, symbol: particle.entry.symbol, name: particle.entry.nameEn }
      : null;
  }

  getParticleIdAt(index: number): number | null {
    const particle = this.#particles[index];
    return particle?.id ?? null;
  }

  setHovered(id: number | null): void {
    if (this.#hoveredId === id) return;
    this.#hoveredId = id;

    for (const particle of this.#particles) {
      const isHovered = particle.id === id;
      particle.targetScale = isHovered ? 1.13 : 1;
      particle.targetSpeedScale = isHovered ? 0.08 : 1;
    }
  }

  setPressed(id: number | null): void {
    this.#pressedId = id;
    for (const particle of this.#particles) {
      if (particle.id === id) particle.targetScale = 0.9;
      else if (particle.id === this.#hoveredId) particle.targetScale = 1.13;
    }
  }

  pulse(id: number): void {
    const particle = this.#particles.find((candidate) => candidate.id === id);
    if (!particle) return;
    particle.pulse = 1;
    particle.targetScale = 1.16;
  }

  pause(reason: string): void {
    this.#pauseReasons.add(reason);
    if (this.#frameRequest !== null) {
      cancelAnimationFrame(this.#frameRequest);
      this.#frameRequest = null;
    }
  }

  resume(reason: string): void {
    this.#pauseReasons.delete(reason);
    if (this.#pauseReasons.size > 0 || this.#frameRequest !== null) return;
    this.#lastFrameTime = performance.now();
    this.#frameRequest = requestAnimationFrame(this.#tick);
  }

  destroy(): void {
    this.pause("destroyed");
    window.removeEventListener("resize", this.#scheduleResize);
    window.visualViewport?.removeEventListener("resize", this.#scheduleResize);
    this.#reducedMotionQuery.removeEventListener("change", this.#handleMotionPreference);
    if (this.#resizeRequest !== null) cancelAnimationFrame(this.#resizeRequest);
  }

  readonly #tick = (time: number): void => {
    this.#frameRequest = null;
    if (this.#pauseReasons.size > 0) return;

    const delta = Math.min((time - this.#lastFrameTime) / 1000, MAX_FRAME_SECONDS);
    this.#lastFrameTime = time;
    this.#update(delta);
    this.#render(delta);
    this.#frameRequest = requestAnimationFrame(this.#tick);
  };

  #update(delta: number): void {
    for (const particle of this.#particles) {
      particle.scale = damp(particle.scale, particle.targetScale, 12, delta);
      particle.speedScale = damp(particle.speedScale, particle.targetSpeedScale, 7, delta);
      particle.pulse = Math.max(0, particle.pulse - delta * 3.8);
    }

    let movementDelta = delta;
    if (this.#initialBurstActive) {
      movementDelta = this.#updateInitialBurst(delta);
      if (this.#initialBurstActive || movementDelta <= 0) return;
    }

    const motionMultiplier = this.#reducedMotionQuery.matches ? 0.1 : 1;

    for (const particle of this.#particles) {
      const travel = movementDelta * particle.speedScale * motionMultiplier;
      particle.x += particle.vx * travel;
      particle.y += particle.vy * travel;
      this.#resolveConstraints(particle);
    }

    this.#grid.rebuild(this.#particles, this.#width);
    this.#grid.resolve(this.#particles);

    for (const particle of this.#particles) {
      this.#resolveConstraints(particle);
      this.#stabilizeVelocity(particle);
      this.#guardAgainstStall(particle, this.#reducedMotionQuery.matches);
    }
  }

  #updateInitialBurst(delta: number): number {
    const burstDelta = Math.min(
      delta,
      INITIAL_BURST_DURATION_SECONDS - this.#initialBurstElapsed,
    );
    this.#initialBurstElapsed += burstDelta;
    const progress = this.#initialBurstElapsed / INITIAL_BURST_DURATION_SECONDS;
    const easedProgress = easeOutCubic(progress);
    const driftDistance =
      INITIAL_BURST_DURATION_SECONDS *
      (INITIAL_DRIFT_VELOCITY_BLEND * progress +
        (1 - INITIAL_DRIFT_VELOCITY_BLEND) * integratedSmoothstep(progress));

    for (const particle of this.#particles) {
      particle.x =
        interpolate(particle.burstStartX, particle.burstTargetX, easedProgress) +
        particle.vx * driftDistance;
      particle.y =
        interpolate(particle.burstStartY, particle.burstTargetY, easedProgress) +
        particle.vy * driftDistance;
      this.#resolveConstraints(particle);
      particle.previousX = particle.x;
      particle.previousY = particle.y;
    }

    if (progress >= 1) this.#initialBurstActive = false;
    return delta - burstDelta;
  }

  #render(_delta: number): void {
    const context = this.#context;
    context.clearRect(0, 0, this.#width, this.#height);
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (const particle of this.#particles) {
      const isHovered = particle.id === this.#hoveredId;
      const isPressed = particle.id === this.#pressedId;
      const fontSize = particle.size * this.#renderedScale(particle);
      const font = `${isHovered || isPressed ? 600 : 500} ${fontSize}px Georgia, "Times New Roman", "Segoe UI Symbol", serif`;

      context.save();
      context.translate(particle.x, particle.y);
      context.font = font;
      context.fillStyle = isHovered || isPressed ? this.#palette.symbolHover : this.#palette.symbol;
      context.globalAlpha = isPressed ? 0.82 : 0.94;
      if (particle.metricsFont !== font) {
        const metrics = context.measureText(particle.entry.symbol);
        particle.metricsFont = font;
        particle.metricLeftExtent = finitePositive(metrics.actualBoundingBoxLeft, metrics.width / 2);
        particle.metricRightExtent = finitePositive(metrics.actualBoundingBoxRight, metrics.width / 2);
        particle.metricAscent = finitePositive(metrics.actualBoundingBoxAscent, fontSize * 0.5);
        particle.metricDescent = finitePositive(metrics.actualBoundingBoxDescent, fontSize * 0.4);
      }
      const baselineY = particle.y + fontSize * 0.025;
      particle.hitBounds = {
        left: particle.x - particle.metricLeftExtent,
        right: particle.x + particle.metricRightExtent,
        top: baselineY - particle.metricAscent,
        bottom: baselineY + particle.metricDescent,
        centerX: particle.x + (particle.metricRightExtent - particle.metricLeftExtent) / 2,
        centerY: baselineY + (particle.metricDescent - particle.metricAscent) / 2,
      };
      context.fillText(particle.entry.symbol, 0, fontSize * 0.025);
      context.restore();
    }
  }

  #renderedScale(particle: SymbolParticle): number {
    return particle.scale * (1 + easeOutCubic(particle.pulse) * 0.16);
  }

  #createParticles(withInitialBurst: boolean): SymbolParticle[] {
    const particles: SymbolParticle[] = [];
    const [minimumSize, maximumSize] = this.#sizeRange();
    const clusterRadius = Math.min(
      INITIAL_CLUSTER_RADIUS,
      Math.min(this.#width, this.#height) * 0.055,
    );

    for (let index = 0; index < LANDING_SYMBOLS.length; index += 1) {
      const entry = LANDING_SYMBOLS[index];
      if (!entry) continue;
      const sizeRatio = Math.random();
      const size = interpolate(minimumSize, maximumSize, sizeRatio);
      const radius = this.#measureCollisionRadius(entry.symbol, size);
      const boundaryRadius = size * 0.52 + 6;
      const targetPosition = this.#findOpenPosition(radius, boundaryRadius, particles);
      const speed = randomBetween(7, 15) * SPEED_INCREASE * (this.#width < 600 ? 0.82 : 1);
      const burstAngle = index * GOLDEN_ANGLE + randomBetween(-0.18, 0.18);
      const burstDistance = Math.sqrt(Math.random()) * clusterRadius;
      const burstPosition = withInitialBurst
        ? {
            x: this.#width / 2 + Math.cos(burstAngle) * burstDistance,
            y: this.#height / 2 + Math.sin(burstAngle) * burstDistance,
          }
        : targetPosition;
      const departureAngle = Math.atan2(
        targetPosition.y - burstPosition.y,
        targetPosition.x - burstPosition.x,
      );
      const angle = withInitialBurst
        ? departureAngle + randomBetween(-MAX_BURST_TO_DRIFT_ANGLE, MAX_BURST_TO_DRIFT_ANGLE)
        : randomBetween(0, Math.PI * 2);

      particles.push({
        id: index,
        entry,
        sizeRatio,
        x: burstPosition.x,
        y: burstPosition.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        boundaryRadius,
        size,
        scale: 1,
        targetScale: 1,
        speedScale: 1,
        targetSpeedScale: 1,
        pulse: 0,
        burstStartX: burstPosition.x,
        burstStartY: burstPosition.y,
        burstTargetX: targetPosition.x,
        burstTargetY: targetPosition.y,
        previousX: burstPosition.x,
        previousY: burstPosition.y,
        stalledFrames: 0,
        hitBounds: {
          left: burstPosition.x,
          right: burstPosition.x,
          top: burstPosition.y,
          bottom: burstPosition.y,
          centerX: burstPosition.x,
          centerY: burstPosition.y,
        },
        metricsFont: "",
        metricLeftExtent: 0,
        metricRightExtent: 0,
        metricAscent: 0,
        metricDescent: 0,
      });
    }

    return particles;
  }

  #measureCollisionRadius(symbol: string, size: number): number {
    this.#context.save();
    this.#context.font = `500 ${size}px Georgia, "Times New Roman", "Segoe UI Symbol", serif`;
    const metrics = this.#context.measureText(symbol);
    this.#context.restore();

    const width =
      finitePositive(metrics.actualBoundingBoxLeft, metrics.width / 2) +
      finitePositive(metrics.actualBoundingBoxRight, metrics.width / 2);
    const height =
      finitePositive(metrics.actualBoundingBoxAscent, size * 0.5) +
      finitePositive(metrics.actualBoundingBoxDescent, size * 0.4);

    return Math.max(8, Math.max(width / 2, height * 0.46) + 2);
  }

  #findOpenPosition(
    radius: number,
    boundaryRadius: number,
    particles: readonly SymbolParticle[],
  ): { x: number; y: number } {
    const padding = boundaryRadius + 4;
    let candidate = {
      x: randomBetween(padding, Math.max(padding, this.#width - padding)),
      y: randomBetween(padding, Math.max(padding, this.#height - padding)),
    };

    for (let attempt = 0; attempt < 72; attempt += 1) {
      let overlaps = false;
      const obstacleDistance = Math.hypot(
        candidate.x - this.#obstacle.x,
        candidate.y - this.#obstacle.y,
      );
      if (obstacleDistance < boundaryRadius + this.#obstacle.radius) overlaps = true;

      for (const particle of particles) {
        if (overlaps) break;
        const deltaX = candidate.x - particle.burstTargetX;
        const deltaY = candidate.y - particle.burstTargetY;
        const clearance = radius + particle.radius + 3;
        if (deltaX * deltaX + deltaY * deltaY < clearance * clearance) {
          overlaps = true;
          break;
        }
      }

      if (!overlaps) return candidate;
      candidate = {
        x: randomBetween(padding, Math.max(padding, this.#width - padding)),
        y: randomBetween(padding, Math.max(padding, this.#height - padding)),
      };
    }

    return candidate;
  }

  #resolveEdges(particle: SymbolParticle): void {
    const radius = particle.boundaryRadius * Math.max(1, particle.scale);

    if (particle.x < radius) {
      particle.x = radius;
      particle.vx = Math.abs(particle.vx) * 0.94;
    } else if (particle.x > this.#width - radius) {
      particle.x = this.#width - radius;
      particle.vx = -Math.abs(particle.vx) * 0.94;
    }

    if (particle.y < radius) {
      particle.y = radius;
      particle.vy = Math.abs(particle.vy) * 0.94;
    } else if (particle.y > this.#height - radius) {
      particle.y = this.#height - radius;
      particle.vy = -Math.abs(particle.vy) * 0.94;
    }
  }

  #resolveConstraints(particle: SymbolParticle): void {
    this.#resolveEdges(particle);
    this.#resolveObstacle(particle);
    this.#resolveEdges(particle);
  }

  #resolveObstacle(particle: SymbolParticle): boolean {
    const particleRadius = particle.boundaryRadius * Math.max(1, particle.scale);
    const minimumDistance = particleRadius + this.#obstacle.radius;
    let deltaX = particle.x - this.#obstacle.x;
    let deltaY = particle.y - this.#obstacle.y;
    let distance = Math.hypot(deltaX, deltaY);

    if (distance >= minimumDistance) return false;
    if (distance < 0.001) {
      deltaX = this.#width / 2 - this.#obstacle.x;
      deltaY = this.#height / 2 - this.#obstacle.y;
      distance = Math.hypot(deltaX, deltaY) || 1;
    }

    const exitDistance = minimumDistance + OBSTACLE_CLEARANCE;
    const particleBounds = {
      minimumX: particleRadius,
      maximumX: this.#width - particleRadius,
      minimumY: particleRadius,
      maximumY: this.#height - particleRadius,
    };
    let targetX = this.#obstacle.x + (deltaX / distance) * exitDistance;
    let targetY = this.#obstacle.y + (deltaY / distance) * exitDistance;

    if (!isPointWithinBounds(targetX, targetY, particleBounds)) {
      const candidates = circleExitCandidates(
        this.#obstacle,
        exitDistance,
        particleBounds,
      ).filter((candidate) =>
        isEscapeDirectionFeasible(candidate, this.#obstacle, particleBounds),
      );
      const closest = candidates.reduce<{ x: number; y: number } | null>((best, candidate) => {
        if (!best) return candidate;
        return squaredDistance(candidate, particle) < squaredDistance(best, particle)
          ? candidate
          : best;
      }, null);

      if (closest) {
        targetX = closest.x;
        targetY = closest.y;
      } else {
        const corners = [
          { x: particleBounds.minimumX, y: particleBounds.minimumY },
          { x: particleBounds.maximumX, y: particleBounds.minimumY },
          { x: particleBounds.minimumX, y: particleBounds.maximumY },
          { x: particleBounds.maximumX, y: particleBounds.maximumY },
        ];
        const farthest = corners.reduce((best, candidate) =>
          squaredDistance(candidate, this.#obstacle) > squaredDistance(best, this.#obstacle)
            ? candidate
            : best,
        );
        targetX = farthest.x;
        targetY = farthest.y;
      }
    }

    particle.x = clamp(targetX, particleBounds.minimumX, particleBounds.maximumX);
    particle.y = clamp(targetY, particleBounds.minimumY, particleBounds.maximumY);

    const resolvedDeltaX = particle.x - this.#obstacle.x;
    const resolvedDeltaY = particle.y - this.#obstacle.y;
    const resolvedDistance = Math.hypot(resolvedDeltaX, resolvedDeltaY) || 1;
    const resolvedNormalX = resolvedDeltaX / resolvedDistance;
    const resolvedNormalY = resolvedDeltaY / resolvedDistance;
    const outwardSpeed = particle.vx * resolvedNormalX + particle.vy * resolvedNormalY;

    if (outwardSpeed < MINIMUM_ESCAPE_SPEED) {
      const correction = MINIMUM_ESCAPE_SPEED - outwardSpeed;
      particle.vx += correction * resolvedNormalX;
      particle.vy += correction * resolvedNormalY;
    }

    return true;
  }

  #stabilizeVelocity(particle: SymbolParticle): void {
    const speed = Math.hypot(particle.vx, particle.vy);
    const minimumSpeed = 5.5 * SPEED_INCREASE;
    const maximumSpeed = 17 * SPEED_INCREASE;

    if (speed < 0.001) {
      particle.vx = minimumSpeed;
      particle.vy = 0;
      return;
    }

    if (speed >= minimumSpeed && speed <= maximumSpeed) return;
    const targetSpeed = clamp(speed, minimumSpeed, maximumSpeed);
    const adjustment = targetSpeed / speed;
    particle.vx *= adjustment;
    particle.vy *= adjustment;
  }

  #guardAgainstStall(particle: SymbolParticle, reducedMotion: boolean): void {
    const distanceMoved = Math.hypot(
      particle.x - particle.previousX,
      particle.y - particle.previousY,
    );
    particle.previousX = particle.x;
    particle.previousY = particle.y;

    const intentionallySlowed = particle.targetSpeedScale < 0.5 || particle.speedScale < 0.5;
    if (reducedMotion || intentionallySlowed || distanceMoved >= STALLED_DISTANCE) {
      particle.stalledFrames = 0;
      return;
    }

    particle.stalledFrames += 1;
    if (particle.stalledFrames < STALLED_FRAME_LIMIT) return;

    let directionX = particle.x - this.#obstacle.x;
    let directionY = particle.y - this.#obstacle.y;
    const obstacleDistance = Math.hypot(directionX, directionY);
    const nearObstacle = obstacleDistance < particle.boundaryRadius + this.#obstacle.radius + 12;

    if (!nearObstacle || obstacleDistance < 0.001) {
      const angle = ((particle.id * 137.508 + 31) % 360) * (Math.PI / 180);
      directionX = Math.cos(angle);
      directionY = Math.sin(angle);
    }

    const radius = particle.boundaryRadius * Math.max(1, particle.scale);
    if (particle.x <= radius + 1 && directionX < 0) directionX = Math.abs(directionX);
    if (particle.x >= this.#width - radius - 1 && directionX > 0) directionX = -directionX;
    if (particle.y <= radius + 1 && directionY < 0) directionY = Math.abs(directionY);
    if (particle.y >= this.#height - radius - 1 && directionY > 0) directionY = -directionY;

    const directionLength = Math.hypot(directionX, directionY) || 1;
    const recoverySpeed = 5.5 * SPEED_INCREASE;
    particle.vx = (directionX / directionLength) * recoverySpeed;
    particle.vy = (directionY / directionLength) * recoverySpeed;
    particle.stalledFrames = 0;
  }

  #sizeRange(): readonly [number, number] {
    if (this.#width <= 480) return [19, 34];
    if (this.#width < 768) return [22, 42];
    return [28, 60];
  }

  readonly #scheduleResize = (): void => {
    if (this.#resizeRequest !== null) return;
    this.#resizeRequest = requestAnimationFrame(() => {
      this.#resizeRequest = null;
      const previousWidth = this.#width;
      const previousHeight = this.#height;
      this.#resize();

      const widthRatio = this.#width / previousWidth;
      const heightRatio = this.#height / previousHeight;
      for (const particle of this.#particles) {
        particle.x *= widthRatio;
        particle.y *= heightRatio;
        particle.burstStartX *= widthRatio;
        particle.burstStartY *= heightRatio;
        particle.burstTargetX *= widthRatio;
        particle.burstTargetY *= heightRatio;
      }

      const [minimumSize, maximumSize] = this.#sizeRange();
      for (const particle of this.#particles) {
        particle.size = interpolate(minimumSize, maximumSize, particle.sizeRatio);
        particle.radius = this.#measureCollisionRadius(particle.entry.symbol, particle.size);
        particle.boundaryRadius = particle.size * 0.52 + 6;
      }

      for (const particle of this.#particles) {
        this.#resolveConstraints(particle);
        particle.previousX = particle.x;
        particle.previousY = particle.y;
        particle.stalledFrames = 0;
      }
      this.#render(0);
    });
  };

  #resize(): void {
    const bounds = this.#canvas.getBoundingClientRect();
    this.#width = Math.max(1, bounds.width);
    this.#height = Math.max(1, bounds.height);
    const obstacleBounds = this.#obstacleElement.getBoundingClientRect();
    this.#obstacle = {
      x: obstacleBounds.left - bounds.left + obstacleBounds.width / 2,
      y: obstacleBounds.top - bounds.top + obstacleBounds.height / 2,
      radius: Math.hypot(obstacleBounds.width, obstacleBounds.height) / 2 + 8,
    };
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, this.#width < 768 ? 1.5 : 1.75);

    this.#canvas.width = Math.round(this.#width * devicePixelRatio);
    this.#canvas.height = Math.round(this.#height * devicePixelRatio);
    this.#context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  readonly #handleMotionPreference = (): void => {
    if (this.#reducedMotionQuery.matches && this.#initialBurstActive) {
      this.#initialBurstActive = false;
      for (const particle of this.#particles) {
        particle.x = particle.burstTargetX;
        particle.y = particle.burstTargetY;
        this.#resolveConstraints(particle);
      }
    }
    this.#render(0);
  };
}

function isPointWithinBounds(x: number, y: number, bounds: ParticleBounds): boolean {
  return (
    x >= bounds.minimumX &&
    x <= bounds.maximumX &&
    y >= bounds.minimumY &&
    y <= bounds.maximumY
  );
}

function circleExitCandidates(
  obstacle: CircleObstacle,
  radius: number,
  bounds: ParticleBounds,
): Array<{ x: number; y: number }> {
  const candidates: Array<{ x: number; y: number }> = [];
  const addCandidate = (x: number, y: number): void => {
    if (isPointWithinBounds(x, y, bounds)) candidates.push({ x, y });
  };

  addCandidate(obstacle.x - radius, obstacle.y);
  addCandidate(obstacle.x + radius, obstacle.y);
  addCandidate(obstacle.x, obstacle.y - radius);
  addCandidate(obstacle.x, obstacle.y + radius);

  for (const x of [bounds.minimumX, bounds.maximumX]) {
    const deltaX = x - obstacle.x;
    const remainder = radius * radius - deltaX * deltaX;
    if (remainder < 0) continue;
    const deltaY = Math.sqrt(remainder);
    addCandidate(x, obstacle.y - deltaY);
    addCandidate(x, obstacle.y + deltaY);
  }

  for (const y of [bounds.minimumY, bounds.maximumY]) {
    const deltaY = y - obstacle.y;
    const remainder = radius * radius - deltaY * deltaY;
    if (remainder < 0) continue;
    const deltaX = Math.sqrt(remainder);
    addCandidate(obstacle.x - deltaX, y);
    addCandidate(obstacle.x + deltaX, y);
  }

  return candidates;
}

function isEscapeDirectionFeasible(
  point: { x: number; y: number },
  obstacle: CircleObstacle,
  bounds: ParticleBounds,
): boolean {
  const directionX = point.x - obstacle.x;
  const directionY = point.y - obstacle.y;
  const tolerance = 0.25;

  if (point.x <= bounds.minimumX + tolerance && directionX < 0) return false;
  if (point.x >= bounds.maximumX - tolerance && directionX > 0) return false;
  if (point.y <= bounds.minimumY + tolerance && directionY < 0) return false;
  if (point.y >= bounds.maximumY - tolerance && directionY > 0) return false;
  return true;
}

function squaredDistance(
  first: { x: number; y: number },
  second: { x: number; y: number },
): number {
  const deltaX = first.x - second.x;
  const deltaY = first.y - second.y;
  return deltaX * deltaX + deltaY * deltaY;
}

function finitePositive(value: number, fallback: number): number {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function randomBetween(minimum: number, maximum: number): number {
  return minimum + Math.random() * (maximum - minimum);
}

function interpolate(minimum: number, maximum: number, ratio: number): number {
  return minimum + (maximum - minimum) * ratio;
}

function damp(current: number, target: number, rate: number, delta: number): number {
  return current + (target - current) * (1 - Math.exp(-rate * delta));
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function easeOutCubic(value: number): number {
  return 1 - Math.pow(1 - value, 3);
}

function integratedSmoothstep(value: number): number {
  return value * value * value - 0.5 * value * value * value * value;
}
