import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { UIService } from "./snack_bar";
@Injectable({
  providedIn:'root'
})

export class AuthService{
  token:any;
  private authStatus=new Subject<boolean>();
  userAuth:boolean=false;
  tokenTimer:any;
  private userId:any;

  tokenValue=()=> this.token;
  getAuthStatus=()=>this.authStatus.asObservable();
  getUserAuth=()=> this.userAuth;
  getUserId=()=> this.userId;

  constructor(private http:HttpClient,private route:Router,
    private uiSer:UIService){}

   signUp(email:string,password:string,conPassword:string):void
   {
      const userData={email:email,password:password,conPassword:conPassword};
      console.log(userData);

      this.http.put('https://rest-api-food-delivery-app.herokuapp.com/admin/signup',userData)
      .subscribe(data=>{
           this.route.navigate(['/login']);

      },
      error=>{
        console.log(error);
        this.uiSer.onShowSnack(error.error.error,3000);
      });

   }

   login(email:string,password:string):void
   {
    const userData={email:email,password:password}
    console.log(userData);

    this.http.post<{token:string,userId:string,expiresIn:number}>('https://rest-api-food-delivery-app.herokuapp.com/admin/login',userData)
    .subscribe(res=>{
      this.token =res.token;
       console.log(res.token);

           if(res.token)
           {
            const expiresIn=res.expiresIn;
            console.log(expiresIn);
            this.userId=res.userId;
            this.setAuthTimer(expiresIn);
            this.userAuth=true;
            this.authStatus.next(true);
            const now= new Date();
            const expiresInDuration=new Date(now.getTime() +res.expiresIn*1000);
            this.saveAuthData(res.token,expiresInDuration,this.userId);
            this.route.navigate(['/allProducts']);
           }

    },
    error=>{
      console.log(error,'in');

      this.uiSer.onShowSnack(error.error.error,3000);
    });
   }

   onLogout(){
    this.authStatus.next(false);
    this.userId=null;
    this.userAuth=false;
    this.token=null;
    this.clearAuthData();
    this.route.navigate(['/signup']);
    clearTimeout(this.tokenTimer);
}
private saveAuthData(token:string,expiresIn:Date,userId:string){
  console.log(token,userId);

  localStorage.setItem('token',token);
  localStorage.setItem('expiration',expiresIn.toISOString());
  localStorage.setItem('userId',userId)
}
private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
}
autoAuthUser(){
    const info=this.getAuthData();
    if(!info)
    {
        return;
    }
    const now=new Date();
    const isInFuture=info.expiration.getTime() - now.getTime();
    if(isInFuture>0){
        this.userId=info.userId;
        this.token=info.token;
        this.authStatus.next(true);
        this.userAuth=true;
        this.setAuthTimer(isInFuture/1000);

    }
}

private getAuthData(){
    const token=localStorage.getItem('token');
    const expiration=localStorage.getItem('expiration');
    const userId=localStorage.getItem("userId");
    if(!token || !expiration)
    {
          return;
    }
    return {
        token:token,
        expiration:new Date(expiration),
        userId:userId
    }
}
private setAuthTimer( duration:number){
     this.tokenTimer=setTimeout(()=>{
           this.onLogout();
       },duration*1000);
}



}
