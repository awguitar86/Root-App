import React, {Component} from 'react';
import './dashboard.css';
import PlaidLink from 'react-plaid-link'
import Script from 'react-load-script';
import DashContent from './DashContent/DashContent';
import MenuHeader from '../MenuHeader/MenuHeader';
import { hello } from '../../services/api.service';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../Redux/actions';
import { connect } from 'react-redux';
import { findMerchant, findMerchantSignature, updateMerchantSignature, createExpertInstallRequest } from '../../services/merchant.service';
import { createMerchantBilling } from '../../services/billing.services';
import { findUser } from '../../services/user.services';
import { findPlatform, createPlatformBilling } from '../../services/platform.service';
import Modal from 'react-modal';
import ShopifyLogo from '../../images/shopifyLogo.png';
import HTMLTag from '../../images/htmltag.png';
import ExpertIcon from '../../images/expertIcon.png';
import RobotIcon from '../../images/robotIcon.png';
import RouteLogo from '../../images/RouteLogoKiona.png';
import ManualLogo from '../../images/manualIcon-01.png';
import config from '../../config';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            onboarding : false,
            showModal : false,
            stepOne: false,
            stepTwo: true,
            stepThree: false,
            stepFour: false,
            stepFive: false,
            stepSix: false,
            expertInstall: false,
            manualStepOne: false,
            manualStepTwo: false,
            label: '',
            myshopifyURL: '',
            shopifyEmail: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleStepOne = this.handleStepOne.bind(this);
        this.handleStepTwo = this.handleStepTwo.bind(this);
        this.handleStepThree = this.handleStepThree.bind(this);
        this.handleStepFour = this.handleStepFour.bind(this);
        this.handleRequestSent = this.handleRequestSent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnBoarding = this.handleOnBoarding.bind(this);
        this.handleAutoInstall = this.handleAutoInstall.bind(this);
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.handleManualStepOne = this.handleManualStepOne.bind(this);
        // this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        hello()
            .then( res => {
                console.log(res.data);
            })
        let entity = this.props.entityInfo.entity;
        let platId = this.props.platformInfo.id;
        let merchId = this.props.merchantInfo.id;
        let userId = this.props.userInfo.id;
        switch(entity){
            case "ROUTE_PLATFORM":
                this.setState({ showModal: false });
                findPlatform(platId)
                .then(res => {
                    let newPlatformInfo = res.data;
                    console.log(res.data);
                    this.props.updatePlatform(newPlatformInfo);
                })
                findUser(userId)
                .then(res => {
                    let newUserInfo = res.data;
                    console.log(res.data);
                    this.props.updateUser(newUserInfo);
                })
                break;
            case "ROUTE_MERCHANT":
                findMerchantSignature(merchId)
                    .then( res => {
                        console.log(res.data);
                        if(res.data['onboarded']){
                            this.setState({showModal: false});
                        }
                        else {
                            this.setState({showModal: true});
                        };
                    })
                    .catch( err => {throw err} );
                console.log(this.state.onboarding);
                findMerchant(merchId)
                .then(res => {
                    let newMerchantInfo = res.data;
                    console.log(res.data);
                    this.props.updateMerchant(newMerchantInfo);
                })
                findUser(userId)
                .then(res => {
                    let newUserInfo = res.data;
                    console.log(res.data);
                    this.props.updateUser(newUserInfo);
                })
                break;
            default:
                alert("You are not part of a platform or merchant. You have no role.");
        }
    }
    openModal() {
        this.setState({ showModal: true });
      }
    closeModal() {
        this.setState({ showModal: false });
    }
    handleStepOne() {
        this.setState({stepOne: false, stepTwo: true});
    }
    handleStepTwo() {
        this.setState({stepTwo: false, stepThree: true});
    }
    handleStepThree() {
        this.setState({stepThree: false, stepFour: true});
    }
    handleStepFour() {
        this.setState({stepFour: false, stepFive: true});
    }
    handleManualStepOne(){
        this.setState({ stepTwo: false, manualStepOne: true });
    }
    handleRequestSent() {
        let type = "expert_install";
        let shopify_store_email = this.props.userInfo.user_email;
        let shopify_store_name = this.props.merchantInfo.url;
        let name = "N/A";
        let policy_number = "N/A";
        let reqBody = `{"type" : "${type}", "shopify_store_email" : "${shopify_store_email}", "shopify_store_name" : "${shopify_store_name}", "name" : "${name}", "policy_number" : "${policy_number}"}`;
        console.log(reqBody);
        createExpertInstallRequest(reqBody)
            .then( res => { console.log( res ); })
            .catch( err => {throw err} );
        this.setState({expertInstall: true});
    }
    handleAutoInstall() {
        this.setState({stepTwo: false, stepThree: true});
        this.timer = setInterval( this.handleCloseModal.bind(this), 3500 );
    }
    handleCloseModal(){
        this.closeModal();
        clearInterval(this.timer);
    }
    handleOnBoarding(){
        let merchId = this.props.merchantInfo.id;
        let terms_signed = true;
        let onboarded = true;
        let reqBody = { onboarded, terms_signed };
        console.log(reqBody);
        updateMerchantSignature(merchId, reqBody)
            .then( res => { console.log(res); })
            .catch( err => {throw err} );
        this.closeModal();
    }

    handleOnSuccess(public_token_value, metadata){
        let label = this.state.label;
        let user_id = this.props.userInfo.id;
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let plaid_acct_id = metadata.account.id;
        let plaid_acct_mask = metadata.account.mask;
        let plaid_acct_name = metadata.account.name;
        let plaid_acct_subtype = metadata.account.subtype;
        let plaid_institution_id = metadata.institution.institution_id;
        let plaid_institution_name = metadata.institution.name
        let plaid_link_session_id = metadata.link_session_id;
        let body = {
            label,
            plaid_acct_id,
            plaid_acct_mask,
            plaid_acct_name,
            plaid_acct_subtype,
            plaid_institution_id,
            plaid_institution_name,
            plaid_link_session_id,
            public_token_value,
            user_id
        };
        if(entity === 'ROUTE_PLATFORM'){
            createPlatformBilling(platId, body)
                .then( res => res.data )
                .catch( err => {throw err});
                console.log(platId, body);
        }
        else {
            createMerchantBilling(merchId, body)
                .then( res => res.data )
                .catch( err => {throw err});
                console.log(merchId, body);
        }
        this.setState({stepThree: false, stepFour: true});
    }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    validateForm() {
        return this.state.shopifyEmail.length > 0 && this.state.myshopifyURL.length > 0;
      }

    render() {
        console.log(this.state);
        let modalStyle = {display:'flex', justifyContent: 'center'};
        return (
            <div className='dashboard'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <DashContent/>
                <Modal
                isOpen={this.state.showModal}
                contentLabel="Route Learn More"
                modalStyle={modalStyle}
                className="route-modal"
                overlayClassName="route-modal-overlay"
                ariaHideApp={false}>
                <div className='onboarding-modal-wrap'>
                    <div className={this.state.stepOne ? 'onboarding-selection-wrap' : 'onboarding-selection-wrap-false'}>
                            <div className='onboarding-selection-header'>
                                <div className='onboarding-welcome'>
                                    <h1>Welcome to</h1>
                                    <img src={RouteLogo} alt='route logo' className='onboarding-route-logo'/>
                                </div>
                                <h3>Select the platform you use for your store.</h3>
                            </div>
                            <div className='onboarding-selection-body'>
                                <a className='custom-merchant' href='https://www.routeapp.io/api-docs' target='_blank' rel='noopener noreferrer' onClick={this.handleOnBoarding}>
                                    <img src={HTMLTag} alt='html tag icon' className='html-tag'/>
                                    <h2>Custom Merchant</h2>
                                    <p>Integrate Route's API</p>
                                    <p>Route can be installed on any custom platform by following our API Docs. Click here to start integration.</p>
                                </a>
                                <div className='shopify-merchant' onClick={this.handleStepOne}>
                                    <img src={ShopifyLogo} alt='shopify logo' className='shopify-logo'/>
                                    <h2>Shopify</h2>
                                    <p>Built for Shopify</p>
                                    <p>If you are using Shopify as your selling platform, click here.</p>
                                </div>
                            </div>
                    </div>
                    <div className={this.state.stepTwo ? 'shopify-selection-wrap' : 'shopify-selection-wrap-false'}>
                            <div className='shopify-selection-header'>
                                <h1>Welcome to <img src={RouteLogo} alt='route logo' className='onboarding-route-logo'/></h1>
                                <h3>Your Shopify theme must be updated with our app's unique code. Please select one of the two installation methods below.</h3>
                            </div>
                            <div className='shopify-selection-body'>
                                <a className='manual-install' href="https://www.routeapp.io/install-route-yourself" target="_blank" rel="noopener noreferrer" onClick={this.handleOnBoarding}>
                                    <img src={ManualLogo} alt='manual icon' className='manual-icon'/>
                                    <h2>Install Yourself (Free)</h2>
                                    <p className='coming-soon'>Installing Route only takes a few minutes.</p>
                                    <p>We will guide you through how to install Route on your Shopify store, or you can send the instructions to your favorite developer.</p>
                                </a>
                                <a className={!this.state.expertInstall ? 'expert-install' : 'expert-install-false'} onClick={this.handleRequestSent}>
                                    <img src={ExpertIcon} alt='expert icon' className='expert-icon'/>
                                    <h2>Expert Install (Free)</h2>
                                    <p>May take up to 24 hours to complete</p>
                                    <p>Let a Route expert complete your installation. We will validate that everything is installed properly, and ensure your app is working correctly.</p>
                                </a>
                                <div className={this.state.expertInstall ? 'request-sent' : 'request-sent-false'}>
                                    <div className='request-sent-thank-you'>
                                        <h2>Thank you!</h2>
                                        <h3>Install request sent. A Route expert will request access to edit your Shopify store.</h3>
                                    </div>
                                    <div className='expert-next-button'><button onClick={this.handleStepTwo}>Next &rarr;</button></div>
                                </div>
                            </div>
                    </div>
                    <div className={this.state.stepThree ? "shopify-add-billing" : "shopify-add-billing-false"}>
                            <div className='shopify-billing-header'>
                                <h1>Connect Account</h1>
                                <h3>Connect your account in order to automatically process insured payments. Protected orders pass through your store to Route automatically via Stripe.</h3>
                            </div>
                            <input className='shopify-billing-label-input'  type="text" name="label" placeholder='e.g. My Bank'onChange={ e => {this.handleInputChange(e) }}/>
                            <div className='shopify-plaid'>
                                <Script url='https://cdn.plaid.com/link/v2/stable/link-initialize.js'/>
                                <PlaidLink
                                    selectAccount={true}
                                    env={config.PLAID_ENV}
                                    clientName='Route'
                                    publicKey={config.PLAID_PUBLIC_KEY}
                                    product={['auth']}
                                    onSuccess={this.handleOnSuccess}
                                    style={{width:'200px', height:'35px', background:'#5EC7DB', border:'none', borderRadius:'5px', fontSize:'10pt', cursor:'pointer', color:'white', outline: 'none' }}
                                >
                                    Setup Payment With Stripe
                                </PlaidLink>
                            </div>
                    </div>
                    <div className={this.state.stepFour ? "end-thanks" : "end-thanks-false"}>
                            <h1>Thank You!</h1>
                            <h1>You are now ready to start using</h1>
                            <img src={RouteLogo} alt="route logo"/>
                            <button onClick={this.handleOnBoarding}>Finish</button>
                    </div>
                    <div className={this.state.manualStepOne ? "install-yourself" : "install-yourself-false"}>
                        Route
                    </div>
                </div>
            </Modal>
            </div>
        )
    }
}
function mapStateToProps(state){
    return state;
}


export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (Dashboard);