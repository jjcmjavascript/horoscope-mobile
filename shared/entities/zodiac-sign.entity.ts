export interface PrimitiveZodiacSign {
  sign: string;
  amor: string;
  familia: string;
  dinero: string;
  salud: string;
  consejo: string;
}

export class ZodiacSign {
  private sign?: string;
  private amor?: string;
  private familia?: string;
  private dinero?: string;
  private salud?: string;
  private consejo?: string;

  constructor(primitive: Partial<PrimitiveZodiacSign>) {
    this.sign = primitive.sign;
    this.amor = primitive.amor;
    this.familia = primitive.familia;
    this.dinero = primitive.dinero;
    this.salud = primitive.salud;
    this.consejo = primitive.consejo;
  }

  get values() {
    return {
      sign: this.sign,
      amor: this.amor,
      familia: this.familia,
      dinero: this.dinero,
      salud: this.salud,
      consejo: this.consejo,
    };
  }
}
