import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const { 
      classes, 
      user: { 
        credentials: { handle, createdAt, imageUrl, bio, website, location }, 
        loading
      }
    } = this.props; 
    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Profile.PropTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
