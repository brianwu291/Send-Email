import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component{

  render(){
    return(
      <StripeCheckout
        name="Emaily"
        description="$5 for email credits."
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        // token here is a callback func, which resive token from stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn cyan accent-4" style={{ borderRadius: '5px' }}>
          增加點數
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
