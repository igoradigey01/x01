// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
   production: false,

   clientRoot:  'http://localhost:4200/', //'https://x-01.ru/',       //  Host client
   serverRoot: 'http://localhost:5010/', //'https://s.x-01.ru/',  //'http://localhost:8080/',  //            //
   serverAuthority:'http://localhost:5010/',//'https://s.x-01.ru/',             //
   clientId:'angular-client',
   postavchik_XF01_Id:'1',// postavchikId:'1',//xf-01.ru
   postavchik_X01_Id:'2',
   version:'b2.02.22',
   description:"Client shop- вторая редакция (angular:13.1.2)(26.03.22)"

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
