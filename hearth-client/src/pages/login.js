import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = theme => ({
  ...theme.spreadThis,
  pageTitle: {
    marginTop: 200
  },
  textField: {
    width: '90%',
    marginTop: 30
  },
  button: {
    marginTop: 25,
    marginBottom: 20
  },
  hereLink: {
    color: 'grey'
  }
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm /> 
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email" 
              name="email" 
              type="email" 
              label="E-mail" 
              variant="outlined"
              className={classes.textField} 
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email} 
              onChange={this.handleChange}
              fullWidth />
            <TextField
              id="password" 
              name="password" 
              type="password" 
              label="Password" 
              variant="outlined"
              className={classes.textField} 
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password} 
              onChange={this.handleChange}
              fullWidth />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button 
              type="submit" 
              variant="outlined"
              color="primary" 
              className={classes.button}
              disabled={loading} >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
            </Button>
            <br />
            <small>Don't have an account? Sign up <Link to="/signup" className={classes.hereLink}>here</Link></small>
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
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));

