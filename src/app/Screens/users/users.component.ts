import { Component, OnInit } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ShopService } from 'src/app/Services/Shop';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private shopSer:ShopService) { }
  valuesAll=['Delieverd','Picked','Order Not Confirm'];
    total=0;
    searchId:number|undefined;
    users:any=[];

  ngOnInit(): void {
    this.shopSer.getUsers().subscribe((resData:any)=>{
      this.total=resData.users.length;
      this.dataSource.data=resData.users;
       this.users=resData.users;
    })
  }


  element:userTable[]=[


  ]
  displayedColumns: string[] = ['id', 'email', 'userName', 'phone','createdAt','action'];
  dataSource = new MatTableDataSource<userTable>(this.element);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  deleteUser(id:number)
  {
    this.shopSer.deleteUser(id);
    this.shopSer.getUsers().subscribe((resData:any)=>{
      this.dataSource.data=resData.users;
      this.total=resData.users.length;
    })
  }

  onSearch()
  {
    let arr:any=[];
     this.users.forEach((element:any) => {

         if(element.id==this.searchId)
         {
           arr.push(element);

         }

      });
      this.dataSource.data=arr;
  }

  onReset()
  {
    console.log('k');

    this.dataSource.data=this.users;
  }

}
export interface userTable{
  id:number,
  email:string,
  userName:string,
  phone:string,
  createdAt:string
}
