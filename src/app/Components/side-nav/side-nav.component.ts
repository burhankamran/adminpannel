import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeButton=new EventEmitter<void>();
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



  onLogout()
  {
    this.auth.onLogout();

  }
  onClose()
  {
      this.closeButton.emit();

  }

}
