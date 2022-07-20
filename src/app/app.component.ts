import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/Auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'adminpannel';
  constructor(private serAuth:AuthService){}
  ngOnInit(){
    this.serAuth.autoAuthUser();
   }
}
