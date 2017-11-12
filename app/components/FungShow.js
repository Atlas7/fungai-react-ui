import React from 'react'
import PropTypes from 'prop-types'
import { getBatchedSamples } from '../utils/fungAPI'


function FungPhoto({imgURL}) {
  return (
    <img className='fung-photo' src={imgURL} alt={'FungPhoto: ' + imgURL}/>
  )
}
FungPhoto.PropTypes = {
  imgURL: PropTypes.string.isRequired,
}


function PhotosGrid ({photos}) {
  // console.log(photos)
  // console.log(photos instanceof Array)
  return (
    <ul className='popular-list'>
      {photos.map((photo, index) => (
        <li key={photo} className='popular-item'>
          <div className='popular-rank'>
            Sample {index + 1}
          </div>
          <FungPhoto imgURL={photo}/>
        </li>
      ))}
    </ul>
  )
}
PhotosGrid.PropTypes = {
  photos: PropTypes.array.isRequired,
}



class FungTick extends React.Component {
  static propTypes = {
    speed: PropTypes.number.isRequired,
    batchSize: PropTypes.number.isRequired,
  }
  static defaultProps = {
    speed: 3000,
    batchSize: 1,
  }
  state = {
    photoBatches: null,
    batchID: null,
    photoBatch: null,
  }
  getBatchedSamples = () => {
    console.log('FungTick: getBatchedSamples')
    const { batchSize } = this.props
    const photoBatches = getBatchedSamples(batchSize)
    this.setState(() => ({
      photoBatches: photoBatches,
      batchID: 0,
      photoBatch: photoBatches[0]
    }))
  }
  tick = () => {
    console.log('FungTick: tick')
    const { speed } = this.props
    this.interval = window.setInterval(() => {
      const stopper = this.state.photoBatches.length - 1
      this.state.batchID >= stopper
        ? this.setState(() => ({
        batchID: 0,
        photoBatch: this.state.photoBatches[0]
      }))
        : this.setState((prevState) => ({
        batchID: prevState.batchID + 1,
        photoBatch: this.state.photoBatches[prevState.batchID + 1]
      }))
    }, speed)
  }
  componentWillMount = () => {
    console.log('FungTick: componentWillMount')
    this.getBatchedSamples()
  }
  componentDidMount = () => {
    console.log('FungTick: componentDidMount')
    this.tick()
  }
  componentWillUnmount = () => {
    console.log('FungTick: componentWillUnmount')
    window.clearInterval(this.interval)
  }
  render = () => {
    console.log('FungTick: render')
    const { batchID, photoBatches, photoBatch  } = this.state
    return (
      <div>
        <ul className='space-list-items'>
          <li>Batch Size: {this.props.batchSize}</li>
          <li>Batch: {batchID + 1} / {photoBatches.length}</li>
        </ul>
        <PhotosGrid photos={photoBatch}/>
      </div>
    )
  }
}


class FungShow extends React.Component {
  render = () => {
    return (
      <div>
        <h1>FungPhoto Page</h1>
        <FungTick speed={3000} batchSize={2}/>
      </div>
    )
  }
}

module.exports = FungShow