export default {
  palette: {
    primary: {
      light: '#474747',
      main: '#474747',
      dark: '#474747',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#FFF',
      main: '#FF1941',
      dark: '#FFF',
      contrastText: '#FFF',
    },
  },
  typography: {
    fontFamily: `'Helvetica Neue', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    useNextVariants: true,
  },
  spreadThis: {
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '20px auto 20px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      marginBottom: 20,
    },
  },
};
