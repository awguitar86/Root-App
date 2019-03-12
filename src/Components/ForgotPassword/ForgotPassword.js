import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import LoaderButton from '../LoaderButton/LoaderButton';
import axios from 'axios';
import RouteLogo from '../../images/RouteLogoKiona.png';
import './ForgotPassword.css';
import { updateEntity, updateUser, updateMerchant, updatePlatform } from '../../Redux/actions';
import { connect } from 'react-redux';
import { findMerchant } from '../../services/merchant.service';
import { findPlatform } from '../../services/platform.service';
import { findUser } from '../../services/user.services';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      confirmationCode: '',
      newPassword: '',
      awsError: '',
      confirmation: false
    };
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  handleForgotPassword = (event) => {
    event.preventDefault()
    Auth.forgotPassword(this.state.email)
      .then(data => this.setState({ confirmation: true }))
      .catch(err => this.setState({ awsError: err.message }));
  }

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    const { email, confirmationCode, newPassword } = this.state;

    this.setState({ isLoading: true });

    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
      let user = await Auth.signIn(email, newPassword);
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
            this.props.updateEntity({entity: entity});
            findMerchant(merchId)
              .then( res => { this.props.updateMerchant(res.data); })
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
    } catch (e) {
      this.setState({
        awsError: e.message,
        isLoading: false,
      });
    }
  }

  handleRedirect(){
    this.props.history.push("/loading");
    this.props.userHasAuthenticated(true);
    clearInterval(this.timer);
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit} className='reset-confirmation-form'>
        <label>Confirmation Code</label>
        <input
          autoFocus
          id='confirmationCode'
          name='confirmationCode'
          type='tel'
          value={this.state.confirmationCode}
          onChange={this.handleChange}
        />
        <div><p>Please check your email for the reset confirmation code.</p></div>
        <label>New Password</label>
        <input
          id='newPassword'
          name='newPassword'
          type='password'
          value={this.state.newPassword}
          onChange={this.handleChange}
        />
        <div><p>Please enter your new password.</p></div>
        <LoaderButton
          type='submit'
          disabled={ !this.state.confirmationCode || ! this.state.newPassword }
          isLoading={this.state.isLoading}
          text='Verify'
          loadingText='Verifying...'
        />
      </form>
    );

  }

  renderForm() {
    return (
      <form onSubmit={ this.handleForgotPassword }>
        <input
          autoFocus
          id='email'
          type='email'
          name='email'
          placeholder='Email'
          value={ this.state.email }
          onChange={ this.handleChange }
        />
        <LoaderButton
          type='submit'
          disabled={ !this.state.email }
          isLoading={ this.state.isLoading }
          text='Reset Password'
          loadingText='Resetting Password...'
        />
      </form>
    )
  }

  render() {
    return (
      <div className='login'>
        <div className='login-wrapper'>
          <img src={RouteLogo} alt='route logo' className='signup-route-logo'/>
          <h1>Reset Your Password</h1>
          { this.state.confirmation ? this.renderConfirmationForm() : this.renderForm() }
          <span className="aws-error-message">{ this.state.awsError }</span>
          <div className='other-actions'>
            <Link to='/login'>Back to Login</Link>
            <Link to='/signup'>New to Route? Sign up here</Link>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, {updateEntity, updateMerchant, updatePlatform, updateUser}) (ForgotPassword);
