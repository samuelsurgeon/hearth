import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <p style={{ color: '#FFF', fontSize: 24, fontWeight: 700 }}>
        Loading data...
      </p>
    ) : posts === null || posts.length < 1 ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p style={{ color: '#FFF', fontSize: 24, fontWeight: 700 }}>
              Loading profile...
            </p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
