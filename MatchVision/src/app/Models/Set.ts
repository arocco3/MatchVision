import { Player } from "./Player"

export class Set {
    constructor(
        public id: number,
        public match: number,
        public number: number,
        public home_score: number,
        public guest_score: number,
        public players: Player[] | null,
        public player_ids: number[]
    ) {}
}