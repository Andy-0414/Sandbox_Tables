export class Vector2D {
	public x: number;
	public y: number;

	constructor(x?: number | Vector2D, y?: number) {
		if (typeof x == "undefined") {
			this.x = 0;
			this.y = 0;
		} else if (typeof x == "number") {
			this.x = x || 0;
			this.y = y || 0;
		} else {
			this.x = x!.x;
			this.y = x!.y;
		}
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
	public readonly _id: string;

	private frontImage: string;
	public position: Vector2D;
	public size: Vector2D;
	public zIndex: number = 1000;
	public isGrap: boolean = false;
	public transform: Transform;

	constructor(frontImage: string, position?: Vector2D, size?: Vector2D) {
		this._id = Prop.createUUID();

		this.frontImage = frontImage || "";
		this.position = position || new Vector2D();
		this.size = size || new Vector2D();
		this.transform = {
			translate3D: [0, 0, 0]
		};
	}

	static createUUID() {
		function randomChar4() {
			return Math.random()
				.toString(16)
				.slice(-4)
				.toUpperCase();
		}
		function getNow() {
			return (
				Date.now().toString(36) +
				Math.random()
					.toString(36)
					.substr(2, 5)
			).toUpperCase();
		}
		return `${randomChar4()}${randomChar4()}-${getNow()}-${randomChar4()}-${randomChar4()}${randomChar4()}${randomChar4()}`;
	}
	static copy(data: Prop): Prop {
		let prop = new this("");
		Object.assign(prop, data);

		prop.size = new Vector2D(prop.size);
		prop.position = new Vector2D(prop.position);

		return prop;
	}
	update(data: Prop): Prop {
		Object.assign(this, data);

		this.size = new Vector2D(this.size);
		this.position = new Vector2D(this.position);

		return this;
	}

	grap(): void {
		this.zIndex = 1000;
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
