import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/Services/Shop';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.component.html',
  styleUrls: ['./add-rider.component.css']
})
export class AddRiderComponent implements OnInit {

  constructor(private shop:ShopService) { }

  ngOnInit(): void {

  }
 formGroup:FormGroup=new FormGroup(
    {
        name:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required]),
        phone:new FormControl('',[Validators.required]),

    }
  );
  onSubmit()
     {

         const formData={
           name:this.formGroup.value.name,
            email:this.formGroup.value.email,
            phone:this.formGroup.value.phone,

         }
        console.log(formData);

    this.shop.addRider(formData);


     }
}
