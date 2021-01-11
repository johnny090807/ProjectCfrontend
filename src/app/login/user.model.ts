export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public password: string,
    public address: string,
    public email: string,
    public Age?: Date,
    public PhoneNumber?: string,
    public id?: number
  ) { }
}
