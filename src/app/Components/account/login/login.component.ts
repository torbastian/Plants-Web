import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild("username") usernameField: ElementRef;
  editUsername(): void {
    this.usernameField.nativeElement.focus();
  }

  LoginForm = new FormGroup({
    Username: new FormControl("", Validators.required),
    Password: new FormControl("", Validators.required)
  })
  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  userNotFound: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  ngAfterViewInit() {
    this.editUsername();
  }

  login() {
    let username = this.LoginForm.value.Username;
    let password = this.LoginForm.value.Password;

    this.accountService.login(username, password).subscribe(
      user => {
        console.log(user);
      }, err => {
        this.userNotFound = true;
        console.error(err);
      },
      () => this.navigateUser()
    );
  }

  getCurrentUser() {
    if (this.accountService.userValue != null) {
      this.isLoggedIn = true;
      console.log(this.accountService.userValue);
    }
  }

  navigateUser() {
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }
}
