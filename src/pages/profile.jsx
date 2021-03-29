import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUpTwoTone'
import AudiotrackIcon from '@material-ui/icons/AudiotrackTwoTone'
import Divider from '@material-ui/core/Divider'

import { AudioPlayer, Error, Loading } from '../components/shared'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    display: 'block',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 650,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  audioIcon: {
    color: 'purple',
    fontSize: 30,
    marginRight: theme.spacing(),
  },
  thumbIcon: {
    color: 'green',
    marginRight: theme.spacing(),
  },
  divider: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
}))

const PROFILE_QUERY = gql`
  query Profile($id: ID!) {
    user(id: $id) {
      id
      username
      dateJoined
      likeSet {
        id
        track {
          id
          title
          url
          likes {
            id
          }
          postedBy {
            id
            username
          }
        }
      }
      trackSet {
        id
        title
        url
        likes {
          id
        }
      }
    }
  }
`

const Profile = () => {
  const classes = useStyles()

  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    variables: { id: 1 },
  })

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  const {
    user: { username, dateJoined },
  } = data || {}

  // console.log('date', date)

  const likeSet = null
  const trackSet = null
  // const username = 'ibqn'
  // const dateJoined = new Date(2014, 1, 11)

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar>{username[0]}</Avatar>}
          title={username}
          subheader={`Joined ${moment(dateJoined).format('MMM Do, yyyy')}`}
        />
      </Card>

      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          <AudiotrackIcon className={classes.audioIcon} />
          Created Tracks
        </Typography>
        {trackSet?.map((track) => (
          <div key={track.id}>
            <Typography>
              {track.title} · {track.likes.length} Likes
            </Typography>
            <AudioPlayer url={track.url} />
            <Divider className={classes.divider} />
          </div>
        ))}
      </Paper>

      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          <ThumbUpIcon className={classes.thumbIcon} />
          Liked Tracks
        </Typography>
        {likeSet?.map(({ track }) => (
          <div key={track.id}>
            <Typography>
              {track.title} · {track.likes.length} Likes ·{' '}
              {track.postedBy.username}
            </Typography>
            <AudioPlayer url={track.url} />
            <Divider className={classes.divider} />
          </div>
        ))}
      </Paper>
    </>
  )
}

export default Profile
