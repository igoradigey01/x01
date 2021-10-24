// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAxAhm9TPJuvqRx3kqQ2kUOMvzHzo9R2Us',
   // authDomain: 'x-01-mystore.firebaseapp.com',
    databaseURL: 'x-01-mystore.firebaseio.com',
    projectId: 'x-01-mystore'

  },

   clientRoot:'http://localhost:4200', //  Host client
   serverRoot:'http://localhost:8080/',
   serverAuthority:'http://localhost:5010/',
   clientId:'angular-client'

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
