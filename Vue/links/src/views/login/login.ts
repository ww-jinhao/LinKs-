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


export function login(data:ILoginForm){
  return http.post<TResponse>("/login",data)
}
