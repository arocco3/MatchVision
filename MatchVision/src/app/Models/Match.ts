export class Match {
    constructor(
        public id: number,
        public name: string,
        public team_id: number,
        public timestamp: Date,
        public result: string | null
    ) {}
}