import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { submitPost, clearErrors } from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  ...theme.spreadThis,
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paper: {
    borderRadius: 15,
    backgroundColor: 'white',
    overflowX: 'hidden',
    minWidth: '91%',
    maxWidth: '91%',
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 15,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '82%',
    top: '6.5%',
  },
});

class SubmitPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitPost({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Submit a Post">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          classes={{
            root: classes.root,
            paper: classes.paper,
          }}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle style={{ position: 'relative', top: 10, width: '60%' }}>
            Submit a new post
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                multiline
                rows="3"
                variant="outlined"
                placeholder="What's on your mind?"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                color="primary"
                style={{
                  textTransform: 'none',
                  fontSize: '16px',
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 10,
                  fontWeight: 400,
                  color: 'black',
                  backgroundColor: '#FFF',
                  boxShadow:
                    '0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 0 2.2px 2px rgba(0, 0, 0, 0.04)',
                  borderRadius: 40,
                }}
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

SubmitPost.propTypes = {
  submitPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { submitPost, clearErrors })(
  withStyles(styles)(SubmitPost)
);
