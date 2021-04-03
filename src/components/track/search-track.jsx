import { useState } from 'react'
import PropTypes from 'prop-types'

import { useApolloClient, gql } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { UPDATE_TRACKS } from '../../fragments'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 0.5), // padding: '2px 4px'
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  },
}))

const SEARCH_TRACKS_QUERY = gql`
  ${UPDATE_TRACKS}

  query($search: String) {
    tracks(search: $search) {
      ...NewTrack
    }
  }
`

const SearchTrack = ({ setSearchResult }) => {
  const classes = useStyles()

  const [search, setSearch] = useState('')

  const client = useApolloClient()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await client.query({
        query: SEARCH_TRACKS_QUERY,
        variables: { search },
      })

      console.log('data', data)
      setSearchResult(data)
    } catch (error) {
      console.error(error)
    }
  }

  const clearSearchInput = () => {
    setSearch('')
    setSearchResult(null)
  }

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

SearchTrack.propTypes = {
  setSearchResult: PropTypes.func.isRequired,
}

export default SearchTrack
