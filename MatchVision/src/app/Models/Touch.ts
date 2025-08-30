

export enum FundamentalType {
  Serve = 'Serve',
  Serve_Receive = 'Serve_Receive',
  Set = 'Set',
  Attack = 'Attack',
  Block = 'Block',
  Defense = 'Defense'
}

export enum TouchResult {
  Positiva = 'Positiva',
  Buona = 'Buona',
  Neutra = 'Neutra',
  Negativa = 'Negativa',
  Errore = 'Errore',
}

export class Touch {
  constructor(
    public set_number: number,
    public fundamental: FundamentalType,
    public outcome: TouchResult,
    public match_id: number,
    public player_id: number
  ) {}
}