// surveyFormReview shows users their form inputs for review
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { FIELDS } from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurveys, history }) => {
  const reviewFields = FIELDS.map( ({ label, name }) =>
    <div key={name}>
      <label>{label}</label>
      <div>
        {formValues[name]}
      </div>
    </div>
  )

  return (
    <div>
      <h5>Please comfirm your entries</h5>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}>
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => submitSurveys(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
