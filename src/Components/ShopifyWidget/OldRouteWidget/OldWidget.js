<div id="widget-bottom">
<a id="widget-powered-by" href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer">
    <p>Powered by</p>
    <img src={RouteLogoWhite} alt="route logo"/>
</a>
<div id="widget-more-info">
    <button id="routehelp" onClick={this.openModal}>
        <img src={InfoIcon} alt="info icon"/>
    </button>
</div>
</div>

<div id="protect-from">
    <p id='fully-protect-from'>Fully Protect from Lost &bull; Damaged &bull; Stolen</p>
</div>

<Modal
    isOpen={this.state.showModal}
    onRequestClose={this.closeModal}
    contentLabel="Example Modal"
    modalStyle={modalStyle}
    className="route-modal"
    overlayClassName="route-modal-overlay"
    ariaHideApp={false}
    >

            <div id="dialog">
                <div id="close-wrap"><span id="close-route-modal" onClick={this.closeModal}>&times;</span></div>
                <div id="powered-container">
                    <div id="powered-wrapper">
                        <p>powered by</p>
                        <a href="https://www.routeapp.io/" target="_blank" rel="noopener noreferrer"><img src={RouteLogo} alt="route logo"/></a>
                    </div>
                </div>
                <div id="route-divider"></div>
                <div id="learn-more-header">
                    <h3>Never deal with shipping companies<br/>over lost, broken, or stolen goods.</h3>
                    <p>Trusted by Over 300,000 Customers</p>
                </div>
                <div id="description-box" data-name="description">
                    <div id="description-wrapper">
                        <h3 id="description-header"> Bulletproof your shipment from: </h3>
                        <div id="description-content">
                            <div id="lost">
                                <img id="lost-img" src={Lost} alt='lost img'/>
                                <div id="description-lost">
                                    <h4>LOST</h4>
                                    <p>Package is lost in transit.</p>
                                </div>
                            </div>
                            <div id="damage">
                                <img id="damage-img" src={Damage} alt='damage img'/>
                                <div id="description-damage">
                                    <h4>DAMAGE</h4>
                                    <p>Item is received damaged prior to opening.</p>
                                </div>
                            </div>
                            <div id="theft">
                                <img  id="theft-img" src={Theft} alt='theft img'/>
                                <div id="description-theft">
                                    <h4>THEFT / PORCH PIRATING</h4>
                                    <p>Item is stolen after delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="one-click">
                    <div id="one-click-icon">
                        <img src={OneClick} alt='one click img'/>
                        <h3>ONE-CLICK</h3>
                    </div>
                    <h4>Instantly protect your package.</h4>
                </div>
                <div id="learn-more-terms">
                    <p id="terms-and-conditions">
                        This protection has been offered to you solely in order to effectuate the shipment of your package(s). Route is the only named assured on the Route Policy.
                        While you are not a named assured under the policy, your shipment is protected. Your election below to add your package to the Route Policy is entirely optional.
                        You have the option of obtaining protection from an alternative source or not at all. The cost of adding your shipment to the Route Policy includes compensation
                        paid to Safe Order Solutions, LLC (a licensed insurance agency affiliate of Route), for making this protection available. \n
                    </p>
                </div>
                <img id="route_certified_image" src={Certified} alt='certified img'/>
            </div>
            </Modal>

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

.route-modal {
    width: 550px;
    border: none;
    outline: none;
    // position: absolute;
    // top: 40px;
    // left: 40px;
    // right: 40px;
    // bottom: 40px;
  }

.route-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000030;
    display: flex;
    justify-content: center;
    align-items: center;
}

#dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 13px;
    width: 550px;
    background-color: white;
    z-index: inherit;
}

#close-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
#close-route-modal {
    width: 35px;
    height: 35px;
    font-size: 26pt;
    color: grey;
    margin-right: 10px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
}
#close-route-modal:hover {
    color: #5EC8DB;
}
#close-route-modal:active {
    font-size: 24pt;
}

#powered-container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 10px;
}