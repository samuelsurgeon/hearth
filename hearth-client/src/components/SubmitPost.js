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
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'; 

import { connect } from 'react-redux';
import { SubmitPost } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

class SubmitPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  }
  
  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { errors } = this.state;
    const { classes, UI: { loading }} = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Submit a Post">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon />
          </MyButton>
          <DialogTitle>Submit a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post!"
                multiline
                rows="3"
                placeholder="Say hi to your friends"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth />
              <Button type="submit" variant="contained" color="primary"
                className={classes.submitButton} disabled={loading}>
                Submit
                {loading && (
                  <CircularProgress size={30} className={classes.progressSpinner} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

SubmitPost.propTypes = {
  submitPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect((mapStateToProps, { SubmitPost }))(withStyles(styles)(SubmitPost));

