import React from 'react'
import PropTypes from 'prop-types'
import { wait, fetchPredictions } from '../utils/fakeAPI'
import Loading from './Loading'


function SelectWnid ({onSelect, selectedWnid}) {
  const wnids = ['all', 'n13030337', 'n13003061', 'n13040629']
  return (
      <ul className='wnids'>
        {wnids.map((wnid) => {
          return (
            <li
              key={wnid}
              style={wnid === selectedWnid ? {color: '#d0021b'} : null}
              onClick={onSelect.bind(null, wnid)}>
                {wnid}
            </li>
          )
        })}
      </ul>
  )
}

class FungPredict extends React.Component {
  state = {
    selectedWnid: 'all',
    testPredictions: null,
    loadingText: "badger badger badger badger",
    lyricsIndex: 0,
    loadingImage: `https://media.giphy.com/media/rF0jfK42BQWDS/giphy.gif`
  }

  componentDidMount = () => {
    this.updateWnid(this.state.selectedWnid)
  }

  updateWnid = async (wnid) => {
    this.setState({
      selectedWnid: wnid,
      testPredictions: null
    })
    // artificial delay
    await wait(1000)
    const testPredictions = await fetchPredictions(wnid)
    this.setState({
      testPredictions,
    })
    this.updateLoadingText()
  }

  updateLoadingText = () => {
    const lyrics = [
      {text: "badger badger badger badger", image: `https://media.giphy.com/media/rF0jfK42BQWDS/giphy.gif`},
      {text: "mushroom mushroom", image: `https://i.imgur.com/T4TJ5eb.gif`}
    ]

    const { lyricsIndex, loadingText} = this.state
    const newLyricsIndex = lyricsIndex + 1 >=lyrics.length ? 0 : lyricsIndex + 1

    this.setState({
      lyricsIndex: newLyricsIndex,
      loadingText: lyrics[newLyricsIndex].text,
      loadingImage: lyrics[newLyricsIndex].image,
    })
  }

  increment = (number) => number + 1

  render = () => {
    return (
        <div>
          <h1>FungPredict</h1>
          <SelectWnid
            selectedWnid={this.state.selectedWnid}
            onSelect={this.updateWnid}
          />

          {
            this.state.testPredictions
              ? JSON.stringify(this.state.testPredictions, null, 2)
              : <div className='loading-box'>
                  <img className='loading-image' src={this.state.loadingImage} />
                  <Loading text={this.state.loadingText} speed={100} />
                  <img className='loading-image' src={this.state.loadingImage} />
                </div>

          }
        </div>
      )
  }
}

module.exports = FungPredict