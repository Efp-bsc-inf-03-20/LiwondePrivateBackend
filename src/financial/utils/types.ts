export type createFinanceParams={
    FirstName:string;
    LastName:string;
    Treatment:string;
    Amount:number;
    PaymentMethod:string;


}
export type createDaySummaryParams={
    banking:number;
    CashInHand:number;

}
export type UpdateFinanceParams={
    FirstName:string;
    LastName:string;
    Treatment:string;
    Amount:number;
    PaymentMethod:string
    

}
export type UpdateDaySummaryParams={
    banking:number;
    CashInHand:number;


}