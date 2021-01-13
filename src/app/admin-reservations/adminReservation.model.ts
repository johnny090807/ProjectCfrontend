export class UserReservation {
  constructor(
    public id: Number,
    public userId: Number,
    public carId: Number,
    public bestuurders: Number,
    public price: Number,
    public kinderstoel: Boolean,
    public navigatie: Boolean,
    public volgetankt: Boolean,
    public startDate: Date,
    public endDate: Date,
    public dropoff: String
  ) { }
}
