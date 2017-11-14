//This is real code, run me with 'npm test'!
//Blog: http://blog.xebia.com/testing-es2015-promises-with-mocha/ ‎

import chai, { expect, should } from 'chai';
should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

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


describe('async await', () => {

  //Output: ✓ assertion success
  it('assertion success', async () => {
    const result = await resolvingPromise;
    expect(result).to.equal('promise resolved');
  });

  //Output: AssertionError: expected 'promise resolved' to equal 'i fail'
  it('failing assertion', async () => {
    const result = await resolvingPromise;
    expect(result).to.equal('i fail');
  });

  //Output: Error: promise rejected
  it('promise rejects', async () => {
    const result = await rejectingPromise;
    expect(result).to.equal('promise resolved');
  });

  /*
   This style is just as safe as the '.then(done,done)' style,
   but it's much easier to read since there is no chaining and nesting
   of then callbacks.
   */

})