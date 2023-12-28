import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor() { }

  ngOnInit(): void {

  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // get password{
  //   return this.form.value.password
  // }

  // get confirmPassword{
  //   return this.form.value.confirmPassword
  // }

  onSubmit() {
    // console.log(this.form.value);

    // if (this.form.valid && ) {
    //   console.log('ok');

    // } else {

    //   console.log('err');
    // }
  }

  canExit() {
    if (confirm('exit ?')) {
      return true
    } else {
      return false
    }
  }
}
