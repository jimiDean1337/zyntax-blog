import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zyntax-blog';
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateTo(url: string, ...params: any[]) {
    return this.router.navigate([url, ...params], { relativeTo: this.route });
  }
}
