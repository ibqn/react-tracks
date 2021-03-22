import ReactPlayer from 'react-player'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const Player = styled(ReactPlayer)`
  display: none;
`

const AudioPlayer = ({ url }) => {
  const [state, setState] = useState({ playing: false })
  const handleClick = (event) => {
    event.preventDefault()
    setState({ ...state, playing: !state.playing })
  }
  return (
    <>
      <Button onClick={handleClick}>{state.playing ? `stop` : `play`}</Button>
      <Player
        url={url}
        playing={state.playing}
        height="30px"
        width="500px"
        controls={false}
      />
    </>
  )
}

export default AudioPlayer
