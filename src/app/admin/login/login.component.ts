import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected adminInput: { author?: string, email?: string, password?: string };
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async loginWithEmail(author: string, email: string, password: string) {
    return this.auth.loginWithEmail(email, password, author)
      .then((res: Observable<any>) => {
        res.subscribe(data => {
          console.log('login', data)
        })
        return this.router.navigate([`admin`, `dashboard`]);
      })
      .catch(err => console.log('err', err))
  }

}
