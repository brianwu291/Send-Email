import React from 'react';
import './customcss/app.css';
// BrowserRouter物件是整個大腦，負責監控url、並handle每個url應該出現的元件
// Route物件則是負責設定route中的元件顯示。 兩者都是react元件
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
// connect()接受兩個參數，第一個是mapStateToProps函數，這裡不需要因為是App.js，
// 第二個參數就是actioncreator函數，可以想見會有很多actioncreator函數，所以
// 這裡import ＊ as actions from '../actions';並傳入connect()。
// 這時，所有的actioncreator以props的方式傳給了App component。
