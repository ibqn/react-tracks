import { useTheme, makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100vw',
    // height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  progress: {
    // margin: theme.spacing(2),
    color: theme.palette.secondary.dark,
  },
}))

const Loading = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  )
}

export default Loading
