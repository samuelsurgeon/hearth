import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import SubmitPost from '../post/SubmitPost';
import Notifications from './Notifications';

//import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <section>
        <section className="nav-container">
          {authenticated ? (
            <Fragment>
              <SubmitPost />
              <Link to="/">
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="primary" component={Link} to="/login">Login</Button>          
              <Button color="primary" component={Link} to="/">Home</Button>          
              <Button color="primary" component={Link} to="/signup">Signup</Button>          
            </Fragment>
          )}
        </section>
      </section>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
