import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShopService } from '../Services/Shop';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.css']
})
export class ProductHistoryComponent implements OnInit {

  constructor(private shop:ShopService) { }

  ngOnInit(): void {
   this.shop.getProductHistory();
   this.shop.getProductHistorySubjectListener()
   .subscribe(resData=>{

      this.dataSource.data=resData;

  }
    )
  }


  displayedColumns: string[] = ['id', 'price', 'type', 'createdAt','updatedAt'];
  dataSource = new MatTableDataSource<ordersTable>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}

export interface ordersTable{
  id:number;
  price:number,
  type:string,
  createdAt:string,
  updatedAt:string,
}

