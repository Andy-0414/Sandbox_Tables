import { Prop } from "../Prop";

export class Card extends Prop {
	public readonly componentName: string = "Card";
	public isReverse: boolean = false;
	private backImage: string;

	constructor(frontImage: string, backImage: string, ...args: any) {
		super(frontImage, ...args);
		this.backImage = backImage || "";
	}

	reverse(): void {
		this.isReverse = !this.isReverse;
	}
	getTransform(): string {
		return super.getTransform() + `rotateY(${this.isReverse ? 180 : 0}deg) scaleX(${this.isReverse ? -1 : 1})`;
	}
	getImage(): string {
		return this.isReverse ? super.getImage() : this.backImage;
	}
}
