import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import './routeWidget.css';
import './PlusCheck/PlusCheck.css';
import './MoreInfoModal/moreInfoModal.css';
import './MoreInfoModal/moreInfoTooltip.css';
import InfoIcon from '../../images/infoIcon.png';
import RouteLogo from '../../images/RouteLogoKiona.png';
// import Lost from '../../images/LostIcon.png';
// import Damage from '../../images/DamageIcon.png';
// import Theft from '../../images/TheftIcon.png';
import LloydsLogo from '../../images/LloydsOfLondon.png';
import UserPlusIcon from '../../images/UserPlusIcon.svg';
import Box from '../../images/Box.svg';
import Shield from '../../images/Shield.svg';

class RouteWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            showModal: false
        }
        this.handleChecked = this.handleChecked.bind(this);
        this.handleMoreInfo = this.handleMoreInfo.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChecked() {
        if(this.state.checked === false){
            this.setState({ checked: true });
        }
        else {
            this.setState({ checked: false });
        }
    }

    handleMoreInfo() {
        if(this.state.moreInfo === false) {
            this.setState({ moreInfo: true });
        }
        else {
            this.setState({ moreInfo: false });
        }
    }

    openModal() {
        this.setState({ showModal: true });
      }

    closeModal() {
    this.setState({ showModal: false });
    }

  render() {
    console.log(this.state);
    let modalStyle = "display:flex; justify-content:center;";
    return (
            <div id="route-main">
                <div id={!this.state.checked ? "route-content" : "route-content-checked"}>
                    <div id="widget-top" onClick={this.handleChecked}>
                        <div id="route-check">
                            <div className={!this.state.checked ? "toggle add" : "toggle add added just-added"} onClick={this.handleChecked}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <img src={RouteLogo} alt="route logo" id='route-widget-logo'/>
                        <div id="rightside">
                            <div id="widget-header">
                                <p id="widget-ship-protect">Secure Your Shipment for Only<span id="routeq"> $0.00</span></p>
                            </div>
                        </div>
                    </div>
                    <div id="widget-bottom">
                        <div id="protect-from" onClick={this.handleChecked}>
                            <p id='fully-protect-from'>Fully Protect from Lost &bull; Damaged &bull; Stolen</p>
                        </div>
                        <div id="widget-more-info">
                            <button id="routehelp-tooltip" data-tip>
                                <img src={InfoIcon} alt="info icon"/>
                            </button>
                            <button id="routehelp-modal" onClick={this.openModal}>
                                <img src={InfoIcon} alt="info icon"/>
                            </button>
                        </div>
                    </div>
                </div>

                <ReactTooltip
                    className='react-tooltip'
                    type='light'
                    effect='solid'
                    place='bottom'
                >
                    <div id="powered-wrapper">
                        <p id='powered-by'>this site is protected by</p>
                        <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer"><img src={RouteLogo} alt="route logo"/></a>
                    </div>
                    <h1 id='protect-your-package'>Secure your Shipment with One-Click</h1>
                    <p id='trusted-by'>Trusted by Over 300,000 Customers</p>
                    <div id="description-wrapper">
                        <div id="lost">
                            <img id="lost-img" src={UserPlusIcon} alt='lost img'/>
                            <h3 id='lost-h3'>Easy Sign-up</h3>
                            <p id='lost-p'>Select Afterpay as your payment method in checkout for orders between $35 - $1,000. All you need is your debit or credit card. Must be 18 or older and meet additional eligibility criteria to qualify.</p>
                        </div>
                        <div id="damage">
                            <img id="damage-img" src={Box} alt='damage img'/>
                            <h3 id='damage-h3'>Instant Approval Decision & Shipment</h3>
                            <p id='damage-p'>No long forms to fill out; you’ll receive an instant approval decision! Your order will be shipped immediately!</p>
                        </div>
                        <div id="theft">
                            <img  id="theft-img" src={Shield} alt='theft img'/>
                            <h3 id='theft-h3'>Nothing Extra to Pay</h3>
                            <p id='theft-p'>Always zero interest. Never any additional fees when you pay on time.* Automatic payment taken every 2 weeks in four equal installments.</p>
                        </div>
                    </div>
                    <div id='more-info-footer'>
                        <div id="learn-more-terms">
                            <p id="terms-and-conditions">
                                This optional protection is offered to you solely in order to effectuate the shipment of your package(s).
                                Route is the named assured on the Route Policy of which your shipment will be protected on. The cost of adding
                                your shipment to the Route Policy includes compensation paid to Safe Order Solutions, LLC (a licensed insurance
                                agency affiliate of Route), for making this protection available.
                            </p>
                        </div>
                        <div id='footer-right-wrap'>
                            <div id='lloyds-wrap'>
                                <p id='backed-by'>backed by</p>
                                <img src={LloydsLogo} alt="lloyd's of london logo" id='lloyds-logo'/>
                            </div>
                            <div id='get-route-wrap'>
                                <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer" id='get-route-business'><u>Get Route</u> for your Business</a>
                            </div>
                        </div>
                    </div>
                </ReactTooltip>
                <Modal
                isOpen={this.state.showModal}
                onRequestClose={this.closeModal}
                contentLabel="Route Learn More"
                modalStyle={modalStyle}
                className="route-modal"
                overlayClassName="route-modal-overlay"
                ariaHideApp={false}
                >
                <div id="dialog">
                    <div id="close-wrap"><span id="close-route-modal" onClick={this.closeModal}>&times;</span></div>
                    <div id="powered-wrapper">
                        <p id='powered-by'>this site is protected by</p>
                        <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer" id='route-logo-link'><img src={RouteLogo} alt="route logo" id='route-logo'/></a>
                    </div>
                    <h1 id='protect-your-package'>Secure your Shipment with One-Click</h1>
                    <p id='trusted-by'>Trusted by Over 300,000 Customers</p>
                    <div id="description-wrapper">
                        <div id="lost">
                            <img id="lost-img" src={UserPlusIcon} alt='lost img'/>
                            <h3 id='lost-h3'>Easy Sign-up</h3>
                            <p id='lost-p'>Select Afterpay as your payment method in checkout for orders between</p>
                        </div>
                        <div id="damage">
                            <img id="damage-img" src={Box} alt='damage img'/>
                            <h3 id='damage-h3'>Instant Approval Decision & Shipment</h3>
                            <p id='damage-p'>No long forms to fill out; you’ll receive an instant approval decision!</p>
                        </div>
                        <div id="theft">
                            <img  id="theft-img" src={Shield} alt='theft img'/>
                            <h3 id='theft-h3'>Nothing Extra to Pay</h3>
                            <p id='theft-p'>Always zero interest. Never any additional fees when you pay on time.*</p>
                        </div>
                    </div>
                    <div id='more-info-footer'>
                        <div id="learn-more-terms">
                            <p id="terms-and-conditions">
                                This optional protection is offered to you solely in order to effectuate the shipment of your package(s).
                                Route is the named assured on the Route Policy of which your shipment will be protected on. The cost of adding
                                your shipment to the Route Policy includes compensation paid to Safe Order Solutions, LLC (a licensed insurance
                                agency affiliate of Route), for making this protection available.
                            </p>
                        </div>
                        <div id='footer-right-wrap'>
                            <div id='lloyds-wrap'>
                                <p id='backed-by'>backed by</p>
                                <img src={LloydsLogo} alt="lloyd's of london logo" id='lloyds-logo'/>
                            </div>
                            <div id='get-route-wrap'>
                                <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer" id='get-route-business'><u>Get Route</u> for your Business</a>
                            </div>
                        </div>

                        <div id='footer-top-wrap'>
                            <div id='lloyds-wrap-mobile'>
                                <p id='backed-by-mobile'>backed by</p>
                                <img src={LloydsLogo} alt="lloyd's of london logo" id='lloyds-logo-mobile'/>
                            </div>
                            <div id='get-route-wrap-mobile'>
                                <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer" id='get-route-business-mobile'><u>Get Route</u> for your Business</a>
                            </div>
                        </div>
                        <div id="learn-more-terms-mobile">
                            <p id="terms-and-conditions-mobile">
                                This optional protection is offered to you solely in order to effectuate the shipment of your package(s).
                                Route is the named assured on the Route Policy of which your shipment will be protected on. The cost of adding
                                your shipment to the Route Policy includes compensation paid to Safe Order Solutions, LLC (a licensed insurance
                                agency affiliate of Route), for making this protection available.
                            </p>
                        </div>
                    </div>
                </div>

            </Modal>
            </div>
    );
  }
}

export default RouteWidget;