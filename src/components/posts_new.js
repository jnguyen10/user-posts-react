import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onFormSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to index
        // We navigate by calling this.context.router.push with the new path
        // to navigate to.
        console.log("this.context.router", this.context.router)
        this.context.router.push('/');
      })
  }

  render() {
    // handleSubmit function from reduxForm
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    console.log("THIS.PROPS", this.props);

    return (
      <form onSubmit={ handleSubmit(this.onFormSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type='text' className='form-control' { ...title } />
          <div className='text-help'>
            {title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type='text' className='form-control' { ...categories } />
          <div className='text-help'>
            {categories.touched ? categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea name='content' className='form-control' { ...content } />
          <div className='text-help'>
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type='submit' className="btn btn-success">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }


  return errors;
}

// connect: first argument is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: [
    'title',
    'categories',
    'content'
  ],
  validate
}, null, { createPost })(PostsNew);
