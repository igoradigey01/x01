import { Component, OnInit } from '@angular/core';
import {ForgotPasswordDto} from '../shared/_interfaces/forgot-passwordDto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AccountService} from './../shared/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup=new FormGroup({
    email: new FormControl("", [Validators.required])
});
  public successMessage: string|null=null;
  public errorMessage: string|null=null;
  public showSuccess: boolean|null=null;
  public showError: boolean=false;

  constructor(
    private _authService: AccountService
  ) { }

  ngOnInit(): void {
   // this.forgotPasswordForm =
}
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm!.controls[controlName].invalid && this.forgotPasswordForm!.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm!.controls[controlName].hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue:any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/account/resetpassword'
    }
    this._authService.forgotPassword( forgotPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      this.successMessage = 'Ссылка была отправлена, пожалуйста, проверьте свою электронную почту, чтобы сбросить пароль.'
    },
    err => {
      this.showError = true;
      this.errorMessage = err;
    })
  }


}
