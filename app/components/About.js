import React from 'react'
import { Link } from 'react-router-dom'
import fungaiConcept from '../images/fungaiConcept.png'
import intelLogo from '../images/intelLogo.png'
import intelInnovatorBadge from '../images/intelInnovatorBadge.jpg'

// TODO: refactor this code!!!
// This is a quick and ugly code bashed together in a couple of hours.
// In need of some proper designs and tidying up.


function AboutIntro (props) {
  const RootLink = ({children}) => {
    return (
      <Link to='/'>{children}</Link>
    )
  }
  const FungPredictLink = ({children}) => {
    return (
      <Link to='/fungpredict'>{children}</Link>
    )
  }
  const DevmeshLink = () => {
    const devmeshURL = encodeURI("https://devmesh.intel.com/projects/fungi-barbarian")
    return (
      <a href={devmeshURL} target="_blank" >Project Fungi Barbarian</a>
    )
  }
  const ConceptImage = ({image=fungaiConcept, mode='fit'}) => {
    // const conceptImgURL = encodeURI(
    //   "https://dmtyylqvwgyxw.cloudfront.net/instances/132/uploads/images/" +
    //   "custom_image/image/2201/normal_Screen_Shot_2017-11-09_at_15.45.20.png?v=1510242969")
    return (
      <div className="concept-image-container">
        {/*<img className="concept-image" src={conceptImgURL} />*/}
        <img className="concept-image" src={image} mode={mode}/>
      </div>
    )
  }
  const IntelLogo = () => {
    // const intelLogoImgURL = encodeURI(
    //   "https://d3txbfmby5lf7l.cloudfront.net/assets/community/logo-white-a8086fe117.png"
    // )
    return (
      <img className="intel-logo" src={intelLogo} />
    )
  }
  const IntelInnovatorBadge = () => {
    return (
      <img className="intel-innovator-badge" src={intelInnovatorBadge} />
    )
  }
  return (
    <div>
      <div className='partnership-banner'>
        <h4><a href="http://fungai.org" target="_blank">fungai.org</a> is a deep learning project in partnership with Intel</h4>
        {/*<IntelInnovatorBadge/>*/}
        <IntelLogo/>
      </div>
      <hr/>
      <h3>A Wild Mushroom ID Machine</h3>
      <p><a href="http://fungai.org" target="_blank">fungai.org</a> assists scientists and enthusiasts to easily identify wild mushroom species from images using
        deep learning technologies.</p>
      <p>This <FungPredictLink>Fungi Classification Prototype</FungPredictLink> is an initial proof of concept demo of the Batch Classification UI part of the wider fungAI project.</p>
      <p>This application part of the wilder <DevmeshLink />, an Intel Develoepr Mesh Project.</p>
      <ConceptImage/>
      <hr/>
      <h4>GitHub Repositories</h4>
      <p>This ReactJS UI: <a href="https://github.com/Atlas7/fungai-react-ui" target="_blank">fungai-react-ui</a>
      </p>
      <p>Fake jason-server API: <a href="https://github.com/Atlas7/fungai-json-server-heroku" target="_blank">fungai-json-server-heroku</a></p>
      <h4>Stay Tune</h4>
      <p>Please follow this project via <a href="http://fungai.org" target="_blank">the Project Blog Page</a></p>
    </div>
  )
}


class About extends React.Component {
  render = () => {
    return (
      <div className="sub-container">
        <AboutIntro />
      </div>
    )
  }
}

export default About