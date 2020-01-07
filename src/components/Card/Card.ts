import { Prop, Vector2D } from "../Prop";

export class Card extends Prop {
	public readonly componentName: string = "Card";
	public isReverse: boolean = false;
	public isTrumpCard: boolean = true;
	private backImage: string;

	constructor(frontImage: string, backImage: string, isTrumpCard: boolean, ...args: any) {
		super(frontImage, ...args);
		this.backImage = backImage || "";
		this.isTrumpCard = isTrumpCard;
	}

	static createTrumpCardPack(): Card[] {
		let shape = ["clubs", "diamonds", "hearts", "spades"];
		let num = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
		let idx = 0;
		return shape.flatMap(shape => {
			return num.map(num => {
				return new Card(require(`@/assets/cards/${num}_of_${shape}.png`), require("@/assets/cards/back.png"), true, new Vector2D(10 * idx++, 10), new Vector2D(117.75, 178.5));
			});
		});
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
