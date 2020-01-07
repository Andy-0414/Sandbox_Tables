import { Prop, Vector2D } from "./Prop";
import { Props } from "./Props";
import { Card } from "./Card/Card";

export interface SpawnMenuItem {
	name: string;
	prop: Prop;
}
export default function getSpawnMenuList(): SpawnMenuItem[] {
	return [
		{
			name: "트럼프 카드",
			prop: new Props(Card.createTrumpCardPack(), new Vector2D(0, 0), new Vector2D(117.75, 178.5))
		},
		{
			name: "커스텀 프롭",
			prop: new Prop("", new Vector2D(0, 0), new Vector2D(100, 100))
		},
		{
			name: "커스텀 카드",
			prop: (() => {
				let card = new Card("", "", false, new Vector2D(0, 0), new Vector2D(100, 100));
				card.reverse();
				return card;
			})()
		}
	] as SpawnMenuItem[];
}
