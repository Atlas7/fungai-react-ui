// requires for await/async codes, and promises
import 'babel-polyfill'

// requires for using the the ES6 fetch API in both browser window and node environment
import { fetch } from 'isomorphic-fetch'
import { Promise } from 'es6-promise'

// default chai plugin
import chai from 'chai'
import chaiAsPromised from "chai-as-promised"
chai.use(chaiAsPromised)

// alternative chai plugins
// import chai from 'chai'
// import chaiImmutable from 'chai-immutable'
//chai.use(chaiImmutable)
