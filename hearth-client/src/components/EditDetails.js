import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { editUserData } from '../redux/actions/userActions';

import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/Textfield';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/iconsEdit';

const styles = theme => ({
  ...theme.spreadThis
});

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    mapUserDetailsToState(credentials);
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidMount() {
    const { credentials } = this.props;
    mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle> 
          <DialogContent>
            <form>
              <Textfield
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholders="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth />
              <Textfield
                name="website"
                type="text"
                label="Website"
                placeholders="Your personal website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth />
              <Textfield
                name="location"
                type="text"
                label="Location"
                placeholders="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth />
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
