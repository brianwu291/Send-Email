import React from 'react';
import './customcss/header.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments.js';

class Header extends React.Component {
  renderContent(){
    switch(this.props.auth){
      case null:  // 接收到初始值 null，表示用戶從未登入過。
        return;
      case false: // 接收到 false，表示 user 是登出狀態
        return(
          <li>
            <a href="/auth/google">Google Login</a>
          </li>
        );
      default: // 有接收到 /api/current_user 的資料，表示 user 是登入狀態
        return[
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ marginLeft: '10px'}}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render(){
    //console.log(this.props);
    return(
      <nav>
        <div className="nav-wrapper pink darken-4">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// 接收從redux store的state作為參數，回傳(通常是)物件作為元件們的props
const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
