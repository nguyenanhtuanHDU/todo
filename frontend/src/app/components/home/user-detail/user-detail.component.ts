import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  @ViewChild('input') input!: ElementRef<HTMLElement>
  user!: IUser
  index: number = -1
  form = new FormGroup({
    username: new FormControl(),
    city: new FormControl()
  });
  destroy = new Subject()

  constructor(
    private modalRef: BsModalRef,
    private toast: ToastrService,
    private mainService: MainService
  ) {
  }

  ngOnInit(): void {
    this.modalRef.setClass('modal-dialog-centered')
    this.setData()
    setTimeout(() => {
      this.input.nativeElement.focus()
    }, 300);
  }

  setData() {
    if (this.user) {
      this.form.patchValue(this.user)
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.mainService.users.update(this.user._id, this.form.value, this.index).pipe(
        takeUntil(this.destroy),
        catchError((err) => {
          this.toast.error(err?.error?.message ?? 'Update error');
          return of(null);
        })
      ).subscribe(
        (res) => {
          if (res) {
            this.toast.success(res.message ?? 'Update success');
            this.modalRef.hide()
          }
        }
      );
    } else {
      this.toast.error("Form is not valid")
    }
  }
}
