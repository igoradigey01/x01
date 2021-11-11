import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly access_token: string = 'access_token'; //name in localStorage
  private readonly refresh_token: string = 'refresh_token'; //name in localStorage

  constructor() {}

  /** Get access_token */
  public get AccessToken(): string | null {
    let token = localStorage.getItem(this.access_token);

    return token;
  }
  /** Set access_token */
  public set AccessToken(access_token: string | null) {
    if (access_token) localStorage.setItem(this.access_token, access_token);
  }
  /**  access_token существует в репозитории? */
  public get Exists(): boolean {
    let token = localStorage.getItem(this.access_token);

    if (token) {
      return true;
    }
    return false;
  }
  /**Clear access_token */
  Clear(): void {
    localStorage.removeItem(this.access_token);
  }

  /** Set refresh_token */
  public set RefreshToken(refresh_token: string | null) {
    if (refresh_token) localStorage.setItem(this.refresh_token, refresh_token);
  }

  /** Get refresh_token */
  public get RefreshToken(): string | null {
    let token = localStorage.getItem(this.access_token);

    return token;
  }

  /**  refresh_token существует в репозитории?*/
  public ExistsRefreshToken(): boolean {
    if (this.RefreshToken) {
      return true;
    }
    return false;
  }
  /** Clear refresh_token */
  public ClearRefreshToken(): void {
    localStorage.removeItem(this.refresh_token);
  }

  public IsAdmin(): boolean {
    if (this.Role === 'admin') {
      return true;
    }
    return false;
  }

  public IsManager(): boolean {
    // throw new Error("not impliment exeption");

    if (this.Role === 'manager') {
      return true;
    }
    return false;
  }

  public IsShopper(): boolean {
    if (this.Role === 'shopper') {
      return true;
    }
    return false;
  }

  private get Role() {
    let jwt = this.AccessToken;

    if (!this.Exists) {
      return false;
    }
    let dataJwt = jwt?.split('.')[1];
    if (!dataJwt) {
      return false;
    }
    let decodeData = atob(dataJwt);
    let data = JSON.parse(decodeData);
    console.log('decodeData--' + decodeData);
    console.log('data--' + data.role);
    return data;
  }
}
