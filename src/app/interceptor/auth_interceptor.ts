import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/Auth';


@Injectable()
export class AuthIntercetor implements  HttpInterceptor{
    constructor(private ser:AuthService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
    const token=this.ser.tokenValue();
   console.log(token);

    const authClone=req.clone({
        headers:req.headers.set("Authorization",""+ token)
    });
    console.log(authClone);

       return next.handle(authClone);
    }

}
