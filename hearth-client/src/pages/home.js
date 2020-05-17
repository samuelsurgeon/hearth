import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import SubmitPost from '../components/post/SubmitPost';

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const styles = {
  textField: {
    marginBottom: 100
  }
}

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    // TK
    const errors = {}
    const classes = {}

    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Fragment>
      <form onSubmit={this.handleSubmit} className={classes.textField}>
              <TextField
                name="body"
                type="text"
                label="What's on your mind?"
                variant="outlined"
                multiline
                rows="3"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textItself}
                onChange={this.handleChange}
                fullWidth />
      </form>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
      </Fragment>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));
