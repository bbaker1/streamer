import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
      if (touched && error) {
          return (
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
          );
      }
  }

  renderInput = ({ input, label, meta }) => {
    const className=`field ${meta.error && meta.touched ? 'error' : ''}`;
    // adds all properties from formProps.input and adds them into input (ie onChange, value, etc.)
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  // preventDefault is automatically called in Redux Form handleSubmit
  // formValues is usually formProps, has title and description when submitted
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues); 
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        // runs if user did not enter a title
        errors.title = 'You must enter a title.';
    }
    
    if (!formValues.description) {
        errors.description = 'You must include a description.';
    }

    return errors;
};

export default reduxForm({
  // Name of the form
  form: "streamForm",
  validate
})(StreamForm);


