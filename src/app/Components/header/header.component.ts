import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle=new EventEmitter<void>();

  authSer:Subscription | undefined;
  userAuth:boolean=false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.userAuth=this.auth.userAuth;
     this.auth.getAuthStatus().
     subscribe((auth)=>{
     this.userAuth=auth;
     })
  }

  toggleNav()
  {
    this.sideNavToggle.emit();
  }

  onLogout()
  {
    this.auth.onLogout();

  }
}
