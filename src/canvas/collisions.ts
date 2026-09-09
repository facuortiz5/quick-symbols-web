export interface CircleBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NEIGHBOR_OFFSETS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
] as const;

export class SpatialGrid {
  readonly #cells = new Map<number, number[]>();
  readonly #cellSize: number;
  #columns = 1;

  constructor(cellSize: number) {
    this.#cellSize = cellSize;
  }

  rebuild(bodies: readonly CircleBody[], width: number): void {
    this.#cells.clear();
    this.#columns = Math.max(1, Math.ceil(width / this.#cellSize) + 2);

    for (let index = 0; index < bodies.length; index += 1) {
      const body = bodies[index];
      if (!body) continue;

      const cellX = Math.floor(body.x / this.#cellSize);
      const cellY = Math.floor(body.y / this.#cellSize);
      const key = this.#key(cellX, cellY);
      const cell = this.#cells.get(key);

      if (cell) {
        cell.push(index);
      } else {
        this.#cells.set(key, [index]);
      }
    }
  }

  resolve(bodies: CircleBody[]): void {
    for (let index = 0; index < bodies.length; index += 1) {
      const body = bodies[index];
      if (!body) continue;

      const cellX = Math.floor(body.x / this.#cellSize);
      const cellY = Math.floor(body.y / this.#cellSize);

      for (const [offsetX, offsetY] of NEIGHBOR_OFFSETS) {
        const nearby = this.#cells.get(this.#key(cellX + offsetX, cellY + offsetY));
        if (!nearby) continue;

        for (const otherIndex of nearby) {
          if (otherIndex <= index) continue;
          const other = bodies[otherIndex];
          if (!other) continue;
          resolvePair(body, other, index, otherIndex);
        }
      }
    }
  }

  #key(x: number, y: number): number {
    return x + y * this.#columns;
  }
}

function resolvePair(
  first: CircleBody,
  second: CircleBody,
  firstIndex: number,
  secondIndex: number,
): void {
  let deltaX = second.x - first.x;
  let deltaY = second.y - first.y;
  const minimumDistance = first.radius + second.radius;
  let distanceSquared = deltaX * deltaX + deltaY * deltaY;

  if (distanceSquared >= minimumDistance * minimumDistance) return;

  if (distanceSquared < 0.0001) {
    const angle = ((firstIndex * 47 + secondIndex * 83) % 360) * (Math.PI / 180);
    deltaX = Math.cos(angle);
    deltaY = Math.sin(angle);
    distanceSquared = 1;
  }

  const distance = Math.sqrt(distanceSquared);
  const normalX = deltaX / distance;
  const normalY = deltaY / distance;
  const overlap = minimumDistance - distance;
  const separation = overlap * 0.52;

  first.x -= normalX * separation;
  first.y -= normalY * separation;
  second.x += normalX * separation;
  second.y += normalY * separation;

  const relativeVelocityX = second.vx - first.vx;
  const relativeVelocityY = second.vy - first.vy;
  const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

  if (velocityAlongNormal >= 0) return;

  const restitution = 0.72;
  const impulse = (-(1 + restitution) * velocityAlongNormal) / 2;
  const impulseX = impulse * normalX;
  const impulseY = impulse * normalY;

  first.vx -= impulseX;
  first.vy -= impulseY;
  second.vx += impulseX;
  second.vy += impulseY;
}
