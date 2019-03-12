import React, {Component} from 'react';
import Modal from 'react-modal';

class exampleModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div >
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Edit"
                    modalStyle={modalStyle}
                    className="edit-modal"
                    overlayClassName="edit-modal-overlay"
                    ariaHideApp={false}
                >
                    <div className='modal-wrap'>
                        <h2>Edit</h2>
                        <input />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default exampleModal;


