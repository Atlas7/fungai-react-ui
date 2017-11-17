import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import { wait, fetchPredictions } from '../utils/fakeAPI'
import Loading from './Loading'

//
// TODO
// done - Make Grid Images click-able to summary
// done - hyperlink to imagenet via wnid
// done - add text under the predictions section in modal box
// proper about page


// correct prediction in top 1 / 2 / 3 bucket - display in summary modal page
// save a copy of the images and store away somewhere


// update scores in database to make appear more random (less uniform)
// deploy API
// deploy front-end
// github code sharing

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
  static propTypes = {
    pred: PropTypes.object.isRequired,
  }
  static defaultProps = {
  }
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
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // )
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // )
    const { pred, children } = this.props
    const { imageId, image, predictClasses, predictScores } = this.props.pred
    const { imageURL } = image
    return (
      <div>
        {children &&
          <div onClick={this.open}>
            {children}
          </div>
        }
        {!children &&
          <Button bsStyle="primary" bsSize="large" onClick={this.open}>
            more info
          </Button>
        }
        <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Image Classification Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pred-summary-modal-body">
            <div className="row">
              <div className="column">
                <h4>Test Image</h4>
                <img className='fung-photo-cover-2' src={imageURL} alt={':-('} />
                <LinkWithTooltip tooltip="View source image" href={imageURL} id="tooltip-1" placement="right">
                  Image Source
                </LinkWithTooltip>
              </div>
              <div className="column">
                <h4>Ground Truth</h4>
                <TruthTable pred={pred} />
              </div>
            </div>
            <hr />
            <h4>Predictions</h4>
            <p>{
              `Based on image pixel features and a pre-trained classification model, we believe ` +
              `the test image corresponds to one of the following categories - ordered by prediction score. `
            }</p>
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


function LinkWithTooltip ({id, tooltip, children, href, placement}) {
  let myTooltip = <Tooltip id={id}>{tooltip}</Tooltip>
  return (
    <OverlayTrigger
      overlay={myTooltip}
      placement={placement}
      delayShow={300}
      delayHide={150}
    >
      <a href={href} target="_blank">{children}</a>
    </OverlayTrigger>
  )
}

function PredictTable({predScore, predClass, predCorrect}) {
  const {wnid, commonName, latinName, imagenetName, imagenetDescription} = predClass
  const encodedURL = encodeURI(`http://www.image-net.org/synset?wnid=${wnid}`)
  return (
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
        <td>
          <LinkWithTooltip tooltip="View in ImageNet" href={encodedURL} id="tooltip-1" placement="right">
            {predClass.wnid}
          </LinkWithTooltip>
        </td>
      </tr>
      <tr>
        <th>{`Prediction Score`}</th>
        <td>{predScore}</td>
      </tr>
      <tr>
        <th>{`Correct Prediction?`}</th>
        <td>{predCorrect.toString()}</td>
      </tr>
      </tbody>
    </table>
  )
}
PredictTable.PropTypes = {
  predScore: PropTypes.number.isRequired,
  predClass: PropTypes.object.isRequired,
  predCorrect: PropTypes.bool.isRequired,
}


function PredictTables({pred}) {
  const predObjects = zipPredClassesScores(pred)
  return (
    <ul className='predict-tables'>
      {predObjects.map(({predScore, predClass, predCorrect}, index)=> (
        <li key={index}>
          <div className='predict-table-div'>
            <h5>{`Prediction #${index+1} / Score: ${predScore}`}</h5>
            <PredictTable predScore={predScore} predClass={predClass} predCorrect={predCorrect}/>
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
  const { wnid, imagenetName, commonName, latinName, imagenetDescription } = image.class
  const encodedURL = encodeURI(`http://www.image-net.org/synset?wnid=${wnid}`)
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
            <td>
              <LinkWithTooltip tooltip="View in ImageNet" href={encodedURL} id="tooltip-1" placement="right">
                {wnid}
              </LinkWithTooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
TruthTable.PropTypes = {
  pred: PropTypes.object.isRequired,
}

function PredBarPopover ({id, tooltip, children, href, placement}) {
  let myPopover = <Tooltip id={id}>{tooltip}</Tooltip>
  return (
    <OverlayTrigger
      overlay={myTooltip}
      placement={placement}
      delayShow={300}
      delayHide={150}
    >
      <a href={href} target="_blank">{children}</a>
    </OverlayTrigger>
  )
}


function PredBox ({pred}) {
  const predObjects = zipPredClassesScores(pred)
  return (
    <div className="pred-box">
      {
        predObjects.map(({predScore, predClass, predCorrect}, index) => {
          const barColor = predCorrect? "green" : "red"
          const barWidth = `${predScore*100}%`
          return (
            <div className="pred-box-item" key={index}>
              <div className="pred-class">
                <div className="pred-class-text">{predClass.commonName}</div>
                <div
                  className="pred-class-bar"
                  style={{
                    "backgroundColor": `${barColor}`,
                    "width": `${barWidth}`
                  }}
                />
              </div>
              <div className="pred-score">{predScore}</div>
            </div>
          )
        })
      }
    </div>
  )
}


function PredItem({pred}) {
  return (
    <div>
      <PredItemModal pred={pred}>
        <FungPhoto imageURL={pred.image.imageURL} />
      </PredItemModal>
      <PredItemModal pred={pred}>
        <Button bsStyle="primary" bsSize="small">
          more Info
        </Button>
      </PredItemModal>
      <PredBox pred={pred} />
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