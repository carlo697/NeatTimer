import React from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import {useGlobalContext} from "../context";

const Modal = () => {
	const {
		closeModal,
		modal: {
			isOpen,
			title,
			content,
		}
	} = useGlobalContext();

	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal-background">
			<div className="modal">
				<div className="modal-title">
					<h3>{title}</h3>
					<button onClick={closeModal}>
						<AiFillCloseCircle/>
					</button>
				</div>

				<div className="modal-content">
					{content}
				</div>
			</div>
		</div>
	);
};

export default Modal;