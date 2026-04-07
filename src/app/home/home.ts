import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Leitor } from '../leitor';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialog } from '../home-dialog/home-dialog';
import { Router } from '@angular/router';
import { GraficoService } from '../services/grafico';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private graficoService: GraficoService
  ){
  }

  headers: string[] = [];
  dados: Record<string, string>[] = [];
  dadosGrafico: any = null;


  async get(){
    const file = this.fileInput.nativeElement.files?.[0];
    if(!file){
      console.log("Arquivo vazio");
      this.toastr.warning('Selecione um arquivo válido!');
      return
    }
    console.log("Arquivo:", file);
    const leitor = new Leitor();


    await leitor.lerCsv(file).then(resultado =>{
      this.dados = resultado;
    })
    await leitor.obterHeader(file).then(resultado =>{
      this.headers = resultado;
    });
    

    this.toastr.success('Arquivo carregado com sucesso!');
    this.openDialog(this.headers);
  }

  openDialog(headers: string[]){
    const dialogRef = this.dialog.open(HomeDialog, {
      width: '700px',
      data:{
        headers
      }
    });

    dialogRef.afterClosed().subscribe(selecionados =>{
      if(!selecionados) return;
      this.dadosGrafico = {
        eixoX: selecionados?.eixoX,
        eixoY: selecionados?.eixoY,
        dados: this.dados,
        colors: selecionados.colors
      }
      
      // this.graficoService.setDados(this.dadosGrafico);

      // this.router.navigate(["/grafico"]);

      this.router.navigateByUrl('/grafico', {
        state: { dadosGrafico: this.dadosGrafico }
      });
    })
  }
}
