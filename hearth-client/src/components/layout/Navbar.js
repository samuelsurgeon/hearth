import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import SubmitPost from '../post/SubmitPost';
import Notifications from './Notifications';

//import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Refresh';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <section className="nav-wrapper">
        <section className="nav-container">
          {authenticated ? (
            <Fragment>
              <SubmitPost />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
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
