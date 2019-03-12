import React, { Component } from "react";
import LoaderButton from "../LoaderButton/LoaderButton";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import "./signup.css";
import RouteLogo from '../../images/RouteLogoKiona.png';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      url: '',
      // confirmPassword: '',
      // confirmationCode: '',
      newUser: null,
      errorMessage: '',
    };
  }

  validateForm() {
    return (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
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
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }

    this.setState({ isLoading: false });
  };

  // handleConfirmationSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });

  //   try {
  //     await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
  //     await Auth.signIn(this.state.email, this.state.password);

  //     this.props.userHasAuthenticated(true);
  //     this.props.history.push("/");
  //   } catch (e) {
  //     this.setState({
  //       errorMessage: e.message,
  //       isLoading: false,
  //     });
  //   }
  // };

  // renderConfirmationForm() {
  //   return (
  //     <form onSubmit={this.handleConfirmationSubmit} className='signup-confirmation-form'>
  //       <label>Confirmation Code</label>
  //       <input
  //         autoFocus
  //         id='confirmationCode'
  //         type='tel'
  //         value={this.state.confirmationCode}
  //         onChange={this.handleChange}
  //       />
  //       <div><p>Please check your email for the confirmation code.</p></div>
  //       <LoaderButton
  //         type='submit'
  //         disabled={!this.validateForm()}
  //         isLoading={this.state.isLoading}
  //         text='Verify'
  //         loadingText='Verifying...'
  //       />
  //     </form>
  //   );
  // }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit} className='signup-form'>
        <label>First Name</label>
        <input
          autoFocus
          id='firstName'
          type='text'
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label>Last Name</label>
        <input
          autoFocus
          id='lastName'
          type='text'
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <label>Email</label>
        {/* <FormGroup controlId="email" bsSize="large"> */}
        <input
          autoFocus
          id='email'
          type='email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label>Password</label>
        {/* <FormGroup controlId="password" bsSize="large"> */}
        <input
          id='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        {/* <FormGroup controlId="confirmPassword" bsSize="large"> */}
        {/* <input
          id='confirmPassword'
          type='password'
          placeholder='Confirm password'
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        /> */}
        <LoaderButton
          type='submit'
          disabled={!this.validateForm()}
          isLoading={this.state.isLoading}
          text='Signup'
          loadingText='Signing up...'
        />
      </form>
    );
  }

  render() {
    return <div className="signup">
            <div className="signup-wrapper">
              <img src={RouteLogo} alt='route logo' className='signup-route-logo'/>
              <h1>Sign up for Route</h1>
              {this.renderForm}
              {/* {this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()} */}
              {/* {this.renderConfirmationForm()} */}
              <span className="error-message">{ this.state.errorMessage }</span>
              <div className="other-actions">
                <Link to="/login">Back to login</Link>
              </div>
            </div>
          </div>;
  }
}
