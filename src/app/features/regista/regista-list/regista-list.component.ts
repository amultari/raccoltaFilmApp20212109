import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Regista } from 'src/app/model/regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-list',
  templateUrl: './regista-list.component.html',
  styleUrls: ['./regista-list.component.css']
})
export class RegistaListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'nickname', 'dataDiNascita', 'sesso'];
  dataSource: MatTableDataSource<Regista> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  registi: Regista[] = [];
  sub?: Subscription;
  confirmMessage: string = '';

  constructor(private registaService: RegistaService, private route: ActivatedRoute, private router: Router) {
    this.registaService.getRegisti().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    
    this.sub = this.registaService.getRegisti().subscribe(registaListItem => {
      this.registi = registaListItem
    });

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

  modificaRegista(id: number){
    this.router.navigateByUrl('regista/edit/'+id)
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


}
