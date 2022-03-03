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
  // debugger
    if (token&&this.isTokenExpired()) {
      return true;
    }
    return false;
  }

  /**Clear access_token */
  Clear(): void {
    localStorage.removeItem(this.access_token);
  }


  getExpiryTime() {
   let token=  this.decodeToken()

   return token ? token.exp : null;

  }
 /** срок действия токена истек ?*/
  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      let time=  (new Date()).getTime();
      let exp=(1000 * expiryTime) ;
      if (time >= exp ) {
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  private  decodeToken():any{

    let dataJwt = this.AccessToken?.split('.')[1];
    if (!dataJwt) {
      return null;
    }
    let decodeData = atob(dataJwt);
    let data = JSON.parse(decodeData);
    //console.log('decodeData--' + decodeData);
   // console.log('data--' + data.role);
    return data;

  }

  public get Role():string|null {
     let token=  this.decodeToken()

   return token ? token.role : null;

  }

  /** Set refresh_token не используется */
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

}
