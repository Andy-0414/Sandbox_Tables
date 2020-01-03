import { Prop } from "./Prop";
import { jsonToPropObject } from "./JsonToPropObject";

export class Props extends Prop {
	public readonly componentName: string = "Props";

	public props: Prop[];

	constructor(props: Prop[], ...args: any) {
		super("", ...args);
		this.props = props || [];
	}
	static copy(data: Prop): Props {
		let props = <Props>super.copy(data);
		props.props = props.props.map(prop => jsonToPropObject(prop)!);
		return props;
	}

	update(data: Prop): Prop {
		super.update(data);
		this.props = this.props.map(prop => jsonToPropObject(prop)!);
		return this;
	}

	push(prop: Prop): void {
		this.props.push(prop);
	}
	pop(): Prop | undefined {
		let prop = this.props.pop();
		if (prop) {
			prop.position = this.position;
			return prop;
		} else {
			return undefined;
		}
	}

	getImage(): string {
		return this.props[this.props.length - 1].getImage();
	}
}
