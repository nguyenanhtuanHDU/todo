import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {
  }
  form = new FormGroup({
    username: new FormControl('tuan', Validators.required),
    password: new FormControl('123', Validators.required)
  });
  destroy = new Subject()

  onSubmit() {
    if (this.form.valid) {
      this.socketService.setUser(this.form.value.username!)
      this.authService.login(this.form.value)
        .pipe(
          takeUntil(this.destroy),
          catchError((err) => {
            this.toast.error(err?.error?.message ?? 'Login error');
            return of(null);
          })
        ).subscribe(
          (res: any) => {
            if (res) {
              this.toast.success(res.message ?? 'Login success');
              this.authService.setToken(res.data.accessToken)
              this.router.navigate(['/home'])
            }
          }
        );
    } else {
      this.toast.error('Form is not valid')
    }
  }
}
