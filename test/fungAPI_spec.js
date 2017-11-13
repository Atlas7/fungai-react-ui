import {expect} from 'chai';
import { batchUp } from '../app/utils/fungAPI'


describe('fungAPI', () => {
  describe('batchUp', () => {
    it('4 photos, 2 per batch, 2 batches', () => {
      const state = ['a', 'b', 'c', 'd']
      const nextState = batchUp(state, 2);
      const expectedNextState = [['a', 'b'], ['c', 'd']]
      expect(nextState).to.deep.equal(expectedNextState)
      expect(state).to.deep.equal(['a', 'b', 'c', 'd'])
    })
  })
})