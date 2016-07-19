import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchSinglePost(this.props.params.id)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { single_post } = this.props;
      // equivalent to const single_post = this.props.single_post

    if (!single_post || single_post.id != this.props.params.id) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to='/'>Back to Index</Link>
        <h3>{ single_post.title }</h3>
        <h6>Categories: { single_post.categories }</h6>
        <p>{ single_post.content }</p>
        <button
          className='btn btn-danger'
          onClick={this.onDeleteClick.bind(this)}>Delete Post
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { single_post: state.posts.single_post }
}

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostsShow);
