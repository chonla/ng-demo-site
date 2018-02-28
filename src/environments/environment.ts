// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCU8V0G0wrCTxwQqDkoLJPQgshPIwQcc2I',
    authDomain: 'sweet-singer.firebaseapp.com',
    databaseURL: 'https://sweet-singer.firebaseio.com',
    projectId: 'sweet-singer'
  },
  authen: {
    persistence: 'session'
  },
  slugBase: 'http://localhost/'
};
