import React from 'react'
import PropTypes from 'prop-types'

const samples = [
  'http://farm4.static.flickr.com/3285/2941813351_dac12c8152.jpg',
  'http://tn3-2.deviantart.com/fs17/300W/i/2007/203/a/b/Amanita_Muscaria_III_by_maadobs_garden.jpg',
  'http://farm4.static.flickr.com/3069/2805269839_f394735850.jpg',
  'http://farm1.static.flickr.com/26/50780931_60c0598f4b.jpg',
]


function FungPhoto({imgURL}) {
  return (
    <img src={imgURL} alt={'FungPhoto: ' + imgURL}/>
  )
}
FungPhoto.PropTypes = {
  imgURL: PropTypes.string.isRequired,
}


class FungTick extends React.Component {
  static propTypes = {
    speed: PropTypes.number.isRequired,
  }
  static defaultProps = {
    speed: 3000,
  }
  state = {
    url: 'http://farm4.static.flickr.com/3285/2941813351_dac12c8152.jpg',
    index: 0,
  }

  componentDidMount = () => {
    const { speed, samples } = this.props

    this.interval = window.setInterval(() => {
      const stopper = samples.length - 1
      this.state.index >= stopper
        ? this.setState(() => ({
          index: 0,
          url: samples[0]
        }))
        : this.setState((prevState) => ({
            index: prevState.index + 1,
            url: samples[prevState.index + 1]
          }))
    }, speed)
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval)
  }

  render() {
    const { index, url } = this.state
    return (
      <div>
        <p>Sample: {index}</p>
        <p>URL: {url}</p>
        <h3>Ground Truth: {'Algaric'}</h3>
        <h3>Prediction: {'Algaric'}</h3>
        <FungPhoto imgURL={url}/>
      </div>
    )
  }
}

class FungShow extends React.Component {
  render = () => {
    return (
      <div>
        <h1>FungPhoto Page</h1>
        <FungTick speed={3000} samples={samples}/>
      </div>
    )
  }
}

module.exports = FungShow