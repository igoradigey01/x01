import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/shared/services/token.service';
import {UserManagerService} from 'src/app/shared/services/user-manager.service'

@Component({
  selector: 'app-log-off',
  templateUrl: './log-off.component.html',
  styleUrls: ['./log-off.component.scss'],
})
export class LogOffComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenSevice: TokenService,
    private userMangagerService:UserManagerService

  ) {}

  ngOnInit(): void {
    this.tokenSevice.Clear();
    this.userMangagerService.setInvalidLogin$(true);
    this.router.navigate(['']);
  }
}
