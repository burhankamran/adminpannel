import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
import { allProducts } from 'src/app/Models/productsTable';
import { OrderService } from 'src/app/Services/Order';




@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderSer:OrderService,private dialog:MatDialog) { }

  searchId:number|undefined;
  data:any=[];

  openDialog(userId:number,total:number)
  {
    console.log(userId,'INd');

   const dialogRef= this.dialog.open(DialogComponent,{
     data:{
        name:"orders",
        userId:userId,
        total:total,
     },
     autoFocus: false,
     maxHeight: '90vh'
   });



   dialogRef.afterClosed().subscribe(result=>{
             console.log(result);

  })
  }
  close()
  {
    this.dialog.closeAll();
  }
  countD=0;
  countW=0;
  countP=0;
  valuesAll=['delieverd','on the way','pending',]
  ngOnInit(): void {
    this.orderSer.getOrder();
    this.orderSer.getSubjectOrders().subscribe(resData=>{
      let data:ordersTable[]=[];
      console.log(resData);

      resData.forEach((element:any) => {
          data.push({
            id:element.id,
            address:element.address,
            total:element.totalPrice,
            phoneNumber:'033321323',
            time:element.createdAt,
            status:element.status,
            userId:element.userId,
          });

      });

      this.data=data;
      this.dataSource.data=data;
      console.log(resData);
      resData.forEach((element:any) => {
        if(element.status=='delieverd')
        {
          this.countD++;
        }
        else if(element.status=='on the way')
        {
          this.countW++;
        }
        else if(element.status=='pending')
        {
          this.countP++;
        }
      }
    );
  });
  }

  displayedColumns: string[] = ['id', 'address', 'phoneNumber', 'total','time','status','action',];
  dataSource = new MatTableDataSource<ordersTable>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelect(value:string,id:number)
  {

    this.orderSer.getStatusUpdate(id,value);
  }

  onSearch()
  {
    let arr:any=[];
      this.data.forEach((element:any) => {

          if(element.id==this.searchId)
          {
            arr.push(element);

          }

       });
       this.dataSource.data=arr;
  }
    onReset()
    {
      this.dataSource.data=this.data;
    }

    onSelectFilter(value:string)
    {
      let arr:any=[];
      this.data.forEach((element:any) => {

          if(element.status==value)
          {
            arr.push(element);

          }

       });
       console.log(arr);

       this.dataSource.data=arr;
    }
}

export interface ordersTable{
  id:number,
  address:string,
  phoneNumber:string,
  total:number,
  time:string,
  status:string,
  userId:number,
}
