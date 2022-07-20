import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  formType:String|undefined='';
  //true for signup and false for login...
  btnText:String|undefined='';
  formGroup=new FormGroup({});
constructor(private route:ActivatedRoute,private auth:AuthService) { }

ngOnInit(): void {
     this.formType=this.route.snapshot.routeConfig?.path;
     this.btnText=this.route.snapshot.routeConfig?.path;
     this.btnText=this.btnText?.toLocaleUpperCase();

     this.formGroup=new FormGroup(
       {
         email:new FormControl('',[Validators.required,Validators.email]),
         password:new FormControl('',[Validators.required,Validators
         .minLength(6)]),
         conPassword:new FormControl('',[Validators.required,
         Validators.minLength(6)]),
       }
     );
}

onSubmit()
{
   if(this.formType==='signup')
   {


   this.auth.signUp(this.formGroup.value.email,
     this.formGroup.value.password,this.formGroup.value.conPassword);
    }
    else
    {
     this.auth.login(this.formGroup.value.email,
       this.formGroup.value.password);


    }

}


}
