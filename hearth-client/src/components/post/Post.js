import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/ChatBubble';

import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#FFF',
    boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.01), 0 6.7px 5.3px rgba(0, 0, 0, 0.03), 0 12.5px 10px rgba(0, 0, 0, 0.005), 0 22.3px 17.9px rgba(0, 0, 0, 0.01), 0 41.8px 33.4px rgba(0, 0, 0, 0.01), 0 100px 80px rgba(0, 0, 0, 0.02)'
  },
  heading: {
    display: 'flex',
    paddingBottom: 10
  },
  nameDate: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  image: {
    minWidth: 50,
    minHeight: 50,
    maxHeight: 50,
    maxWidth: 50,
    borderRadius: '50%'
  },
  content: {
    padding: 0,
    margin: 0
  },
  body: {
    padding: '6px 2px 15px 2px',
  },
  createdAt: {
    position: 'relative',
    bottom: 6
  },
  likeCount: {
    position: 'relative',
    left: 8,
    marginRight: 35,
    fontSize: '0.9rem'
  },
  commentCount: {
    position: 'relative',
    left: 8,
    fontSize: '0.9rem'
  }
}

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post : { 
        body, 
        createdAt, 
        userImage, 
        userHandle, 
        postId, 
        likeCount, 
        commentCount 
      },
      user: { authenticated, credentials: { handle } }
    } = this.props;

    const deleteButton = authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null

    return (
      <section className={classes.card}>
        <section className={classes.heading}>
          <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image} />
          <section className={classes.nameDate}>
            <Typography 
              variant="h6" 
              component={Link} 
              to={`/users/${userHandle}`}
              color="primary"
            >{userHandle}</Typography>
            <Typography variant="body2" color="textSecondary" className={classes.createdAt}>{dayjs(createdAt).fromNow()}</Typography>
          </section>
        </section>
        <section className={classes.content}>
          {deleteButton}
          <Typography variant="body2" className={classes.body}>{body}</Typography>
          <LikeButton postId={postId} className={classes.likeButton} />
          <span className={classes.likeCount}>{likeCount}</span>
          <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
          <span className={classes.commentCount}>{commentCount}</span>
        </section>
      </section>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));

