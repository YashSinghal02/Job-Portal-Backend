// to prevent everthing next middeelware
export class CustomError extends Error {
  constructor(statusCode,message) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

 
  }
}
