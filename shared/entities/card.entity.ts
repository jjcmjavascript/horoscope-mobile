import { Orientation } from '../types/common.enums';

export interface PrimitiveCardEntity {
  index?: number;
  name: string;
  backUrl: string;
  cardUrl: string;
  orientation: Orientation;
  reading?: string;
}

export class CardEntity {
  private index?: number;
  private name: string;
  private backUrl: string;
  private cardUrl: string;
  private orientation: Orientation;
  private reading?: string;

  constructor(data: PrimitiveCardEntity) {
    this.index = data.index;
    this.name = data.name;
    this.backUrl = data.backUrl;
    this.cardUrl = data.cardUrl;
    this.orientation = data.orientation;
    this.reading = data.reading;
  }

  static fromPrimitive(data: PrimitiveCardEntity): CardEntity {
    return new CardEntity(data);
  }

  static fromArray(data: PrimitiveCardEntity[]): CardEntity[] {
    return data.map((d) => new CardEntity(d));
  }

  get values() {
    return {
      index: this.index,
      name: this.name,
      backUrl: this.backUrl,
      cardUrl: this.cardUrl,
      orientation: this.orientation,
      reading: this.reading,
    };
  }
}
