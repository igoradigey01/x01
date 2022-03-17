import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagerService } from 'src/app/shared/services/user-manager.service';
import { ProfileService } from './../shared/services/profile.service';
import { User } from 'src/app/shared/_interfaces/user.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit {
  _form: FormGroup | null = null;
  _successfulSave: boolean = false; // пользователь успешно сохранен
  _errorMgs: string[] = [];
  _flagButoon: boolean = false;

  public _user: User = <User>{
    name: '',
    password: '',
    phone: '',
    address: '',
    email: '',
  };

  constructor(
    private userManagerService: UserManagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private profileServece: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.userManagerService.user) this._user = this.userManagerService.user;

    //console.log( " test user-profile-edit _user.address--"+this._user.address);
    this._form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(), //----------12.09.20
      phone: new FormControl('+7', Validators.pattern('[+0-9]{12}')),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', [
        Validators.required,
        this.equalto('password'),
      ]),
    });
  }

  submitForm() {
    // throw new Error("not Impliment Exeption");
    this._flagButoon = true;
    /*
    let  user:User=new User(this._form.value.name,this._form.value.password,this._form.value.email,
    this._form.value.phone,this._form.value.address);
    */
    this._errorMgs = [];

    this.profileServece.Update(this._user).subscribe(
      (data) => {
        this._successfulSave = true;
        this.router.navigateByUrl('/auth/user-profile');
      },
      (error: HttpErrorResponse) => {
        this._successfulSave = false;
        this._flagButoon = false;
        //   this._errorMgs=error.error;// error может быть и 400 и 500 -- если err===400 то можно setValidationErrors(this.form, error)
        let body: string = JSON.stringify(error.error);
        if (error.ok) {
          console.log('error statys ok');

          this._successfulSave = true;
          return;
        }
        if (error.status == 400) {
          console.log('error consoll----' + body);

          let validationErrorDictionary = JSON.parse(body);
          for (var fieldName in validationErrorDictionary) {
            if (validationErrorDictionary.hasOwnProperty(fieldName)) {
              this._errorMgs.push(validationErrorDictionary[fieldName]);
            }
          }
          return;
        }

        body =
          'Ошибка соединения с сервером -Сообщиете Администаратору ресурса';
        console.log('error consoll----' + body);

        this._errorMgs.push(body);
      }
    );
    //console.log('User',this._form.value as User);
    //console.log('password',this._form.value.password)
    //throw new Error("---Metod не задан --onchengFlag()--body-shop.component.ts")
  }

  equalto(field_name: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input;
      if (!isValid) return { equalTo: { isValid } };
      else return null;
    };
  }
}
