import { expect, should } from 'chai'


const resolvingPromise = new Promise((resolve) =>
  resolve('promise resolved')
);
const rejectingPromise = new Promise((resolve, reject) =>
  reject(new Error('promise rejected'))
);


/*
 When you assert on the result of a promise,
 there are several failure modes you want to test for.
 This is what can go wrong:
 - Your assertion on the result of the promise can fail.
 - The promise you test can reject unexpectedly.
 */

//
describe('async await', () => {

  // returns: response.json(), which is a promise
  // with fake server on...
  async function getImages () {
    const response = await fetch(`http://localhost:3000/images?_limit=10`)
    return response.json()
  }

  async function fetchFirstImage () {
    const images = await getImages()
    return images[0]
  }

  //Output: ✓ assertion success
  it('assertion success', async () => {
    // const firstImage = await fetchFirstImage;
    // expect(firstImage.id).to.equal(1);
    const images = await getImages();
    // console.log(images)
    expect(images.length).to.equal(10);
  });

  //Output: ✓ assertion success
  it('assertion success', async () => {
    // const firstImage = await fetchFirstImage;
    // expect(firstImage.id).to.equal(1);
    const firstImage = await fetchFirstImage();
    // console.log(firstImage)
    expect(firstImage.id).to.equal(1);
  });

})