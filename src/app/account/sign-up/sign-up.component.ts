import { UserRegistrationDto } from '../shared/_interfaces/user-registrationDto.model';
import { AccountService } from '../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationResponseDto } from '../shared/_interfaces/registration-responseDto.model'
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PasswordConfirmationValidatorService } from './../shared/services/password-confirmation-validator.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public registerForm: FormGroup;

  _successfulSave: boolean = false;// пользователь успешно сохранен
  _errorMgs: string[] = [];
  _flagButoon: boolean = false;

  constructor(
    private _authService: AccountService,
    private _passConfValidator: PasswordConfirmationValidatorService

  ) {

    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl(''),
    });


  }

  ngOnInit(): void {
    let pass = this.registerForm.get('password');
    if (pass)
      this.registerForm.get('confirm')!.setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(pass)]);

  }

  public validateControl(controlName: string) {
    return (
      this.registerForm!.controls[controlName].invalid &&
      this.registerForm!.controls[controlName].touched
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm!.controls[controlName].hasError(errorName);
  };

  public registerUser = (registerFormValue: any) => {

    const formValues = {    // let array1 = ['h', 'e', 'l', 'l', 'o'];
      ...registerFormValue,  //  let array2 = [...array1]; // -- ['h', 'e', 'l', 'l', 'o'] --- вывод
    };

    const user: UserRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm,
      clientURI: environment.clientRoot + 'account/email-confirmation'
    };
    this._errorMgs.length = 0;

    this._authService.registerUser(user).subscribe(

      (_) => {
        console.log('Successful registration');
        this._successfulSave = true;
        this._flagButoon = true;
      },
      (error: HttpErrorResponse) => {

        this._successfulSave = false;
        this._flagButoon = false;
        
        if (error.status === 401 || error.status == 400) {
          console.log(error.error);
          if (error.error.errors)
            this._errorMgs.push(error.error.errors);
          else
            this._errorMgs.push(error.error);
          return;
        }

        this._errorMgs.push('Ошибка соединения с сервером -Сообщиете Администаратору Pесурса');
      }
    );
  };
}
