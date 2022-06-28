import { IExecuteFunctions } from "n8n-core";
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from "n8n-workflow";

export class DiceNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Dice Node",
		name: "diceNode",
		icon: "file:dice.svg",
		group: ["transform"],
		version: 1,
		description: "Dice Node",
		defaults: {
			name: "Dice Node",
			color: "#FFDDEE",
		},
		inputs: ["main"],
		outputs: ["main"],
		properties: [
			{
				displayName: "Faces",
				name: "faces",
				type: "number",
				description: "How many faces on our dice",
				default: 6,
			},
			{
				displayName: "Target field",
				name: "field",
				type: "string",
				default: "result",
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		for (const [index, item] of items.entries()) {
			const targetField = this.getNodeParameter("field", index, "") as string;
			const faces = this.getNodeParameter("faces", index, "") as number;
			const result = 1 + Math.floor(Math.random() * faces);

			item.json[targetField] = result;
		}

		return this.prepareOutputData(items);
	}
}
