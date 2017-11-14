// query our fake json-server accessible via http://localhost:3000
// our DB is defined at fakeServer/db.json
// - top level is resource
// - sub levels may be used for querying
//
const backendServer = 'http:/localhost:3000'

export async function getImages () {
  const limit = 10
  const params = `_limit=${limit}`
  const response = await fetch(`${backendServer}/images?${params}`)
  const imagest = response.json()
  return images
}
