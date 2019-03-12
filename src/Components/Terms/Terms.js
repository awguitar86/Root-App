import React, {Component} from 'react';
import './terms.css';
import {Redirect} from 'react-router-dom';
import { updatePlatformSignature } from '../../services/platform.service';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../Redux/actions';
import { connect } from 'react-redux';

class Terms extends Component {
    constructor(props){
        super(props);
        this.state = {
            agreed: false,
            disagree: false,
            redirect: false
        }
        this.handleAgree = this.handleAgree.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleDisagree = this.handleDisagree.bind(this);
    }

    handleAgree(){
        let entity = this.props.entityInfo.entity;
        let platId = this.props.platformInfo.id;
        let body = true
        switch(entity){
            case "ROUTE_PLATFORM":
                updatePlatformSignature(platId, body)
                    .then( res => res.data )
                    .catch( err => {throw err} );
                this.setState({agreed: true, disgreed: false});
                this.timer = setInterval( this.changeRedirectState.bind(this), 1200 );
                break;
            case "ROUTE_MERCHANT":
                this.setState({agreed: true, disgreed: false});
                this.timer = setInterval( this.changeRedirectState.bind(this), 1200 );
                break;
            default:
                this.setState({agreed: true, disgreed: false});
                this.timer = setInterval( this.changeRedirectState.bind(this), 1200 );
        }
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    handleDisagree(){
        this.setState({agreed: false, disagree: true});
    }

    handleBack(){
        this.setState({agreed: false, disagree: false});
    }

    changeRedirectState(){
        this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/dashboard'/>;
        }
        return(
            <div className='terms-body'>
                <div id='route-tou-wrap'>
                    <div id={!this.state.disagree ? 'route-tou-body' : 'route-tou-body-false'}>
                        <div><img className='terms-route-logo' src="https://s3-us-west-2.amazonaws.com/route-static/RouteLogoKionaRowWhite.svg" alt='blue shield'/></div>
                        <div id='terms-of-use'>
                            <h2>TERMS AND CONDITIONS</h2>
                        </div>
                        <div id='excluded-goods'>
                            <div className='EG-content'>
                                <div className='section-limits'>
                                    <p>THIS SECTION LIMITS OUR SERVICES/LIABILITY TO YOU.</p>
                                    <p><strong>PLEASE READ IT CAREFULLY.</strong></p>
                                </div>
                                <p>The Route Policy does not cover the following: cash, <strong>cigarettes and other tobacco products, computer memory modules and cards, cotton, fine art (defined as art valued in excess of $10,000 per piece), flowers, fresh foods (excepting frozen foods in refrigerated containers), jewelry valued in excess of $300 per piece, live animals, negotiable papers, perishable commodities (defined as commodities which spoil or deteriorate when not carried or stored in a temperature controlled environment), pharmaceutical drugs, plants, precious stones and metals, and securities. Automobiles and motorcycles, bagged goods, boats and yachts, ceramic, marble or granite tiles, slabs blocks, countertops or statutes, glass windows, plate glass and similar goods; lumber, used household goods and personal effects; scrap metal, steel metal and steel metal products</strong></p>
                                <p>If you sell any of the goods that fall under the categories outlined above in any way, you are not eligible to use the Route Policy. By agreeing, you are stating that you do not sell any of the items that fall under the “Excluded Goods” section and void any/all insurance coverage. </p>
                            </div>
                            <div id='EG-buttons'>
                                <button id={!this.state.agreed ? 'agree' : 'agree-true'} onClick={this.handleAgree}>I Agree</button>
                                <button id={!this.state.agreed ? 'agreed' : 'agreed-true'}>&#x2713;</button>
                                <button id='disagree' onClick={this.handleDisagree}>I Disagree</button>
                            </div>
                            <div className='agree-to-tou'>
                                <p>By proceeding you agree to the <a href='https://s3-us-west-2.amazonaws.com/route-static/TermsOfUse.html' target="_blank" rel="noopener noreferrer">terms of service.</a></p>
                            </div>
                        </div>
                    </div>
                    <div id={!this.state.disagree ? 'route-disagree' : 'route-disagree-true'}>
                        <div className='route-modal-logo'><img src="https://s3-us-west-2.amazonaws.com/route-static/RouteLogoKionaRowWhite.svg" alt='blue shield'/></div>
                        <p>By disagreeing, you will not be able to use Route.</p>
                        <p>Our app will not be activated until you agree to the terms and conditions.</p>
                        <p>Are you sure you want to disagree?</p>
                        <div id='disagree-buttons'>
                            <button id='back' onClick={this.handleBack}>Back</button>
                            <a href='https://www.routeapp.io/'><button id='exit-app'>Disagree and Exit App</button></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (Terms);