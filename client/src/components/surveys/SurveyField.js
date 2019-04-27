// surveyField contains logic to render a single
// label and text input
import React from 'react';

class SurveyField extends React.Component{
  render(){
    const { input, label, meta: { error, touched } } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: '5px' }}/>
        <div className="red-text" style={{ marginBottom: '20px'}}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default SurveyField;
