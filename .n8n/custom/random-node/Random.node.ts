import { NodeExecuteFunctions } from "n8n-core";
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import axios from "axios";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:Random.svg",
    group: ["transform"],
    version: 1,
    description: "Generate a true random number using Random.org",
    defaults: {
      name: "Random",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Min",
        name: "min",
        type: "number",
        default: 1,
        required: true,
        description: "Minimum integer (inclusive)",
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        default: 100,
        required: true,
        description: "Maximum integer (inclusive)",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter("min", i) as number;
      const max = this.getNodeParameter("max", i) as number;

      const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      const response = await axios.get(url);
      const randomNumber = parseInt(response.data.trim(), 10);

      returnData.push({
        json: {
          min,
          max,
          randomNumber,
        },
      });
    }

    return [returnData];
  }
}
