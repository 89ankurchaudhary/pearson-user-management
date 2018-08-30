import React from "react"
import Modal from 'react-modal';
import { CUSTOM_STYLES } from './Constants';

export class Dialog extends React.PureComponent {
    render() {
        const {
            isOpen,
            onDeleteUser,
            onCloseDialog,
        } = this.props;

        return (
            <Modal
                isOpen={isOpen}
                style={CUSTOM_STYLES}
            >
                <div className="dialog">
                    <div className="dialog-body">
                        {"Do you want to delete this user?"}
                    </div>
                    <div className="dialog-actions">
                        <button
                            className="btn btn--primary"
                            onClick={onDeleteUser}
                        >
                            Yes
                        </button>
                        <button 
                            className="btn btn--secondary"
                            onClick={onCloseDialog}
                        >
                            No
                        </button>
                </div>
                </div>
            </Modal>
        );
    }
}
