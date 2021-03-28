import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 0.5), // padding: '2px 4px'
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  },
}))

const SearchTrack = () => {
  const classes = useStyles()

  const [search, setSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const clearSearchInput = () => setSearch('')

  const handleSearchInput = ({ target: { value } }) => setSearch(value)

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root} elevation={1}>
        <IconButton onClick={clearSearchInput}>
          <ClearIcon />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Search All Tracks"
          InputProps={{
            disableUnderline: true,
          }}
          value={search}
          onChange={handleSearchInput}
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
    </form>
  )
}

export default SearchTrack
