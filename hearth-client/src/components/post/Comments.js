import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  ...theme.spreadThis,
  container: {
    marginTop: 15,
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    boxShadow:'0 2.8px 2.2px rgba(0, 0, 0, 0.05), 0 6.7px 5.3px rgba(0, 0, 0, 0.04), 0 12.5px 10px rgba(0, 0, 0, 0.005), 0 -10px 10px rgba(0, 0, 0, 0.03)'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  commentImage: {
    minWidth: '100%',
    maxWidth: '100%',
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12} className={classes.container}>
                <section className={classes.flex}>
                  <section style={{ minWidth: 50 }}>
                    <img src={userImage} alt="comment" className={classes.commentImage} />
                  </section>
                  <section>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary">
                        {userHandle}
                      </Typography> 
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">
                        {body}
                      </Typography>
                    </div>
                  </section>
                </section>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
