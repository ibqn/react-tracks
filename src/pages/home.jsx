import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import { SearchTrack, CreateTrack, TrackList } from '../components/track'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
}))

const TRACK_LIST = gql`
  query trackList {
    tracks {
      id
      title
      description
      url
      postedBy {
        id
        username
      }
      likes {
        id
      }
    }
  }
`

const Home = () => {
  const [search, setSearch] = useState(null)
  const theme = useTheme()
  const classes = useStyles(theme)

  const { loading, error, data } = useQuery(TRACK_LIST)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const { tracks } = data

  // console.log(data)
  return (
    <div className={classes.container}>
      <SearchTrack setSearch={setSearch} />
      <CreateTrack />
      {/* {JSON.stringify(tracks)} */}
      <TrackList tracks={tracks} />
    </div>
  )
}

export default Home
