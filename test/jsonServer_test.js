import { assert } from 'chai'

const server = 'http://localhost:3000'


describe("basic json-server test", () => {

  describe('async fetch dummies', () => {

    // params is an string. return a promise
    async function fetchResource (encodedUri) {
      const response = await fetch(encodedUri)
      return response.json()
    }

    it(`fetch 5 dummies`, async () => {
      const uri = encodeURI(`${server}/dummies?_limit=5`)
      const dummies = await fetchResource(uri)
      assert.lengthOf(dummies, 5, "dummies has length of 5")
    })

    it(`fetch dummy1`, async () => {
      const uri = encodeURI(`${server}/dummies?name=dummy1`)
      const dummies = await fetchResource(uri)
      const dummy1 = dummies[0]
      const expectedDummy1 = {
        "id": 1,
        "name": "dummy1",
        "age": 20,
        "bodyParts": {
          "head": true,
          "body": true,
          "arms": {
            "left": true,
            "right": true
          }
        }
      }

      assert.lengthOf(dummies, 1, "dummies has length of 1")
      assert.instanceOf(dummy1, Object, "dummy1 is an instance of an object")
      assert.equal(dummy1.id, 1, "dummy1 has id=1")
      assert.deepEqual(dummy1, expectedDummy1, "actually dummy1 returned should deep-equal expected")

    })

  })
})
