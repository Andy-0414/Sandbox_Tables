export class Vector2D {
	public x: number;
	public y: number;

	constructor(x?: number, y?: number) {
		this.x = x || 0;
		this.y = y || 0;
	}
	setX(x: number) {
		this.x = x;
	}
	setY(y: number) {
		this.y = y;
	}
	moveX(x: number) {
		this.x += x;
	}
	moveY(y: number) {
		this.y += y;
	}

	setVector2D(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
export class Prop {
	public position: Vector2D;
	public size: Vector2D;

	constructor(position?: Vector2D, size?: Vector2D) {
		this.position = position || new Vector2D();
		this.size = size || new Vector2D();
	}
}
