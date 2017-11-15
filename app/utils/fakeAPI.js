// query our fake json-server accessible via http://localhost:3000
// our DB is defined at fakeServer/db.json
// - top level is resource
// - sub levels may be used for querying
//

// import Promise from 'es6-promise'

const server = 'http://localhost:3000'

const dummiesURI = `${server}/dummies`
const classesURI = `${server}/classes`
const imagesURI = `${server}/images`
const testPredictionsURI = `${server}/testPredictions`

// generic fetch. Return a promise.
export async function fetchResource (encodedUri) {
  const response = await fetch(encodedUri)
  return response.json()
}

// artificial delay. Return a promise
export async function wait (ms) {
  const hello = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, ms)
  })
  return hello
}

// image fetch. Return images array
export async function fetchImages (wnid) {
  const wnidFilter = (wnid === 'all')
    ? ''
    : `class.wnid=${wnid}`
  const encodedUri = `${imagesURI}?${wnidFilter}`
  // console.log(encodedUri)
  const images = await fetchResource(encodedUri)
  return images
}

