import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-dialog',
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-dialog.html',
  styleUrl: './home-dialog.scss',
})
export class HomeDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      headers: string[]
    },
    private dialogRef: MatDialogRef<HomeDialog>,
    private toastr: ToastrService,
  ){
  }

  eixoX: string = '';
  eixoY: string[] = []

  selectedColor: Record<string, string> = {};
  colors: string[] = ['red', 'blue', 'yellow', 'orange', 'purple', 'green'];

  confirmar(){
    if(this.validate()){
      this.dialogRef.close({
        eixoX: this.eixoX,
        eixoY: this.eixoY,
        colors: this.selectedColor
      })
    }else{
      this.toastr.error("Selecione os eixos!");
    }
  }

  checkChange(header: string, checked: boolean){
    if(checked){
      if(!this.eixoY.includes(header)){
        this.eixoY.push(header);
        this.selectedColor[header] = this.colors[0];
      }
    }else{
      this.eixoY = this.eixoY.filter(y => y !== header);
      delete this.selectedColor[header];
    }
  }

  validate(): boolean{
    if(this.eixoX.length > 0 && this.eixoY.length > 0){
      return true
    }
    return false
  }
}
