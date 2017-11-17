import React from 'react'
import PropTypes from 'prop-types'
import { wait, fetchPredictions } from '../utils/fakeAPI'
import Loading from './Loading'


function PredJSON ({pred}) {
  return (
    <div>
      {JSON.stringify(pred, null, 2)}
    </div>
  )
}
TruthBox.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function ItemLabel ({index}) {
  return (
    <div className='item-label'>
      #{index + 1}
    </div>
  )
}
TruthBox.PropTypes = {
  index: PropTypes.number.isRequired,
}


function TruthBox ({pred}) {
  const {image} = pred
  return (
    <div className="truth-box">
      <ul className='space-list-items'>
        <img
          className='fung-photo'
          src={image.imageURL}
          alt={':-('}
        />
        <li><a href={image.imageURL}>source</a></li>
      </ul>
    </div>
  )
}
TruthBox.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function PredBox ({pred}) {
  const trueClass  = pred.image.class
  const { predictClasses, predictScores } = pred
  const predObjects = predictClasses.map((e, i) => ({
    predClass: e,
    predScore: predictScores[i],
    trueClass: trueClass,
    predCorrect: e.wnid === trueClass.wnid
  }))
  return (
    <ul className="pred-box">
        {
          predObjects.map(({predScore, predClass, predCorrect}, index) => {
            const barColor = predCorrect? "green" : "red"
            const barWidth = `${predScore*100}%`
            return (
              <li className="pred-box-item" key={index}>
                <div className="pred-class">
                  <div className="pred-class-text">{predClass.commonName}</div>
                  <div
                    className="pred-class-bar"
                    style={{
                      "backgroundColor": `${barColor}`,
                      "width": `${barWidth}`,
                    }}/>
                </div>
                <div className="pred-score">{predScore}</div>
              </li>
            )
          })
        }
    </ul>
  )
}


function PredsGrid ({preds}) {
  return (
    <div className='preds-grid'>
      <ul className='popular-list'>
        {preds.map((pred, index) => (
          <li key={pred.imageId} className='pred-item'>
            <ItemLabel index={index} />
            <TruthBox pred={pred} />
            <PredBox pred={pred}  />
          </li>
        ))}
      </ul>
    </div>
  )
}
PredsGrid.PropTypes = {
  preds: PropTypes.array.isRequired,
}


function SelectWnid ({onSelect, selectedWnid}) {
  const wnids = ['all', 'n13030337', 'n13003061', 'n13040629']
  const commonNames = ['all', 'Scarlet Elf cup', 'Fly Agaric', 'Common stinkhorn']
  const wnidObjects = wnids.map((e, i) => ({
    wnid: e,
    commonNames: commonNames[i]
  }))
  return (
      <ul className='wnids'>
        {wnidObjects.map(({wnid, commonNames}) => {
          return (
            <li
              key={wnid}
              style={wnid === selectedWnid ? {color: '#d0021b'} : null}
              onClick={onSelect.bind(null, wnid)}>
                {`${commonNames}`}
            </li>
          )
        })}
      </ul>
  )
}
SelectWnid.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedWnid: PropTypes.string.isRequired,
}


function PredsLoading ({loadingText, loadingImage, speed}) {
  return (
    <div>
      <div className='loading-box'>
        <img className='loading-image' src={loadingImage} />
        <Loading text={loadingText} speed={speed} />
        <img className='loading-image' src={loadingImage} />
      </div>
      <footer>Badger Badger Credit to: mrweebl</footer>
    </div>
  )
}
PredsLoading.propTypes = {
  loadingText: PropTypes.string.isRequired,
  loadingImage: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
}
PredsLoading.defaultProps = {
  loadingText: "badger badger badger badger",
  loadingImage: "https://media.giphy.com/media/rF0jfK42BQWDS/giphy.gif",
}


function Intro ({wnid}) {
  return (
    <div>
      <h1>Fungi Classification</h1>
      <ul>
        <li>Ground Truth vs Prediction</li>
        <li>Image source: Imagenet</li>
        <li>Selected WordsNet ID (wnid): {wnid}</li>
      </ul>
    </div>
  )
}
Intro.propTypes = {
  wnid: PropTypes.string.isRequired
}


class FungPredict extends React.Component {
  state = {
    selectedWnid: 'all',
    preds: null,
    loadingText: "badger badger badger badger",
    lyricsIndex: 0,
    loadingImage: `https://media.giphy.com/media/rF0jfK42BQWDS/giphy.gif`
  }
  componentDidMount = () => {
    this.updateWnid(this.state.selectedWnid)
  }
  updateWnid = async (wnid) => {
    const delay = 1000
    this.setState({
      selectedWnid: wnid,
      preds: null
    })
    // artificial delay
    await wait(delay)
    const preds = await fetchPredictions(wnid)
    // artificial randomness
    const shuffledPreds = this.shuffleArray(preds)
    this.setState({
      preds: shuffledPreds,
    })
    this.updateLoadingText()
  }
  shuffleArray = (arr) => (arr.sort(() => Math.random() - 0.5))
  updateLoadingText = () => {
    const lyrics = [
      {text: "badger badger badger badger", image: `https://media.giphy.com/media/rF0jfK42BQWDS/giphy.gif`},
      {text: "mushroom mushroom", image: `https://i.imgur.com/T4TJ5eb.gif`}
    ]
    const { lyricsIndex } = this.state
    const newLyricsIndex = this.increment(lyricsIndex) >= lyrics.length
      ? 0
      : this.increment(lyricsIndex)
    this.setState({
      lyricsIndex: newLyricsIndex,
      loadingText: lyrics[newLyricsIndex].text,
      loadingImage: lyrics[newLyricsIndex].image,
    })
  }
  increment = (number) => number + 1
  render = () => {
    const {selectedWnid, preds, loadingText, loadingImage} = this.state
    return (
        <div>
          <Intro wnid={selectedWnid} />
          <SelectWnid selectedWnid={selectedWnid} onSelect={this.updateWnid}/>
          {
            preds
              ? <PredsGrid preds={preds} />
              : <PredsLoading
                  loadingText={loadingText}
                  loadingImage={loadingImage}
                  speed={150}/>
          }
        </div>
      )
  }
}


export default FungPredict