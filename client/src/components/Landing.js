import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './customcss/landing.css';

const Landing = props => {
  return(
    <div className="landing-content">
    	<h1>
    		Emaily
    	</h1>
    	<h4>Create Survey And Send To Your Client!</h4>
      <Link to={props.auth ? '/surveys' : '/'}>
      	{props.auth ? 'Click here To Start!' : 'Please Login'}
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
