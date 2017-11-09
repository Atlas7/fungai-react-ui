const React = require('react');
const PropTypes = require('prop-types')
const Link = require('react-router-dom').Link
const PlayerPreview = require('./PlayerPreview')


// Private Component
class PlayerInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => ({username: value}))
  }

  // this.props.onSubmit method comes from the Battle instance
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    const { label } = this.props
    const { username } = this.state
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />

        <button
          className='button'
          type='submit'
          disabled={!username}>
            Submit
          </button>
      </form>
    )
  }
}
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


// Main Component
class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, username) {
    // return an object, with ES6 bracket notation for key name
    this.setState(() => ({
      [`${id}Name`]: username,
      [`${id}Image`]:`https://github.com/${username}.png?size=200`,
    }))
  }

  handleReset(id) {
    // return an object, with ES6 bracket notation for key name
    this.setState(() => ({
      [`${id}Name`]: '',
      [`${id}Image`]: null,
    }))
  }

  render() {
    // Standard React Props for a component that contains history and url info
    const { match } = this.props

    // Player info
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state

    // Battle button
    const battleBaseURL = `${match.url}/results`
    const battleURLParams = `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
    const encodedBattleURLParams = window.encodeURI(battleURLParams)

    return (
      <div>
        <div className='row'>

          {/* =======Player One============ */}
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit} />
          }

          {!!playerOneName && !!playerOneImage &&
            <PlayerPreview
                username={playerOneName}
                avatar={playerOneImage}>
              <button
                  className='reset'
                  // onClick={this.handleReset.bind(this, 'playerOne')}
                  onClick={() => this.handleReset('playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>

          }

          {/* =======Player Two============ */}
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit} />
          }

          {!!playerTwoName && !!playerTwoImage &&
            <PlayerPreview
              username={playerTwoName}
              avatar={playerTwoImage}>
              <button
                className='reset'
                // onClick={this.handleReset.bind(this, 'playerTwo')}
                onClick={() => this.handleReset('playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>
          }

        </div>

        {/* =======Battle Button============ */}
        {!!playerOneImage && !!playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: battleBaseURL,
              search: encodedBattleURLParams,
            }}
          >
            Battle
          </Link>
        }

      </div>
    )
  }
}

module.exports = Battle