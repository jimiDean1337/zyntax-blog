import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mastheadData = {
    title: 'A Blog by Jimi Flynn',
    subtitle: 'Tech, Dev, and More',
    backgroundImage: 'https://blog.hubspot.com/hubfs/product-marketing-1.jpg'
  };
  constructor(private authService: AuthService) { }

  ngOnInit() { }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
