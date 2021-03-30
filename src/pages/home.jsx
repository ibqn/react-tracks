import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'

import { SearchTrack, CreateTrack, TrackList } from '../components/track'
import { Error, Loading } from '../components/shared'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: 960,
    padding: theme.spacing(2),
  },
}))

const TRACK_LIST = gql`
  query TrackList {
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
  const classes = useStyles()

  const [search, setSearch] = useState(null)

  const { loading, error, data } = useQuery(TRACK_LIST)

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  const { tracks } = search || data

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
