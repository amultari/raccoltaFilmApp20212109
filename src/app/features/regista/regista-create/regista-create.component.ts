import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regista } from 'src/app/model/regista';
import { RegistaService } from '../regista.service';


@Component({
  selector: 'app-regista-create',
  templateUrl: './regista-create.component.html',
  styleUrls: ['./regista-create.component.css']
})
export class RegistaCreateComponent implements OnInit {

  registaReactive = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(4)]],
    cognome: ['', [Validators.required, Validators.minLength(4)]],
    nickName: ['', [Validators.required, Validators.minLength(4)]],
    dataDiNascita: ['', [Validators.required]],
    sesso: ['', [Validators.required]],
    titolo: ['']
  });

  registaForm: Regista = new Regista();
  dataDiNascita: any;
  errorMessage: string = '';
  operazione: 'EDIT' | 'NEW' = 'NEW';

  constructor(private registaService: RegistaService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
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


  dateChangeHandler(value: any){
    this.registaReactive.get("dataDiNascita")?.setValue(new Date(value));
  }

  ngAfterViewInit(){
    this.registaReactive.get('sesso')?.valueChanges.subscribe(res => {
      if(res){
        this.registaReactive.get('titolo')?.setValue(res === 'MASCHIO' ? 'Sig.' : 'Sig.ra')
      }
    })
  }

  ngOnInit(): void {

  }

  getRegista(id: string){
    this.registaService.getRegista(id).subscribe(res => {
      this.registaForm = res;
      this.fillForm(res);
    })
  }

  fillForm(form: Regista){
    this.registaReactive.get("nome")?.setValue(form.nome);
    this.registaReactive.get("cognome")?.setValue(form.cognome);
    this.registaReactive.get("nickName")?.setValue(form.nickName);
    this.registaReactive.get("dataDiNascita")?.setValue(form.dataDiNascita ? new Date(form.dataDiNascita) : null);
    this.registaReactive.get("sesso")?.setValue(form.sesso);
  }

  save(): void {
    this.registaForm.dataDiNascita = this.registaReactive.get("dataDiNascita")?.value;
    this.registaForm.nome = this.registaReactive.get("nome")?.value;
    this.registaForm.cognome = this.registaReactive.get("cognome")?.value;
    this.registaForm.nickName = this.registaReactive.get("nickName")?.value;
    this.registaForm.sesso = this.registaReactive.get("sesso")?.value;
    
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
