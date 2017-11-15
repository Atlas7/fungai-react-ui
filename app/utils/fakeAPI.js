// query our fake json-server accessible via http://localhost:3000
// our DB is defined at fakeServer/db.json
// - top level is resource
// - sub levels may be used for querying
//

const server = 'http://localhost:3000'

const dummiesURI = `${server}/dummies`
const classesURI = `${server}/classes`
const imagesURI = `${server}/images`
const testPredictionsURI = `${server}/testPredictions`

async function fetchResource (encodedUri) {
  const response = await fetch(encodedUri)
  return response.json()
}
