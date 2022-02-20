import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {AccountService} from './../shared/services/account.service';
import {ResetPasswordDto} from './../shared/_interfaces/reset-passwordDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import {PasswordConfirmationValidatorService} from './../shared/services/password-confirmation-validator.service'


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup ;
  public _flagButoon:boolean=false;

  public showSuccess: boolean=false;
  public showError: boolean=false;
  _errorMgs: string[] = [];
  private _token: string|null=null;
  private _email: string|null=null;

  constructor(

    private _authService:AccountService,
    private _passConfValidator: PasswordConfirmationValidatorService,
    private _route: ActivatedRoute

  ) {

   this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });

  }

  ngOnInit(): void {
    // this.resetPasswordForm =
    let confirm=this.resetPasswordForm.get('confirm');
    let pass=this.resetPasswordForm.get('password');
    if(confirm&&pass)
    confirm.setValidators([Validators.required,
    this._passConfValidator.validateConfirmPassword(pass)]);

    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue:any) => {
    this.showError = this.showSuccess = false;
    this._errorMgs=[];

    const resetPass = { ... resetPasswordFormValue };

    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token||'',
      email: this._email||''
    }

    this._authService.resetPassword( resetPassDto)
    .subscribe(_ => {
     this._flagButoon=true;
      this.showSuccess = true;
    },
    (error: HttpErrorResponse) => {


      this._flagButoon = false;
      if(error.status === 401){
        this._errorMgs.push("пользователь не авторизован,войдите на сайт")
        return;
      }

      if ( error.status == 400) {
        console.log(error.error);
        if (error.error.errors)
          this._errorMgs.push(error.error.errors);
        else
          this._errorMgs.push(error.error);
        return;
      }

      this._errorMgs.push('Ошибка соединения с сервером -Сообщиете Администаратору Pесурса');
    })
  }

}
