import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zyntax-blog';
  showCollapsed = false;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  loggedIn() {
    return this.auth.loggedIn();
  }

  signOut() {
    return this.navigateTo('home')
      .then(() => {
        return this.auth.signOut()
          .then(res => this.showCollapsed = false);
      });
  }

  navigateTo(url: string, params = []) {
    return this.router.navigate([url, params.map(val => val)], { relativeTo: this.route }).then(success => this.showCollapsed = false);
  }

  toggleCollapse() {
    this.showCollapsed = !this.showCollapsed;
  }

}
