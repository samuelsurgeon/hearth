import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { SubmitPost } from '../redux/actions/dataActions';

const styles = {
  
}

class SubmitPost extends Component {

}

SubmitPost.propTypes = {

}

export default connect((mapStateToProps, { SubmitPost }))(withStyles(styles)(SubmitPost));

