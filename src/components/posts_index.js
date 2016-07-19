import React, { Component } from "react";
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    // a lifecycle method called once this component is about to render to the
    // DOM for the first time
    // console.log('good time to call action creator to fetch post!');
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li key={ post.id } className='list-group-item'>
          <Link to={ `/posts/${ post.id }` }>
            <span className="pull-xs-right">{ post.categories }</span>
            <strong>{ post.title }</strong>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          { this.renderPosts() }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state)
  return { posts: state.posts.all };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
