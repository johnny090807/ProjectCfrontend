export class UserReservation {
  constructor(
    public id: Number,
    public userId: Number,
    public carId: Number,
    public Bestuurders: Number,
    public Price: Number,
    public Kinderstoel: Boolean,
    public Navigatie: Boolean,
    public Volgetankt: Boolean,
    public startDate: Date,
    public endDate: Date,
    public Dropoff: String
  ) { }
}
