import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  ...theme.spreadThis,
  pageTitle: {
    marginTop: 150,
    fontSize: 30,
    color: 'white',
  },
  textField: {
    width: '90%',
    marginTop: 30,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
  },
  button: {
    marginTop: 25,
    marginBottom: 40,
    color: '#FFF',
  },
  hereLink: {
    color: 'grey',
  },
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <h1 className={classes.pageTitle}>Login</h1>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              InputProps={{
                className: classes.input,
              }}
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              InputProps={{
                className: classes.input,
              }}
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <p className={classes.customError}>{errors.general}</p>
            )}
            <Button
              type="submit"
              className={classes.button}
              style={{
                textTransform: 'none',
                fontSize: '16px',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 50,
                fontWeight: 400,
                color: 'black',
                backgroundColor: '#FFF',
                borderRadius: 40,
              }}
              disabled={loading}
            >
              Continue
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small style={{ color: '#FFF' }}>
              Don't have an account? Sign up{' '}
              <Link to="/signup" className={classes.hereLink}>
                here
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
