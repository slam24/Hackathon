import {Deserializable} from "./deserializable.model";

export class Language {
  id: number;
  color: string;
  name: string;
  count: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}