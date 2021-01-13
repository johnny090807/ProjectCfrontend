export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public password: string,
    public address: string,
    public email: string,
    public age?: Date,
    public phoneNumber?: string,
    public admin?: boolean,
    public id?: number
  ) { }
}
