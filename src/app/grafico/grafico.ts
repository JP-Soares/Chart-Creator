import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js/auto';
import { Router } from '@angular/router';
import { GraficoService } from '../services/grafico';
import {MatIconModule} from '@angular/material/icon';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-grafico',
  imports: [
    MatIconModule
  ],
  templateUrl: './grafico.html',
  styleUrl: './grafico.scss',
})
export class Grafico implements OnInit{

  dadosGrafico: any;
  graficoFormatado: any;
  chart: any;

  constructor(
    private router: Router,
    private graficoService: GraficoService
  ){
  }

  ngOnInit(): void {
    this.dadosGrafico = history.state.dadosGrafico;
    if(this.dadosGrafico){
      // this.dadosGrafico = this.graficoService.getDados();
      this.dadosGrafico = history.state.dadosGrafico;
      this.graficoFormatado = this.formatarGrafico(
        this.dadosGrafico.eixoX,
        this.dadosGrafico.eixoY
      )
    }

    if(!history.state.dadosGrafico){
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    if(!this.dadosGrafico) return;

    this.chart = new Chart('graphic', {
      type: 'bar',
      data: {
        labels: this.graficoFormatado.labels,
        datasets: this.graficoFormatado.dataSets
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  formatarGrafico(eixoX: string, eixoY: string[]){
    const labels = this.dadosGrafico.dados.map((label: Record<string, string>) => label[eixoX]);
    const dataSets = eixoY.map((label) =>({
      label: label,
      data: this.dadosGrafico.dados.map((dado: Record<string, string>) => dado[label]),
      backgroundColor: this.dadosGrafico.colors[label]
    }))

    return {labels, dataSets}
  }

  exportarPdf(){
    console.log("pdf")
    const graphic = document.getElementById('graphic');

    html2canvas(graphic!).then(canvas => {
      const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
            const positionY = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, positionY, imgWidth, imgHeight);
    })
  }
}
