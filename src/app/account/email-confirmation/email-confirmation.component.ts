import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AccountService} from './../shared/services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean=false;
  public showError: boolean=false;
  public errorMessage: string|null=null;

  constructor(
    private _authService: AccountService,
    private _route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    console.log(token);
    this._authService.confirmEmail( token, email)
    .subscribe(_ => {
      this.showSuccess = true;
    },
    error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }

}
