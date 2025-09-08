export class Match {
    constructor(
        public id: number,
        public name: string,
        public team_id: number,
        public date: string,
        public result?: string | null
    ) {}
}