import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = theme => ({
  ...theme.spreadThis,
  pageTitle: {
    marginTop: 110,
    marginBottom: 20,
    fontSize: 30,
    color: 'white'
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15
  },
  textField: {
    width: '90%',
    marginTop: 30,
  },
  button: {
    marginTop: 25,
    marginBottom: 25
  },
  hereLink: {
    color: 'grey'
  }
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }
    this.props.signupUser(newUserData, this.props.history);
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
          <h2 className={classes.pageTitle}>Signup</h2>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email" 
              name="email" 
              type="email" 
              placeholder="E-mail" 
              InputProps={{
                className: classes.input
              }}
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
              placeholder="Password" 
              InputProps={{
                className: classes.input
              }}
              className={classes.textField} 
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password} 
              onChange={this.handleChange}
              fullWidth />
            <TextField
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              InputProps={{
                className: classes.input
              }}
              className={classes.textField} 
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword} 
              onChange={this.handleChange}
              fullWidth />
            <TextField
              id="handle" 
              name="handle" 
              type="text" 
              placeholder="Name" 
              InputProps={{
                className: classes.input
              }}
              className={classes.textField} 
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle} 
              onChange={this.handleChange}
              fullWidth />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button 
              type="submit" 
              color="primary" 
              style={{
                textTransform: 'none',
                fontSize: '16px',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 50,
                marginBottom: 40,
                fontWeight: 400,
                color: 'black',
                backgroundColor: '#FFF',
                borderRadius: 40
              }}
              className={classes.button}
              disabled={loading} >
            Continue
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
            </Button>
            <br />
            <small style={{ color: '#FFF' }}>Already have an account? Login <Link to="/login" className={classes.hereLink}>here</Link></small>
          </form>
        </Grid>
        <Grid item sm /> 
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));

