import { Player } from "./Player";
import { Event } from "./Event";
import { Touch } from "./Touch";

export class Set {
    constructor(
        public id: number | null,
        public match: number,
        public number: number,
        public home_score: number,
        public guest_score: number,
        public players: Player[] | null,
        public player_ids: number[]
    ) {}
}