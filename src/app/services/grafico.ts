import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraficoService {
  private dadosGrafico: any = null;

  setDados(dados:any){
    this.dadosGrafico = dados;
  }
  getDados(){
    return this.dadosGrafico;
  }
  clearDados(){
    this.dadosGrafico = null;
  }
}
