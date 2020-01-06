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
			Object.assign(prop.position,this.position);
			return prop;
		} else {
			return undefined;
		}
	}
	spread(count: number): Prop[] {
		let result: Prop[] = [];
		let prop: Prop | undefined = undefined;
		for (let i = 0; i < count; i++) {
			prop = this.pop();
			if (prop) {
				prop.position.x = this.position.x + i * 20;
				result.push(prop);
			}
		}
		return result;
	}
	shuffle() {
		this.props = this.props.sort(() => Math.random() - 0.5);
	}

	getImage(): string {
		if (this.props.length > 0) return this.props[this.props.length - 1].getImage();
		else return "";
	}
}
