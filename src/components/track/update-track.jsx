import { useState } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import { TrackDialog } from '../track'

const DIALOG_CONTENT = {
  title: 'Update Track',
  contentText: 'Update Title, Description or URL',
  actionText: 'Update Track',
}

const UpdateTrack = ({ track }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <TrackDialog
        track={track}
        open={open}
        setOpen={setOpen}
        loading={false}
        submitAction={async () => {
          console.log('update')
        }}
        content={DIALOG_CONTENT}
      />
    </>
  )
}

UpdateTrack.propTypes = {
  track: PropTypes.object.isRequired,
}

export default UpdateTrack
