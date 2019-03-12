import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import LoaderButton from '../LoaderButton/LoaderButton';
import "./signup.css";
import RouteLogo from '../../images/RouteLogoKiona.png';
import { createMerchant } from '../../services/merchant.service';
import axios from 'axios';
import { findMerchant, syncDatabaseToCognito } from '../../services/merchant.service';
import { findPlatform } from '../../services/platform.service';
import { findUser } from '../../services/user.services';
import { updateEntity, updateUser, updateMerchant, updatePlatform } from '../../Redux/actions';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company_name: '',
      url: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmationCode: '',
      errorMessage: '',
      newUser: null,
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return (
      this.state.company_name.length > 0 &&
      this.state.url.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    let { company_name, url, first_name, last_name, email, password } = this.state;
    let owner = { email, first_name, last_name };
    let platform_name = "Route"
    let name = company_name;
    let reqBody = { name, owner, platform_name, url };
    let emptyBody = {};
    this.setState({ isLoading: true });
    try {
      createMerchant(reqBody)
        .then( res => {
            if( res.status !== 200 ) {
              console.log(res);
            }
        })
        .catch( err => {throw err} );
      const newUser = await Auth.signUp({
        username: email,
        password: password,
      });
      this.setState({ newUser });
      syncDatabaseToCognito(emptyBody)
        .then( res => { console.log( res ); })
        .catch( err => {throw err} );
    }
    catch (e) {
      this.setState({ errorMessage: e.message })
    }
    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      let user = await Auth.signIn(this.state.email, this.state.password);
      console.log(user);
      let userRole = user.signInUserSession.idToken.payload['custom:roles'];
      let entity = userRole.substring(userRole.lastIndexOf('["') + 2, userRole.lastIndexOf('"]') );
      let platformId = user.signInUserSession.idToken.payload['custom:platforms'];
      let platId = Number( platformId.substring(platformId.lastIndexOf("[") + 1, platformId.lastIndexOf("]")) );
      let merchantId = user.signInUserSession.idToken.payload['custom:merchants'];
      let merchId = Number( merchantId.substring(merchantId.lastIndexOf("[") + 1, merchantId.lastIndexOf("]")) );
      let userId = Number(user.signInUserSession.idToken.payload['custom:user_id']);
      console.log(entity);
      console.log(merchId);
      console.log(platId);
      switch (entity) {
        case "ROUTE_MERCHANT":
          if(!merchId){
            Auth.signOut();
            this.userHasAuthenticated(false);
            this.props.history.push('/login');
            console.log('!merchId')
            this.setState({ isLoading: false });
          }
          else {
            console.log('merchId good')
            this.props.history.push("/loading");
            this.props.userHasAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
            findMerchant(merchId)
              .then( res => { this.props.updateMerchant(res.data); })
              .catch( err => {throw err} );
            this.props.updateEntity({entity: entity});
          }
          break;

        case "ROUTE_PLATFORM":
        if(!platId) {
            console.log('!platId')
            Auth.signOut();
            this.userHasAuthenticated(false);
            this.props.history.push('/login');
            this.setState({ isLoading: false });
          }
          else {
            console.log('platId good')
            this.props.history.push("/loading");
            this.props.userHasAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
            findPlatform(platId)
              .then( res => { this.props.updatePlatform(res.data); })
              .catch( err => {throw err} );
            this.props.updateEntity({entity: entity});
          }
          break;

        default:
          console.log('default')
          Auth.signOut();
          this.userHasAuthenticated(false);
          this.props.history.push('/login');
          alert("Please Contact Support");
          this.setState({ isLoading: false });
      }
      findUser(userId)
        .then( res => { this.props.updateUser(res.data); })
        .catch( err => {throw err} );
    }
    catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

renderConfirmationForm() {
  return (
    <form onSubmit={this.handleConfirmationSubmit}>
      <input
        autoFocus
        id='confirmationCode'
        type='tel'
        placeholder='Confirmation Code'
        value={this.state.confirmationCode}
        onChange={this.handleChange}
      />
      <div><p>Please check your email for the confirmation code.</p></div>
      <LoaderButton
        type='submit'
        disabled={!this.validateConfirmationForm()}
        isLoading={this.state.isLoading}
        text='Verify'
        loadingText='Verifying...'
      />
    </form>
);
}

renderForm() {
  return (
        <form onSubmit={this.handleSubmit}>
          <input
            autoFocus
            id='company_name'
            type='company_name'
            placeholder='Company Name'
            value={this.state.company_name}
            onChange={this.handleChange}
          />
          <input
            autoFocus
            id='url'
            type='url'
            placeholder='URL'
            value={this.state.url}
            onChange={this.handleChange}
          />
          <input
            autoFocus
            id='first_name'
            type='first_name'
            placeholder='First Name'
            value={this.state.first_name}
            onChange={this.handleChange}
          />
          <input
            autoFocus
            id='last_name'
            type='last_name'
            placeholder='Last Name'
            value={this.state.last_name}
            onChange={this.handleChange}
          />
          <input
            autoFocus
            id='email'
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            id='password'
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <LoaderButton
            type='submit'
            disabled={!this.validateForm()}
            isLoading={this.state.isLoading}
            text='Sign Up'
            loadingText='Logging in...'
          />
        </form>
  );
}

  render() {
    console.log(this.state);
    return <div className="signup">
              <div className="signup-wrapper">
                  <img src={RouteLogo} alt='route logo' className='signup-route-logo'/>
                  <h1>Sign Up for Route</h1>
                    { this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm() }
                  <span className="error-message">{ this.state.errorMessage }</span>
                  <div className='other-actions'>
                    <Link to="/login">Back to Login</Link>
                  </div>
              </div>
          </div>
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, {updateEntity, updateMerchant, updatePlatform, updateUser}) (Signup);