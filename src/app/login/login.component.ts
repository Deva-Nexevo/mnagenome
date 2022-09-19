import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { AuthenticationService, UserService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  remeber: boolean = false;
  tempUser: string = '';
  tempPassword: string = '';
  application_loaded: boolean = false;
  imageSrc = 'assets/images/new-logo.gif';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // if(this.remeber){
    let rember = localStorage.getItem('rememberme') ?? '0';
    if (rember != '0') {
      this.tempUser = JSON.parse(rember).u;
      this.tempPassword = this.getEncy();
      this.remeber = JSON.parse(rember).m;
    }
    // }

    var curr = localStorage.getItem('currentUser') ?? '0';
    if (curr != '0') {
      this.router.navigate(['/']);
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authenticationService
      .prelogin()
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status == 200) {
            this.application_loaded = true;
          }
        },
        (error) => {}
      );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm?.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        (data) => {
          localStorage.removeItem('rememberme');
          if (this.remeber) {
            localStorage.setItem(
              'rememberme',
              JSON.stringify({
                u: this.f['email'].value,
                p: this.setEncy(),
                m: this.remeber,
              })
            );
          }

          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  forgot() {
    this.router.navigate(['/forgotpassword']);
  }

  remeberMe() {
    this.remeber = !this.remeber;
  }
  setEncy() {
    var key = CryptoJS.enc.Utf8.parse(environment.encKey);
    var iv = CryptoJS.enc.Utf8.parse(environment.encVa);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(this.f['password'].value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  getEncy() {
    let rember = localStorage.getItem('rememberme') ?? '0';

    var key = CryptoJS.enc.Utf8.parse(environment.encKey);
    var iv = CryptoJS.enc.Utf8.parse(environment.encVa);
    var decrypted = CryptoJS.AES.decrypt(JSON.parse(rember).p, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
