import { useTheme, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: 'deeppink',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}))

const LikeTrack = ({ trackId }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const likeTrack = () => {}

  const alreadyLiked = () => false

  const likeCount = 3

  return (
    <IconButton
      onClick={likeTrack}
      className={classes.iconButton}
      disabled={alreadyLiked()}
    >
      {likeCount}
      <ThumbUpIcon className={classes.icon} />
    </IconButton>
  )
}

export default LikeTrack
