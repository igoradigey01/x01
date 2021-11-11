
import { Injectable } from "@angular/core";
import { User } from '../../account/shared/_interfaces/user.model';

@Injectable({ providedIn: "root"})
export class GlobalVar {
  userAuth: boolean = false; // авторизован ли пользователь ? иконка входа цвет
  userSerialize?: User|null = null; // передача данных на сервер в параметрах // edit-profile,profile
  isAdimin: boolean = false;  // является ли пользователь админ,для перехода в админ модуль
  isManager: boolean = false; // 03.10.21
  isShopper:boolean=false; // role -покупатель(клиент)
  invalidLogin:boolean=true; // авторизован ли пользователь ? иконка входа цвет 03.10.21

}
