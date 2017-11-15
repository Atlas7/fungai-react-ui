import React from 'react'
import PropTypes from 'prop-types'


function SelectWnid (props) {
  const wnids = ['all', 'n13030337', 'n13003061', 'n13040629']
  return (
      <ul className='wnids'>
        {wnids.map((wnid) => {
          return (
            <li
              key={wnid}
              style={wnid === props.selectedWnid ? {color: '#d0021b'} : null}
              onClick={props.onSelect.bind(null, wnid)}
            >
              {wnid}
            </li>
          )
        })}
      </ul>
  )
}

class FungPredict extends React.Component {
  state = {
    wnid: 'all'
  }
  updateWnid = (wnid) => {
    this.setState({
      wnid: wnid
    })
  }
  render = () => {
    return (
        <div>
          <SelectWnid
            selectedWnid={this.state.wnid}
            onSelect={this.updateWnid}
          />
          FungPredict
        </div>
      )
  }
}



// class FungPredict extends React.Component {
//   state = {
//     selectedWnid: 'all',
//     images: null,
//   }
//   componentDidMount = () => {
//     this.updateWnid(this.state.selectedWnid)
//   }
//   updateWnid = async (wnid) => {
//     this.setState(() =>({
//       selectedWnid: wnid,
//       images: null,
//     }))
//     const images = await fetchImages(wnid)
//     this.setState(() => ({images: images}))
//   }
//   render = () => {
//     return (
//       <div>
//         <SelectWnid
//           onSelect={this.updateWnid}
//           selectedWnid={this.state.selectedWnid}
//         />
//         {/*{JSON.stringify(this.state.repos, null, 2)}*/}
//         {this.state.images
//           ? <ImagesGrid images={this.state.images}/>
//           : <Loading text={"woo saa"} speed={100} />}
//       </div>
//     )
//   }
// }

module.exports = FungPredict