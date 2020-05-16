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

import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 20,
    borderRadius: 10
  },
  heading: {
    display: 'flex',
    padding: 12
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
    padding: '6px 12px 6px 12px',
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
      <Card className={classes.card} postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}>
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
            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
          </section>
        </section>
        <section className={classes.content}>
          {deleteButton}
          <Typography variant="body2" className={classes.body}>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount}</span>
          <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
          <span>{commentCount}</span>
        </section>
      </Card>
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

