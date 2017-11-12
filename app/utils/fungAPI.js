


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

export function getSamples () {
  return [
    'http://farm4.static.flickr.com/3285/2941813351_dac12c8152.jpg',
    'http://tn3-2.deviantart.com/fs17/300W/i/2007/203/a/b/Amanita_Muscaria_III_by_maadobs_garden.jpg',
    'http://farm4.static.flickr.com/3069/2805269839_f394735850.jpg',
    'http://farm1.static.flickr.com/26/50780931_60c0598f4b.jpg',
  ]
}

export function getBatchedSamples (batchSize) {
  return batchUp(getSamples(), batchSize)
}