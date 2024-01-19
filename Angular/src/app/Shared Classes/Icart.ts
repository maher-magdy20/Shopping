export interface IproductVM
{
    id:number,
    name:string,
    price:number,
    description:string,
    quntity:number,
    discount:number,
    category:string,
    type:string,
    season:string,
    firstImage:string,
    images:string[],
    categoryID:number,
    typeID:number
}
export interface IproductsVCart{

  productVM:IproductVM,
    quntityOfProduct:number,
    totalPrice:number
}

export interface Icart{
  productsVCart:IproductsVCart[],
    totalCartPrice:Number,

}
