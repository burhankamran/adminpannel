import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private router: Router,private orderSer:OrderService,) { }
  postId:number | undefined;
  orderId:number| undefined;
  orderItems=[];
  displayedColumns: string[] = ['id', 'name','price','qty','variation'];
  dataSource = new MatTableDataSource<orderDetail>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parms:any)=>{
      this.postId =+parms.get('id');

     this.orderSer.getOrderById(this.postId).subscribe((res:any)=>{
          console.log(res.products.orderItems);
          this.orderId=res.products.id;
         this.dataSource.data=res.products.orderItems;
    })

      })

  }
}

export interface orderDetail {
  id:number;
  name:string;
  price:number;
  qty:number;
  variation:string;
}

