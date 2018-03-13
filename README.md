# doro6
web app that opens my door (executes some python script).\
using RPi 3.0\
node.js\
express\
passport with fb auth.

### set up

rename `.env.example` to `.env` and set your fb app id and secret key.\
.then(\
`npm install` or `yarn install`\
.done(() => available commands;)\
`npm run dev` for development\
`npm run  server` for prod? :todo:\
`npm run lint` for es linting\
`npm run lint-fix` fix lint errors\

### prod

use forever (`npm install forever -g`)\
then `npm run forever`
to stop it `forever stop doro6`
