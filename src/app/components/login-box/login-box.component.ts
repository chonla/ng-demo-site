import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CreateLoginComponent } from '../create-login/create-login.component';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  @ViewChild('errorModal') error: ErrorAlertComponent;
  loginForm: FormGroup;
  locked: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.lock();
    this.error.hide();
    const formModel = this.loginForm.value;
    this.auth.login(formModel)
      .then(() => {
        this.router.navigate(['/user']);
      })
      .catch((e) => {
        this.error.show('ล็อกอินไม่สำเร็จ', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        this.unlock();
      });
    return false;
  }

  ngOnInit() {
    this.unlock();
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  createLogin() {
    const createLoginModalOptions = {
      animated: true,
      backdrop: true,
      keyboard: false,
      focus: true,
      ignoreBackdropClick: true
    };
    this.modalService.show(CreateLoginComponent, createLoginModalOptions);
    return false;
  }

}
