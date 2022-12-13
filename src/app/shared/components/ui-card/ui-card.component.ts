import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule, SharedModule, MaterialModule],
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css']
})
export class UiCardComponent implements OnInit {

  @Input() cardTitle!: string;
  @Input() cardBody!: string;
  @Input() cardLink!: string;


  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navigateFunction(){
    this.route.navigateByUrl(this.cardLink);
  }

}
