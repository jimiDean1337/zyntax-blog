import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mastheadData = {
    backgroundImage: 'assets/img/home_masthead_bg.jpg',
    title: 'Zyntax Blog',
    subtitle: 'A Blog by Jimi Flynn',
  };
  constructor() {}

  ngOnInit() {}
}
