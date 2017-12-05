# fungai-react-ui

[![Build Status](https://travis-ci.org/Atlas7/fungai-react-ui.svg?branch=master)](https://travis-ci.org/Atlas7/fungai-react-ui)

A React UI (proof of concept) prototype in support of an upcoming Fungi identification project. ("Fungai" == FungAI)

We've deployed the React App to Heroku at:

[https://fungai-react-ui.herokuapp.com/](https://fungai-react-ui.herokuapp.com/)

Note: I've now set it up so that Heroku automatically build the app based on our master branch,
as soon as Travis CI test is complete and successful.

# A Note on API Call

The ReactJS App performs API calls against [this fake JSON API](https://fungai-json-server-heroku.herokuapp.com/)
that I created and hosted on Heroku. First time when Heroku instance spins up from a sleep may take some time.
After the heroku instance wakes it should be fine. This is the supporting
[GitHub repository](https://github.com/Atlas7/fungai-json-server-heroku) of the fake json-server API.

# Development Instruction

To run this app locally on a macbook / laptop do the followings:

Clone this repository to an appropriate location on your machine:

```
git clone https://github.com/Atlas7/fungai-react-ui.git
```

Install NPM dependencies:

```
npm install
```

Start webpack dev server (the actuall React UI):

```
npm run dev
```

Navigate via a browser (I use Chrome Incognito) at [http://localhost:8080](http://localhost:8080) - yay the app
should be live!

This should be good enough to continue with more dev work.


# Testing

```
npm run test
```

This will run all the tests in the `test` directory. The tests are written with Mocha and Chai.

# Production Build

To bundle do this:

```
npm run build
```

This will output `index.bundle.js` and `index.html` to a newly created `dist`.

# Deploy to a http server

Heroku, Firebase, etc.

## Deploy to Heroku

Use [this really handy guide](https://github.com/alanbsmith/react-node-example) for tips on deploying
React / Node / Webpack app to heroku. Essentially:

```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open
```

- Note 1: Heroku by default run `npm run start`. Add a `Procfile` if you'd like this to be something else.
- Note 2: the original `package.json` has majority of packages stored in devDependencies (instead of directly at
dependencies), such as `babel`, `webpack`, etc. While going through the Heroku deployment exercise I've noticed
that in order to make the heroku build work (i.e. `git push heroku master`) I had to move lots of the `devDependencies`
packages to `dependencies`. No idea why. But this workaround does seem to work - though potentially not elegantly.
