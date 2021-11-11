import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/shared/sevices/token.service';

@Component({
  selector: 'app-log-off',
  templateUrl: './log-off.component.html',
  styleUrls: ['./log-off.component.scss'],
})
export class LogOffComponent implements OnInit {

  constructor(
    private router: Router,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    this.token.Clear();
    this.router.navigate(['']);
  }
}
