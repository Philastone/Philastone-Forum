import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Question from './components/Question/Question';
import Questions from './components/Questions/Questions';
import Callback from './components/Callback';
import NewQuestion from './components/NewQuestion/NewQuestion';
import SecureRoute from './components/SecuredRoute/SecuredRoute';
import auth0Client from './components/Auth';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
    this.setState({checkingSession:false})
  }
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/callback' component={Callback}/>
        <SecureRoute path='/new-question' component={NewQuestion} />
      </div>
    );
  }
}

export default withRouter(App);
