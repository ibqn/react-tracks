import PropTypes from 'prop-types'

import { useTheme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'

import { DeleteTrack, UpdateTrack, LikeTrack } from '../track'

import { AudioPlayer } from '../shared'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  details: {
    alignItems: 'center',
  },
  link: {
    color: '#424242',
    textDecoration: 'none',
    '&:hover': {
      color: 'black',
    },
  },
}))

const TrackList = ({ tracks }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <List>
      {tracks.map((track) => (
        <Accordion key={track.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItem
              className={classes.root}
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <LikeTrack trackId={track.id} likeCount={track.likes.length} />
              <ListItemText
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  color: 'primary',
                }}
                primary={track.title}
                secondary={
                  <Link
                    className={classes.link}
                    to={`/profile/${track.postedBy.username}`}
                  >
                    {track.postedBy.username}
                  </Link>
                }
              />
              <AudioPlayer url={track.url} />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Typography variant="body1">{track.description}</Typography>
          </AccordionDetails>
          <AccordionActions>
            <UpdateTrack track={track} />
            <DeleteTrack track={track} />
          </AccordionActions>
        </Accordion>
      ))}
    </List>
  )
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TrackList
