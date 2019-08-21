/* Vector2.jsx from https://github.com/owid/owid-grapher/blob/master/charts/Vector2.ts
 * ================
 *
 * Vector utility class
 * Partly based on the Unity vector: https://docs.unity3d.com/ScriptReference/Vector2.html
 * Wraps the Victor library, mainly so we can do type hinting
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2017-03-15
 */

export class Vector {
  static left = new Vector(-1, 0);
  static right = new Vector(1, 0);
  static up = new Vector(0, -1);
  static down = new Vector(0, -1);
  static zero = new Vector(0, 0);

  x: number;
  y: number;

  static get epsilon() {
    return 1e-5;
  }

  static distanceSq(a: Vector, b: Vector): number {
    return (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  }

  static distance(a: Vector, b: Vector): number {
    return Math.sqrt(Vector.distanceSq(a, b));
  }

  static angle(a: Vector, b: Vector): number {
    return (
      Math.acos(Math.max(Math.min(Vector.dot(a.normalize(), b.normalize()), 1), -1)) * 57.29578
    );
  }

  static dot(lhs: Vector, rhs: Vector) {
    return lhs.x * rhs.x + lhs.y * rhs.y;
  }

  // From: http://stackoverflow.com/a/1501725/1983739
  static distanceFromPointToLineSq(p: Vector, v: Vector, w: Vector): number {
    const l2 = Vector.distanceSq(v, w);
    if (l2 === 0) {
      return Vector.distanceSq(p, v);
    }

    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Vector.distanceSq(p, new Vector(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
  }

  static distanceFromPointToLine(p: Vector, v: Vector, w: Vector): number {
    return Math.sqrt(Vector.distanceFromPointToLineSq(p, v, w));
  }

  static fromArray(a: [number, number]): Vector {
    return new Vector(a[0], a[1]);
  }

  static fromObject(o: { x: number; y: number }): Vector {
    return new Vector(o.x, o.y);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  times(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  get magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector {
    const magnitude = this.magnitude;
    if (magnitude > 1e-5) {
      return new Vector(this.x / magnitude, this.y / magnitude);
    } else {
      return new Vector(0, 0);
    }
  }

  normals(): Vector[] {
    return [new Vector(-this.y, this.x), new Vector(this.y, -this.x)];
  }

  invert(): Vector {
    return this.times(-1);
  }

  toString(): string {
    return `Vector2<${this.x}, ${this.y}>`;
  }
}
