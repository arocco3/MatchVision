
import { Match } from "./Match";
import { Player } from "./Player";
import { Team } from "./Team";

export class User {
  constructor(
    public email?: string,
    public password?: string,
    public name?: string,
    public surname?: string,
    public matches?: Match[],
    public players?: Player[],
    public teams?: Team[] 
  ) {}
}