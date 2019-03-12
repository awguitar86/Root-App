import React, {Component} from 'react';
import './billingType.css';
import MenuHeader from '../../../MenuHeader/MenuHeader';
import PlaidLink from 'react-plaid-link';
import PoweredByStripe from '../../../../images/powered_by_stripe@3x.png';
import Script from 'react-load-script';
import { Redirect } from 'react-router-dom';
import { createMerchantBilling } from '../../../../services/billing.services';
import { createPlatformBilling } from '../../../../services/platform.service';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../../../Redux/actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import config from '../../../../config';
// import {Link} from 'react-router-dom';
// import { findInstitutions } from '../../../../services/plaid.services';

class BillingType extends Component {
    constructor(props){
        super(props);
        this.state = {
            publicTokenValue: '',
            metadataAccountIdValue: '',
            label: '',
            redirect: false,
            showModal: false,

        }
        this.handleOnSuccess = this.handleOnSuccess.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        // if(entity.includes('ROUTE_PLATFORM')){
        //     createPlatformBilling(platId, body)
        //         .then( res => res.data )
        //         .catch( err => {throw err});
        //         console.log(platId, body);
        // }
        // else {
        //     createMerchantBilling(merchId, body)
        //         .then( res => res.data )
        //         .catch( err => {throw err});
        //         console.log(merchId, body);
        // }
        this.setState({showModal: true});
        this.timer = setInterval( this.handleRedirect.bind(this), 1700 );
    }

    handleRedirect(){
        this.setState({ redirect: true, showModal: false});
        clearInterval(this.timer);
    }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    openModal() {
        this.setState({ showModal: true });
      }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        console.log(this.state);
        if(this.state.redirect){
            return <Redirect to='/billing'/>;
        }
        let modalStyle = "display:flex; justify-content:center;";
        return (
            <div className='billing-type-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='billing-type-header'>
                    <h2>ACH Billing Setup</h2>
                    <img src={PoweredByStripe} alt="powered by stripe logo"/>
                </div>
                <div className='billing-type'>
                    <div className='billing-type-note'>
                        <p>
                            <strong>Note:</strong> Connecting your bank account is done via your bank’s secure login page powered by Stripe Payments. No banking information is stored by Route.
                        </p>
                    </div>
                    <div className='billing-type-name'>
                        <h4>Billing Type Name/Alias</h4>
                        <input className='label-input'  type="text" name="label" placeholder='e.g. My Bank'onChange={ e => {this.handleInputChange(e) }}/>
                    </div>
                    <div className='stripe-payment'>
                        <Script url='https://cdn.plaid.com/link/v2/stable/link-initialize.js'/>
                        <PlaidLink
                            selectAccount={true}
                            env={config.PLAID_ENV}
                            clientName='Route'
                            publicKey={config.PLAID_PUBLIC_KEY}
                            product={['auth']}
                            onSuccess={this.handleOnSuccess}
                            style={{width:'200px', height:'25px', background:'#45DCE5', border:'none', borderRadius:'5px', fontSize:'10pt', cursor:'pointer', color:'#1A1E37' }}
                        >
                            Setup Payment With Stripe
                        </PlaidLink>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Route Learn More"
                    modalStyle={modalStyle}
                    className="route-modal"
                    overlayClassName="route-modal-overlay"
                    ariaHideApp={false}
                >
                    <div className='modal-wrap'>
                        <h2>Loading...</h2>
                    </div>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (BillingType);