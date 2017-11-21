A React UI (proof of concept) prototype in support of an upcoming Fungi identification project.
Still a work in progress.

(Note: the name "Fungai" == FungAI)

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

Start `json-server` where a fake API is served. Essentially an entire toy database (that I created) in one `db.json`.

```
npm run start-api
```

This will start a fake API at [http://localhost:3000](http://localhost:3000).

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

This is a TODO. Some options are firebase, heroku, etc.
