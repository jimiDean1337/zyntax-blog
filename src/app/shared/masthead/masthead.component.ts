import { Component, OnInit, Input } from '@angular/core';
export interface MastHeadData {
  title?: string,
  subtitle?: string,
  backgroundImage?: string,
  iconOrThumb?: string
}
@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
})
export class MastheadComponent implements OnInit {
  @Input() mastheadData?: MastHeadData;
  constructor() { }

  ngOnInit() {
    if (!this.mastheadData.backgroundImage) {
      this.mastheadData.backgroundImage = 'http://lorempixel.com/abstract/1500/1000';
    }
  }
}
