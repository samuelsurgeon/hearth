import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Language';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/AddPhotoAlternate';
import KeyboardReturn from '@material-ui/icons/ChevronLeft';

const styles = theme => ({
  ...theme.spreadThis,
  paper: {
    padding: 20,
    backgroundColor: 'white',
    boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.01), 0 6.7px 5.3px rgba(0, 0, 0, 0.03), 0 12.5px 10px rgba(0, 0, 0, 0.005), 0 22.3px 17.9px rgba(0, 0, 0, 0.01), 0 41.8px 33.4px rgba(0, 0, 0, 0.01), 0 100px 80px rgba(0, 0, 0, 0.02)',
    borderRadius: 15
  },
  text: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: 700,
    color: '#474747'
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none'
    }
  }
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  }

  handleEditPicture = event => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    const { 
      classes, 
      user: { 
        credentials: { handle, createdAt, imageUrl, bio, website, location }, 
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? (
      <section className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden" />
            <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button">
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} className={classes.link} color="primary" variant="h5">
              {handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}{website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip="Logout" onClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </section>
    ) : (
      <section className={classes.paper}>
        <Typography variant="body2" align="center" className={classes.text}>
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button 
            color="primary" 
            style={{
                textTransform: 'none',
                fontSize: '16px',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 20,
                fontWeight: 400,
                color: 'black',
                backgroundColor: '#FFF',
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 0 2.2px 2px rgba(0, 0, 0, 0.04)',
                borderRadius: 40
            }}
            component={Link} to="/login">
            Login
          </Button>
          <Button 
            color="secondary" 
            style={{
                textTransform: 'none',
                fontSize: '16px',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 20,
                fontWeight: 400,
                color: 'black',
                backgroundColor: '#FFF',
                boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 2.8px 2.2px rgba(0, 0, 0, 0.08), 0 0 2.2px 2px rgba(0, 0, 0, 0.04)',
                borderRadius: 40
            }}
            component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </section>
    )) : (<p style={{ color: '#FFF', fontSize: 24, fontWeight: 700 }}>Loading...</p>);

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));

