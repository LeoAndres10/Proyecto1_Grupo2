import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { App } from '../../app';
@Component({ 
  standalone:true,
  selector: 'app-home',
  imports: [RouterOutlet,CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor( private appService: App) {}

  logout() {
    this.appService.logout();
  }
}
