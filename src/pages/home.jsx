import { useState } from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import { SearchTrack, CreateTrack, TrackList } from '../components/track'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
}))

const Home = () => {
  const [search, setSearch] = useState(null)
  const theme = useTheme()
  const classes = useStyles(theme)

  const tracks = []
  return (
    <div className={classes.container}>
      <SearchTrack setSearch={setSearch} />
      <CreateTrack />

      <TrackList tracks={tracks} />
    </div>
  )
}

export default Home
