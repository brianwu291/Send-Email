//  surveyForm shows a form for user to input
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { FIELDS } from './formFields';

import SurveyField from './SurveyField';
import validateEmails from '../utils/validateEmails';

class SurveyForm extends React.Component{
  renderFields(){
    return FIELDS.map( ({ label, name }) =>
      <Field
        key={name}
        component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    );
  }

  render(){
    return (
      <div style={{ "marginTop": "20px" }}>
        <form
          onSubmit={
            this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            取消
            <i className="material-icons right">cancel</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            下一步
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
