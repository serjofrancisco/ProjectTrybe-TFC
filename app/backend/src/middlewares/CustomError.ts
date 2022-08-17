export default class CustomEror extends Error {
  status: number;
  message: string;

  constructor(status: number, message:string) {
    super();
    this.status = status;
    this.message = message;
  }
}