import { gql } from '@apollo/client'

const UPDATE_TRACKS = gql`
  fragment NewTrack on TrackType {
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
      user {
        id
      }
    }
  }
`

export default UPDATE_TRACKS
