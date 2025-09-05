import { Player } from "./Player";
import { Event } from "./Event";
import { Touch } from "./Touch";

export class Set {
  constructor(
    public id: number,
    public match_id: number,
    public number: number,
    public home_score: number,
    public guest_score: number,
    public touches: Touch[] = [],
    public events: Event[] = [],
    public players: Player[] = []
  ) {}
}