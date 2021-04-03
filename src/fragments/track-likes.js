import { gql } from '@apollo/client'

const TRACK_LIKES = gql`
  fragment TrackLikes on TrackType {
    likes {
      id
      user {
        id
      }
    }
  }
`

export default TRACK_LIKES
