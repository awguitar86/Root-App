import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { persistor } from './Redux/configureStore';
// import Loading from './Components/LoadingPage/Loading';
// import Terms from './Components/Terms/Terms';
import Routes from './Routes';
import {
  updateOrder,
  updateUser,
  updateMerchant,
  updatePlatform,
  updateEntity
} from "./Redux/actions";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: true,
      isAuthenticating: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  // async componentDidMount() {
  //   try {
  //     if (await Auth.currentSession()) {
  //       this.userHasAuthenticated(true);
  //     }
  //   }
  //   catch (e) {
  //     if (e !== 'No current user') {
  //       alert(e);
  //     }
  //   }

  //   this.setState({ isAuthenticating: false });
  // }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  clearStores = () => {
    this.props.updateUser({});
    this.props.updateMerchant({});
    this.props.updateOrder({});
    this.props.updatePlatform({});
    this.props.updateEntity({});
    persistor.purge();
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
    this.clearStores();
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      referrer: document.referrer
    };

    return (
      <div className="App">
        <Routes childProps={childProps} />
        {/* <Route exact path='/' component={Loading}/>
        <Route path='/terms' component={Terms}/> */}
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default withRouter( connect( mapStateToProps, {updateOrder, updateUser, updateMerchant, updatePlatform, updateEntity} ) (App) );
