A React UI (proof of concept) prototype in support of an upcoming Fungi identification project.
Still a work in progress.

(Note: the name "Fungai" == FungAI)

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
npm run start
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

Use [this really handy guide](https://github.com/Atlas7/json-server-heroku) for tips on deploying to heroku.
This is a fork to [this original GitHub repository](https://github.com/jesperorb/json-server-heroku).
