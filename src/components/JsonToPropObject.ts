import { Prop } from './Prop';
import { Props } from './Props';
import { Card } from './Card/Card';

export function jsonToPropObject(data: Prop): Prop | undefined {
	let prop;
	switch (data.componentName) {
		case "Prop":
			prop = Prop.copy(data);
			break;
		case "Props":
			prop = Props.copy(data);
			break;
		case "Card":
			prop = Card.copy(data);
			break;
	}
	return prop;
}
