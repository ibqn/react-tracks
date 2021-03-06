import { createMuiTheme } from '@material-ui/core/styles'

import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[500],
      main: indigo[700],
      dark: indigo[900],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
})

export { theme }
