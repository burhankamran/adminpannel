import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UIService{
    constructor(private _snackBar: MatSnackBar,){}
   

    onShowSnack(message:string,duration:number)
    {
        this._snackBar.open(message,'',{
            duration:duration
        });
    }
}
