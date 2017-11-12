


// Given an input array, batch it up.
// e.g. batchUp(['a', 'b', 'c', 'd'], 2) -> ['a', 'b'], ['c', 'd']
export function batchUp(items, itemsPerBatch) {
  return (
    items.reduce((batches, itemValue, itemIndex) => {
      const batchID = Math.floor( itemIndex / itemsPerBatch)
      if(!batches[batchID]) {
        batches[batchID] = []
      }
      batches[batchID].push(itemValue)
      return batches
    }, [])
  )
}
