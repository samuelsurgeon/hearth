import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';

import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadThis,
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  paper: {
    borderRadius: 15,
    backgroundColor: 'white',
    overflowX: 'hidden',
    minWidth: '88%',
    maxWidth: '88%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 40,
    marginBottom: 15,
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
  profileImage: {
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
    padding: '0px 2px 20px 2px',
  },
  createdAt: {
    position: 'relative',
    bottom: 3
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
  },
  dialogContent: {
    padding: 20,
    borderRadius: 100,
    width: '100%'
  },
  closeButton: {
    position: 'absolute',
    top: '2.7%',
    left: '82%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  visibleSeparator: {
    marginTop: 30
  }
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  }

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  }

  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={50} thickness={2} />
      </div>
    ) : (
      <section container spacing={2} className={classes.card} scroll="no">
        <section className={classes.heading}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
          <section className={classes.nameDate}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${userHandle}`}>
              {userHandle}
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.createdAt}>
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
              </Typography>
          </section>
        </section>
        <section className={classes.content}>
          <Typography variant="body2" className={classes.body}>
            {body}
          </Typography>
          <LikeButton postId={postId} className={classes.likeButton} />
          <span className={classes.likeCount}>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span className={classes.commentCount}>{commentCount} comments</span>
        </section>
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </section>
    )

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
          <ChatIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          classes={{
            root: classes.root,
            paper: classes.paper
          }}
          fullWidth
          maxWidth="xs">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}>
            <CloseIcon />
          </MyButton>
          <section className={classes.dialogContent}>
            {dialogMarkup}
          </section>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
