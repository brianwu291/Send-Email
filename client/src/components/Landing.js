import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './customcss/landing.css';

const Landing = props => {
  return(
    <div className="landing-content">
    	<h2>
    	 	e-mail 問卷平台
    	</h2>
    	<h4>幫助您客制化專屬問卷!</h4>
      <Link to={props.auth ? '/surveys' : '/'}>
      	{props.auth ? '點擊開始!' : '點擊右上角登入'}
      </Link>
    </div>
  );
}

function mapStateToProps(state){
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(Landing);
