export interface userReg
{
  username : string;
  email:string;
  password:string;
}

export interface TokenMess{
    token :string,
    expiration:string
}
export interface UserLogin
{
  username : string;
  password:string;
}