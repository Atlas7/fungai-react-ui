import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import { wait, fetchPredictions } from '../utils/fakeAPI'
import Loading from './Loading'

// utility function
function zipPredClassesScores (pred) {
  const trueClass  = pred.image.class
  const { predictClasses, predictScores } = pred
  const predObjects = predictClasses.map((e, i) => ({
    predClass: e,
    predScore: predictScores[i],
    trueClass: trueClass,
    predCorrect: e.wnid === trueClass.wnid
  }))
  return predObjects
}


class PredItemModal extends React.Component {
  state = {
    showModal: false
  }
  close = () => {
    this.setState({
      showModal: false
    })
  }
  open = () => {
    this.setState({
      showModal: true
    })
  }
  render = () => {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    )
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    )
    const { pred } = this.props
    const { imageId, image, predictClasses, predictScores } = this.props.pred
    const { imageURL } = image
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          more info
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Image Classification Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="column">
                <h4>Test Image</h4>
                <img className='fung-photo-cover-2' src={imageURL} alt={':-('} />
                <p><a href={imageURL} target="_blank">Image Source</a></p>
              </div>
              <div className="column">
                <h4>Ground Truth</h4>
                <TruthTable pred={pred} />
              </div>
            </div>

            <hr />

            <h4>Predictions</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <PredictTables pred={pred}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



function PredJSON ({pred}) {
  return (
    <div>
      {JSON.stringify(pred, null, 2)}
    </div>
  )
}
PredJSON.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function ItemLabel ({index}) {
  return (
    <div className='item-label'>
      #{index + 1}
    </div>
  )
}
ItemLabel.PropTypes = {
  index: PropTypes.number.isRequired,
}

function FungPhoto ({imageURL}) {
  return (
    <img
      className='fung-photo-cover'
      src={imageURL}
      alt={':-('}
    />
  )
}


function PredictTables({pred}) {
  const predObjects = zipPredClassesScores(pred)
  return (
    <ul>
      {predObjects.map(({predScore, predClass, predCorrect}, index)=> (
        <li key={index}>
          <div>
            <h5>{`Prediction #${index+1} / Score: ${predScore}`}</h5>
            <table
              className='predict-table'
              style = {
                predCorrect ? {
                  "borderStyle": "solid",
                  "borderWidth": "10px",
                  "borderColor": "green"
                } : {
                  "borderStyle": "solid",
                  "borderWidth": "10px",
                  "borderColor": "red"
                }
              }
            >
              <tbody>
                <tr>
                  <th>{`Common Name`}</th>
                  <td>{predClass.commonName}</td>
                </tr>
                <tr>
                  <th>{`Latin Name`}</th>
                  <td>{predClass.latinName}</td>
                </tr>
                <tr>
                  <th>{`ImageNet Name`}</th>
                  <td>{predClass.imagenetName}</td>
                </tr>
                <tr>
                  <th>{`Imagenet Description`}</th>
                  <td>{predClass.imagenetDescription}</td>
                </tr>
                <tr>
                  <th>{`WordNet ID (wnid)`}</th>
                  <td>{predClass.wnid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      ))}
    </ul>
  )
}
PredictTables.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function TruthTable ({pred}) {
  const { image } = pred
  const { imageURL } = image
  const { wnid, imagenetName, commonName, latinName, imagenetDescription } = image.class
  return (
    <div className="truth-box">
      <table>
        <tbody>
          <tr>
            <th>{`Common Name`}</th>
            <td>{commonName}</td>
          </tr>
          <tr>
            <th>{`Latin Name`}</th>
            <td>{latinName}</td>
          </tr>
          <tr>
            <th>{`ImageNet Name`}</th>
            <td>{imagenetName}</td>
          </tr>
          <tr>
            <th>{`Imagenet Description`}</th>
            <td>{imagenetDescription}</td>
          </tr>
          <tr>
            <th>{`WordNet ID (wnid)`}</th>
            <td>{wnid}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
TruthTable.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function PredBox ({pred}) {
  const predObjects = zipPredClassesScores(pred)
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


function PredItem({pred}) {
  return (
    <div>
      <FungPhoto imageURL={pred.image.imageURL} />
      <PredItemModal pred={pred} />
      <PredBox pred={pred}  />
    </div>
  )
}
PredsGrid.PropTypes = {
  pred: PropTypes.object.isRequired,
}


function PredsGrid ({preds}) {
  return (
    <div className='preds-grid'>
      <ul className='popular-list'>
        {preds.map((pred, index) => (
          <li key={pred.imageId} className='pred-item'>
            <ItemLabel index={index} />
            <PredItem pred={pred} />
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