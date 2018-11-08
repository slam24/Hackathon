import {Teams} from "./teams.model";
import {Deserializable} from "./deserializable.model";

export class Organization implements Deserializable {
  name: string;
  url: string;
  teams: Teams;

  deserialize(input: any) {
    Object.assign(this, input);
    this.teams = new Teams().deserialize(input.teams);
    return this;
  }
}