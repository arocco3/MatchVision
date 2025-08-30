

export enum Role {
  SETTER = 'SETTER',
  OUTSIDE_HITTER = 'OUTSIDE_HITTER',
  MIDDLE_BLOCKER = 'MIDDLE_BLOCKER',
  OPPOSITE_HITTER = 'OPPOSITE_HITTER',
  LIBERO = 'LIBERO'
}

export class Player {
  constructor(
    public name: string,
    public surname: string,
    public number: number,
    public role: Role
  ) {}
}