import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { Subject } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class ShopService
{
    constructor(private http:HttpClient, private route:Router){}

    private products:any=[];
    private subPost=new Subject<any>();

    private productHistory:any=[];
    private subPostHistory=new Subject<any>();

    productCreate(product:any)
    {
      console.log(product);

       const form=new FormData();
       form.append('name',product.name);
       form.append('description',product.description);
       form.append('category',product.category);
       form.append('imageUrl',product.imageUrl);
       form.append('type0',product.type0);
       form.append('price0',product.price0);
       form.append('type1',product.type1);
       form.append('price1',product.price1);
       form.append('type2',product.type2);
       form.append('price2',product.price2);

       this.http.post<{message:string}>('https://rest-api-food-delivery-app.herokuapp.com/admin/add-product',form)
       .subscribe(res=>{
         console.log(res);
         this.route.navigate(['/allProducts']);
       })
    }

    getProducts()
    {
       this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getProducts')
       .subscribe((resData:any)=>{
          this.products=resData.products;
         this.subPost.next([...this.products]);
       })
    }

    getProductSubjectListener()
    {
      return this.subPost.asObservable();
    }

    onDeleteProduct(id:number)
    {
      const form=new FormData();
       form.append('id',id+"");

      this.http.post('https://rest-api-food-delivery-app.herokuapp.com/admin/product',form)
      .subscribe(res=>{
        console.log(res);
        this.getProducts();
      })

    }

    getPostById(id:number)
    {
      return this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getProductById/'+id);
    }

    productUpdate(id:any,form:any){
      let formD=new FormData();
      if(typeof(form.imageUrl)=="object")
      {

        formD.append('name',form.name);
        formD.append('description',form.description);
        formD.append('category',form.category);
        formD.append('imageUrl',form.imageUrl);
        formD.append('type0',form.type0);
        formD.append('price0',form.price0);
        formD.append('type1',form.type1);
        formD.append('price1',form.price1);
        formD.append('type2',form.type2);
        formD.append('price2',form.price2);


      }
      else{
        formD=form;
        console.log('string');

      }
      console.log(formD,'checkupdatework');

      this.http.post('https://rest-api-food-delivery-app.herokuapp.com/admin/updateProduct/'+id,formD)
      .subscribe(res=>{
        console.log(res);
        this.route.navigate(['/allProducts']);
      })

    //   this.http.put('http://localhost:3000/api/update/'+id,formD).
    //   subscribe((a)=>{
    //     console.log(a);
    //     // this.route.navigate(['/post']);
    //   })
    }

    sendRiderNotificaion(id:number,userId:number,total:number)
    {
      console.log(total);

      this.http.post('https://rest-api-food-delivery-app.herokuapp.com/admin/sendNotification/',{id:id,
    userId:userId,total:total})
      .subscribe(res=>{
        console.log(res);
      });
    }

    getRider()
    {
      return this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getRiders');

    }

    getUsers()
    {
      return this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getUsers');
    }

    deleteUser(id:number)
    {
      return this.http.delete('https://rest-api-food-delivery-app.herokuapp.com/admin/deleteUser/'+id)
      .subscribe(res=>{
        this.getUsers();
      })
    }

    getProductHistory()
    {
      console.log('doing request');

      return this.http.get('https://rest-api-food-delivery-app.herokuapp.com/admin/getProductHistory')
      .subscribe((res:any)=>{
        console.log(res);

        this.productHistory=res.productHistory;
        this.subPostHistory.next([...this.productHistory]);
      })
    }

    getProductHistorySubjectListener()
    {
      return this.subPostHistory.asObservable();

    }

    addRider( rider:any)
    {
      this.http.post('https://rest-api-food-delivery-app.herokuapp.com/admin/addRider',rider)
      .subscribe(res=>{
        console.log(res);
      }
        )
    }
}
