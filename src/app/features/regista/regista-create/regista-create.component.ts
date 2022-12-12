import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regista } from 'src/app/model/regista';
import { RegistaService } from '../regista.service';


@Component({
  selector: 'app-regista-create',
  templateUrl: './regista-create.component.html',
  styleUrls: ['./regista-create.component.css']
})
export class RegistaCreateComponent implements OnInit {

  registaForm: Regista = new Regista();
  dataDiNascita: any;
  errorMessage: string = '';
  operazione: 'EDIT' | 'NEW' = 'NEW';

  constructor(private registaService: RegistaService, private router: Router, private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.paramMap.subscribe(params => {
      const idRegista = params.get('id');
      if (idRegista) {
        this.operazione = 'EDIT';
        this.getRegista(idRegista);
      }else{
        this.operazione = 'NEW';
      }
    });
  }

  ngOnInit(): void {
  }

  getRegista(id: string){
    this.registaService.getRegista(id).subscribe(res => {
      if(res.dataDiNascita){
        this.dataDiNascita = new Date(res.dataDiNascita);
      }
      this.registaForm = res;
    })
  }

  save(registaForm: NgForm): void {
    console.log('sub ' + JSON.stringify(this.registaForm));
    this.registaForm.dataDiNascita = this.dataDiNascita.toDate();
    
    if(this.registaForm.id){
      this.registaService.updateRegista(this.registaForm).subscribe({
        next: registaItem => {
          this.registaForm = registaItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          
        }
      });
    }else{
      this.registaService.addRegista(this.registaForm).subscribe({
        next: registaItem => {
          this.registaForm = registaItem;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Attenzione! Inserimento fallito!',
        complete: () => {
          
        }
      });
    }
    
      

    
  }

}
