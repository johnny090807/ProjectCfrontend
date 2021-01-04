export class CarClass {
  constructor(
    public brand: string,
    public model: string,
    public location: string,
    public carAge: number,
    public mileage: number,
    public doors: number,
    public imagePath?: string
  ) { }
}
