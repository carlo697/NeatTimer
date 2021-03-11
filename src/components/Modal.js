import React from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import {useGlobalContext} from "../context";

const Modal = () => {
	const {isOpenModal, modalTitle, modalContent, closeModal} = useGlobalContext();

	if (!isOpenModal) {
		return null;
	}

	return (
		<div className="modal-background">
			<div className="modal">
				<div className="modal-title">
					<h3>{modalTitle}</h3>
					<button onClick={closeModal}>
						<AiFillCloseCircle/>
					</button>
				</div>

				<div className="modal-content">
					{modalContent}
				</div>
			</div>
		</div>
	);
};

export default Modal;