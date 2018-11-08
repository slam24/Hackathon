import {Deserializable} from "./deserializable.model";

export class Teams implements Deserializable {
  totalCount: number;
  edges: Team[];

  deserialize(input: any) {
    Object.assign(this, input);
    this.edges = new Team[]().deserialize(input.edges);
    return this;
  }
}

export class Team {
  id: number;
  name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}