export enum EventType {
  TECHNICAL_TIMEOUT = 'TECHNICAL_TIMEOUT',
  MEDICAL_CHANGE = 'MEDICAL_CHANGE',
  YELLOW_CARD = 'YELLOW_CARD',
  RED_CARD = 'RED_CARD',
  DOUBLE_FAULT = 'DOUBLE_FAULT'
}

export class Event {
  constructor(
    public event_type: EventType | string
  ) {}
}