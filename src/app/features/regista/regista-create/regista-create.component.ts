import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Regista } from 'src/app/models/regista';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { RegistaService } from '../regista.service';

export interface RegistaForm extends FormGroup<{
  nome: FormControl<string>;
  cognome: FormControl<string>;
  nickName: FormControl<string>;
  dataDiNascita: FormControl<Date>;
  sesso: FormControl<string>;
  titolo: FormControl<string>;
}>{}


@Component({
  selector: 'app-regista-create',
  templateUrl: './regista-create.component.html',
  styleUrls: ['./regista-create.component.css']
})
export class RegistaCreateComponent implements OnInit {

  registaTypedForm: RegistaForm = this.fb.nonNullable.group({
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    dataDiNascita: this.fb.nonNullable.control(new Date(), [Validators.required]),
    nickName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    sesso: this.fb.nonNullable.control('', [Validators.required]),
    titolo: this.fb.nonNullable.control(''),
  });

  registaReactive: UntypedFormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(4)]],
    cognome: ['', [Validators.required, Validators.minLength(4)]],
    nickName: ['', [Validators.required, Validators.minLength(4)]],
    dataDiNascita: ['', [Validators.required]],
    sesso: ['', [Validators.required]],
    titolo: ['']
  });

  registaForm!: Regista;
  dataDiNascita: any;
  errorMessage: string = '';
  operazione: 'EDIT' | 'NEW' = 'NEW';

  constructor(private registaService: RegistaService,
              private snackbarService: SnackbarService,
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
    this.registaTypedForm.get('sesso')?.valueChanges.subscribe(res => {
      if(res){
        this.registaTypedForm.get('titolo')?.setValue(res === 'MASCHIO' ? 'Sig.' : 'Sig.ra')
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
    const formattedForm = {...form, dataDiNascita: new Date(form.dataDiNascita)};
    this.registaReactive.patchValue(formattedForm);
    this.registaTypedForm.patchValue(formattedForm);
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
          this.snackbarService.openSuccessSnackBar("Salvataggio riuscito!");
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
