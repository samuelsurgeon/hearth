import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
