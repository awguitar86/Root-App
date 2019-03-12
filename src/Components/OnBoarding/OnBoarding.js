import React, { Component } from 'react';
import './onBoarding.css';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../Redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


class OnBoarding extends Component {
    constructor(props){
        super(props);
        this.state = {
            onboarding : false,
            showModal : false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }



    openModal() {
        this.setState({ showModal: true });
      }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        console.log(this.state);
        let modalStyle = {display:'flex', justifyContent: 'center'};
        return(
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
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (OnBoarding);