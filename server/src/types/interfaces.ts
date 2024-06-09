export interface ConnectionInterface {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }
  
export interface UserRegister {
    fName: string;
    lName: string;
    email: string;
    uName: string;
    password: string;
    countryCode: string;
}