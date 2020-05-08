import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

export default class home extends Component {
  state = {
    screams: null
  }
  
  componentDidMount() {
    axios.get('/posts')
      .then(res => {
        this.setState({
          screams: res.data
        })
      })
      .catch(err => console.error(err));
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => <p>{scream.body}</p>)
    ) : <p>Loading...</p>

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}
