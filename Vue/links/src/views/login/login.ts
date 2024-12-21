import { http } from '@/utils/axios';

interface ILoginForm{
  account:string,
  password:string,
}

interface IUserData{
  id:number,
  account:number,
  username:string,
  avatar:string
}

interface TResponse {
  token:string,
  message:string,
  data:IUserData
}

interface TNextAccount{
  account:number
}

interface IRegisterForm{
  account:number | null,
  password:string,
  avatar:string,
  username:string,
}


export function login(data:ILoginForm){
  return http.post<TResponse>("/login",data)
}

export function getNextAccount(){
  return http.get<TNextAccount>("/nextaccount")
}

export function register(data:IRegisterForm){
  return http.post<null>("/register",data)
}
