import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class OrderService {
  constructor(private http:HttpClient,private route:Router) {}

  private orders:any=[];
  private subOrder=new Subject<any>();

  getOrder()
  {
    this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getOrders')
    .subscribe((res:any)=>{
      this.orders=res.orders;
      this.subOrder.next([...this.orders]);
    })

  }

  getOrderById(id:number)
  {
    return this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getOrderById/'+id)
  }

  getSubjectOrders()
  {
    return this.subOrder.asObservable();
  }

  getStatusUpdate(id:number,status:string)
  {
    this.http.put('https://rest-api-food-delivery-app.herokuapp.com/admin/updateOrderStatus/'+id,{status:status})
    .subscribe(res=>{
      console.log(res);
      this.getOrder();
    })
  }
}
