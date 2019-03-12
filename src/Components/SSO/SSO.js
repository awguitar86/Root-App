import React, { Component } from 'react';
import './sso.css';
import { updateEntity, updateUser, updateMerchant, updatePlatform } from '../../Redux/actions';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import queryString from 'query-string';
import axios from 'axios';
import { findMerchant } from '../../services/merchant.service';
import { findPlatform } from '../../services/platform.service';
import { findUser } from '../../services/user.services';
import Modal from 'react-modal';

class SSO extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    async componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        if (params.token) {
            try {
                const userName = params.shop.replace(".myshopify.com", "@myshopify.com");
                const user = await Auth.signIn(userName);
                if (user.challengeName === "CUSTOM_CHALLENGE" && user.challengeParam.distraction === "Yes") {
                    await Auth.sendCustomChallengeAnswer(user, params.token);
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
            }
            catch (e){
                console.error(e.message);
                this.setState({ showModal: true });
            }
            // Success!!
        } else {
            this.props.history.push('/login');
        }
    }

    handleGoBack(){
        window.history.back();
    }

    openModal() {
        this.setState({ showModal: true });
      }

    closeModal() {
        this.setState({ showModal: false });
    }

    render(){
        let modalStyle = "display:flex; justify-content:center;";
        return(
            <div className='home-body'>
                <h1>...Loading</h1>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Route Shopify Error"
                    modalStyle={modalStyle}
                    className="route-error-modal"
                    overlayClassName="route-error-modal-overlay"
                    ariaHideApp={false}
                >
                    <div className='error-modal-wrap'>
                        <div className='error-top'>
                            <div className='x-icon'>&#10005;</div>
                        </div>
                        <h1>Oh snap!</h1>
                        <h3>Something was wrong with your Shopify session.<br/>Please contact Route.</h3>
                        <button onClick={this.handleGoBack}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
  }

  export default connect(mapStateToProps, {updateEntity, updateMerchant, updatePlatform, updateUser}) (SSO);
