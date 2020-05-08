import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Button color="inherit">Login</Button>          
          <Button color="inherit">Home</Button>          
          <Button color="inherit">Signup</Button>          
        </Toolbar>
      </AppBar>
    );
  }
}
