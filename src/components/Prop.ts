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
interface Transform {
	translate3D: [number, number, number];
}
export class Prop {
	public readonly componentName: string = "Prop";

	private frontImage: string;
	public position: Vector2D;
	public size: Vector2D;
	public isGrap: boolean = false;
	public transform: Transform;

	constructor(frontImage: string, position?: Vector2D, size?: Vector2D) {
		this.frontImage = frontImage || "";
		this.position = position || new Vector2D();
		this.size = size || new Vector2D();
		this.transform = {
			translate3D: [0, 0, 0]
		};
	}
	grap(): void {
		this.isGrap = true;
	}
	putDown(): void {
		this.isGrap = false;
	}
	getTransform(): string {
		return `translate3d(${this.transform.translate3D.join("px,")}px) `;
	}
	getImage(): string {
		return this.frontImage;
	}
}
