import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import LoaderButton from '../LoaderButton/LoaderButton';
import './login.css'
import axios from 'axios';
import RouteLogo from '../../images/RouteLogoKiona.png';
// import config from '../../config';s
import { updateEntity, updateUser, updateMerchant, updatePlatform } from '../../Redux/actions';
import { connect } from 'react-redux';
import { findMerchant } from '../../services/merchant.service';
import { findPlatform } from '../../services/platform.service';
import { findUser } from '../../services/user.services';
// import { createActiveEvent } from '../../services/activeCampaign.service';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      newPassword: '',
      tempUser: null,
      errorMessage: '',
      checkEmail: false
    };
  }

  // componentDidMount(){
  //   let values = queryString.parse(this.props.location.search);
  //   if(values.shopify){
  //     console.log(true);
  //   }
  //   else {
  //     console.log(false);
  //   }
  // }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      let user = await Auth.signIn(this.state.email, this.state.password);
      console.log(user);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setState({
          tempUser: user,
          isLoading: false,
          errorMessage: '',
        });
      } else {
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
        console.log(userId);
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
              this.props.updateEntity({entity: entity});
              findMerchant(merchId)
                .then( res => {
                  console.log(res.data);
                  this.props.updateMerchant(res.data);
                })
                .catch( err => {throw err} );
              this.timer = setInterval( this.handleRedirect.bind(this), 1500 );
              axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
              // let actid = '475235097', key = 'fe3659ab2639ce91ba767c72b5e9dff008893802', activeEvent = 'logged_in';
              // let reqBody = `{ "actid" : "${actid}", "key" : "${key}", "event" : "${activeEvent}" }`;
              // console.log(reqBody);
              // createActiveEvent(reqBody)
              //   .then( res => console.log(res.data) )
              //   .catch( err => {throw err} );
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
              this.props.updateEntity({entity: entity});
              findPlatform(platId)
                .then( res => { this.props.updatePlatform(res.data); })
                .catch( err => {throw err} );
              this.timer = setInterval( this.handleRedirect.bind(this), 1500 );
              axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
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
    } catch (e) {
      this.setState({
        errorMessage: e.message,
        isLoading: false,
      });
    }
  }

  handleNewPasswordSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      let user = await Auth.completeNewPassword(this.state.tempUser, this.state.newPassword)
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
      console.log(userId);
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
              this.props.updateEntity({entity: entity});
              findMerchant(merchId)
                .then( res => {
                  console.log(res.data);
                  this.props.updateMerchant(res.data);
                })
                .catch( err => {throw err} );
              this.timer = setInterval( this.handleRedirect.bind(this), 1500 );
              axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
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
            this.props.updateEntity({entity: entity});
            findPlatform(platId)
              .then( res => {
                if( res.status !== 200 ) {
                  console.log(res.data);
                  this.props.updatePlatform(res.data);
                }
              })
              .catch( err => {throw err} );
            this.timer = setInterval( this.handleRedirect.bind(this), 1500 );
            axios.defaults.headers.common['Authorization'] = user.signInUserSession.idToken.jwtToken;
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
    } catch (e) {
      console.log('catch');
      this.setState({
        errorMessage: e.message,
        isLoading: false,
      });
    }
  }

  handleRedirect(){
    this.props.history.push("/loading");
    this.props.userHasAuthenticated(true);
    clearInterval(this.timer);
  }

  renderNewPasswordForm() {
    return (
      <form onSubmit={this.handleNewPasswordSubmit} className='login-new-pass-form'>
        <label>New Password</label>
        <input
          autoFocus
          id='newPassword'
          type='password'
          value={this.state.newPassword}
          onChange={this.handleChange}
        />
        <div><p>Please enter a new password to replace your temporary password.</p></div>
        <LoaderButton
          type='submit'
          disabled={!this.validateForm()}
          isLoading={this.state.isLoading}
          text='Set New Password'
          loadingText='Setting Password...'
        />
      </form>
    )
  }

  renderForm() {
    return (
          <form onSubmit={this.handleSubmit}>
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
              text='Login'
              loadingText='Logging in...'
            />
          </form>
    );
  }

  render() {
    return (
      <div className='login'>
        <div className='login-wrapper'>
          <img src={RouteLogo} alt='route logo' className='signup-route-logo'/>
          <h1>Login to Route</h1>
          { this.state.tempUser ? this.renderNewPasswordForm() : this.renderForm()}
          <span className="error-message">{ this.state.errorMessage }</span>
          <div className='other-actions'>
            <Link to='/signup'>New to Route? Sign up here</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <h4 className='login-check-email'>* Check your email for a temporary password *</h4>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, {updateEntity, updateMerchant, updatePlatform, updateUser}) (Login);
