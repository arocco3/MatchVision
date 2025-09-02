export class Match {
  constructor(
    public id: number,
    public name: string,
    public team1: string | null,
    public team2: string | null,
    public date: string,
    public result?: string | null
  ) {}
}