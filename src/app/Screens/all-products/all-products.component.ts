import { Component, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { allProducts } from 'src/app/Models/productsTable';
import { ShopService } from 'src/app/Services/Shop';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit,AfterViewInit {

  constructor(private shopSer:ShopService){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.shopSer.getProducts();
    this.shopSer.getProductSubjectListener().subscribe(resData=>{
            // console.log(resData);
            // console.log(resData[0].productVariations[0].price);

           let data:any=[];
            for(let i=0;i<resData.length;i++)
            {
                console.log(resData);

             data.push({
                id:resData[i].id,
                name:resData[i].name,
                price:resData[i].productVariations[0].price,
                image:resData[i].imageUrl,
                QtyOfSale:resData[i].qtyOfSale,
              });
            }

            this.dataSource.data=data;
    })
  }


  displayedColumns: string[] = ['id', 'image', 'name', 'price','QtyOfSale','action'];
  dataSource = new MatTableDataSource<allProducts>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteProduct(id:number)
  {
      this.shopSer.onDeleteProduct(id);

  }

}

