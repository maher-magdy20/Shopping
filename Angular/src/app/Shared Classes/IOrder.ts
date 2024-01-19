export interface IOrder{
    id:number,
    userID:string,
    cartID:number,
    totalPrice:number,
    status:number,
    address:string,
    paymentMethod:boolean,
    phone:string
}