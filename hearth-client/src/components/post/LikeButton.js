import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import PropTypes from 'prop-types';

import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';

class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.postId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavouriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedPost() ? (
      <MyButton tip="Undo like" onClick={this.unlikePost}>
        <FavouriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likePost}>
        <FavouriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePost,
  unlikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
