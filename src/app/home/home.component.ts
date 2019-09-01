import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mastheadData = {
    title: 'Zyntax Blog',
    subtitle: 'A Blog by Jimi Flynn',
  };
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
