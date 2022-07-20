import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersComponent } from 'src/app/screens/orders/orders.component';
import { ShopService } from 'src/app/Services/Shop';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<OrdersComponent>,
  private shopSer:ShopService){
    for (let index = 1; index <20; index++) {

      this.items.push(index);
     }
  }
   food=['Naseem shah','ahmad'];
   items:any=[];
  Rider:any=[{userName:'b',email:'sdsd',phone:'03232323'}];


  ngOnInit(): void {
       this.shopSer.getRider().subscribe((resD:any)=>{
            console.log(resD.riders);

         this.Rider=resD.riders;
   })
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data);

  }
  onSubmit(id:number)
  {
    this.dialogRef.close();
    this.shopSer.sendRiderNotificaion(id,this.data.userId,
      this.data.total);

  }
}
