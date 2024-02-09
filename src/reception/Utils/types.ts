export type createReceptionParams={
    FirstName:string;
    LastName:string;
    PhoneNumber:string;
    PaymentMethod:string;


}
export class UpdateReceptionParams {
    ID?: number;
    FirstName?: string;
    LastName?: string;
    PhoneNumber:string;
    PaymentMethod:string;
    Date?:Date;
  }
  