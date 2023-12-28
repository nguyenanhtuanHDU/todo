import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, catchError, of, takeUntil, combineLatest, startWith, map, debounceTime } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { IUser } from 'src/app/shared/models/user.model';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelComponent } from 'src/app/shared/components/excel/excel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  listUsers: IUser[] = []
  // users$ = this.mainService.listUser

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    city: new FormControl()
  });

  formSearch = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  users$ = this.mainService.listUser

  destroy = new Subject()
  username: string = ''
  currentPage: number = 1
  page?: number;
  sortSelect: string = ''
  totalItem: number = 0
  labelSort: string[] = []

  constructor(
    private mainService: MainService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllUser()
    this.formSearch.get('username')?.valueChanges.pipe(debounceTime(300)).subscribe(res => {
      this.getAllUser(res?.trim()!)
    })
  }

  getAllUser(username?: string) {
    this.mainService.users.getAll(this.page, 3, username).subscribe(res => {
      this.listUsers = res.data
      this.totalItem = res.totalItem
      this.labelSort = Object.keys(res.data[0]).filter(i => !['__v', 'roles'].includes(i) )
    })
  }

  sortUser(sortBy: string) {
    this.mainService.users.getAll(this.page, 3, '', sortBy).subscribe(res => {
      this.listUsers = res.data
    })
  }

  onSortChange(value: string) {
    this.sortUser(value)
  }

  onOpenExcel() {
    this.modalService.show(ExcelComponent, {
      initialState: {
        data: this.listUsers
      },
      class: 'modal-dialog-centered'
    })
  }

  resetForm() {
    this.form.reset()
  }

  onSubmit() {
    if (this.form.valid) {
      this.mainService.users.create(this.form.value).pipe(
        takeUntil(this.destroy),
        catchError((err) => {
          this.toast.error(err?.error?.message ?? 'Create error');
          return of(null);
        })
      ).subscribe(
        (res) => {
          if (res) {
            this.toast.success(res.message ?? 'Create success');
          }
        }
      );
    } else {
      this.toast.error("Form is not valid")
    }
  }

  onView(item: IUser, index: number) {
    const modal = this.modalService.show(UserDetailComponent, {
      initialState: {
        user: item,
        index
      },
    })
  }

  onDelete(id: string) {
    this.mainService.users.delete(id).pipe(
      takeUntil(this.destroy),
      catchError((err) => {
        this.toast.error(err?.error?.message ?? 'Delete error');
        return of(null);
      })
    ).subscribe(
      (res) => {
        if (res) {
          this.toast.success(res.message ?? 'Delete success');
          this.getAllUser()
        }
      }
    );
  }

  goToChat() {
    this.router.navigate(['chat'])
  }

  pageChanged(event: PageChangedEvent) {
    this.page = event.page;
    this.getAllUser()
  }

  logout() {
    this.authService.removeToken()
    this.router.navigate(['sign-in'])
  }
}
