import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ShopService } from 'src/app/Services/Shop';
//import { Service } from '../shared folder/Service';
// import { mimeType } from './validator';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  file1: any;
  imagePreview1='';
  prodVar=0;
  mode:string="create";
  postId:number | undefined;
  post:any={};
  // form:FormGroup | undefined ;
  constructor(private shop:ShopService,private route:ActivatedRoute,
    private router: Router) { }
  selectedFile:any;

  foods = [
    {value: 'Burgers', viewValue: 'Burgers'},
    {value: 'Pizzas', viewValue: 'Pizzas'},
    {value: 'Drinks', viewValue: 'Drinks'},
    {value: 'Deals', viewValue: 'Deals'},
  ];
  productVar = [
    {value:1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
  ];

  formGroup:FormGroup=new FormGroup(
    {
        name:new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        category:new FormControl('',[Validators.required]),
        imageUrl:new FormControl('',{validators:[Validators.required]}),
        type0:new FormControl('',[Validators.required]),
        price0:new FormControl('',[Validators.required]),
        type1:new FormControl(''),
        price1:new FormControl(''),
        type2:new FormControl(''),
        price2:new FormControl(''),
    }
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe((parms:any)=>{


      if(this.router.url.includes('viewDetail'))
      {
        this.mode="view";

        this.postId =+parms.get('id');
        console.log(this.postId);

        this.shop.getPostById(this.postId).subscribe((data:any)=>{
           this.post=data.products;
           console.log(data);
           this.prodVar=this.post.productVariations.length;
           this.imagePreview1=this.post.imageUrl;

           let type1=null;
           let price1=null;
           let type2=null;
           let price2=null;
           this.file1=this.post.imageUrl;
           if(this.post.productVariations[1])
           {
                 type1=this.post.productVariations[1].type;
                 price1=this.post.productVariations[1].price;
           }
           if(this.post.productVariations[2])
           {
                 type2=this.post.productVariations[2].type;
                 price2=this.post.productVariations[2].price;
           }

           this.formGroup.setValue({
             category:this.post.category,
             name:this.post.name,
             description:this.post.description,
             imageUrl:'',
             type0:this.post.productVariations[0].type,
             price0:this.post.productVariations[0].price,

             type1:type1,
             price1:price1,
             type2: type2,
             price2:price2,
             // type1:this.post.type1,

         })
        })
            this.formGroup.controls['name'].disable();
            this.formGroup.controls['description'].disable();
            this.formGroup.controls['imageUrl'].disable();
            this.formGroup.controls['category'].disable();
            this.formGroup.controls['type0'].disable();
            this.formGroup.controls['price0'].disable();
            this.formGroup.controls['type1'].disable();
            this.formGroup.controls['price1'].disable();
            this.formGroup.controls['type2'].disable();
            this.formGroup.controls['price2'].disable();



      }

      else if(parms.has('id')){
        this.mode="edit";

       this.postId =+parms.get('id');
       console.log(this.postId);

       this.shop.getPostById(this.postId).subscribe((data:any)=>{
          this.post=data.products;
          console.log(data);
          this.prodVar=this.post.productVariations.length;
          this.imagePreview1=this.post.imageUrl;

          let type1=null;
          let price1=null;
          let type2=null;
          let price2=null;
          this.file1=this.post.imageUrl;
          if(this.post.productVariations[1])
          {
                type1=this.post.productVariations[1].type;
                price1=this.post.productVariations[1].price;
          }
          if(this.post.productVariations[2])
          {
                type2=this.post.productVariations[2].type;
                price2=this.post.productVariations[2].price;
          }

          this.formGroup.setValue({
            category:this.post.category,
            name:this.post.name,
            description:this.post.description,
            imageUrl:'',
            type0:this.post.productVariations[0].type,
            price0:this.post.productVariations[0].price,

            type1:type1,
            price1:price1,
            type2: type2,
            price2:price2,
            // type1:this.post.type1,

        })
       })

      }

      else
      {
        // this.postId=null;
        this.mode="create";
        console.log('inininininini');

      }
})
  }
   sel(va:any)
   {
''
     this.prodVar=va;
   }

   counter(i: number) {
    return new Array(i);
  }

     onSubmit()
     {

         const formData={
           name:this.formGroup.value.name,
           description:this.formGroup.value.description,
           category:this.formGroup.value.category,
           imageUrl:this.file1,
           type0:this.formGroup.value.type0,
           price0:this.formGroup.value.price0,
           type1:this.formGroup.value.type1,
           price1:this.formGroup.value.price1,
           type2:this.formGroup.value.type2,
           price2:this.formGroup.value.price2,
         }

         if(this.mode==="create")
         {
          this.shop.productCreate(formData);
         }

         else
         {
          
          this.shop.productUpdate(this.postId,formData);
         }

     }

      onImage1(event:any){

        const file=event.target!.files[0]! ;
      this.formGroup.patchValue({image:file});
    //  this.formGroup.get('imageUrl').updateValueAndValidity();
    //  console.log(this.form);
     this.file1=file;
     console.log(file);
     const reader=new FileReader();
      reader.onload=()=>{
       this.imagePreview1=reader.result as string;
     }
     reader.readAsDataURL(file);

            }

    //  onSelectedImage(event:any)
    //  {
    //      let render=new FileReader();
    //      render.readAsDataURL(event.target!.files[0]!);
    //  }


}
