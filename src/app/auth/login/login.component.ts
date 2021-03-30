import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.login(loginForm.value.email, loginForm.value.password);
    authObs.subscribe(
      resData => {
        this.error = "";
        this.isLoading = false;
        console.log("NEXTILE VAJUTATUD");
        this.authService.loggedInChanged.next(true);
        // this.router.navigate(["admin"], { relativeTo: this.route });
        this.router.navigateByUrl("/admin");
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    loginForm.reset();
  }

}
