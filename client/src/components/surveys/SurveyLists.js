import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyLists extends React.Component{
  componentDidMount(){
    this.props.fetchSurveys();
  }

  renderSurveys(){
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">
              {survey.title}
            </span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {` ${new Date(survey.dateSent).toLocaleDateString()}`}
            </p>
          </div>
          <div className="card-action">
            <a href="https://emaily1201.herokuapp.com/">Yes: {survey.yes}</a>
            <a href="https://emaily1201.herokuapp.com/">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render(){
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
};

const mapStateToProps = ({ surveys }) => {
  return {
    surveys
  };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyLists);
