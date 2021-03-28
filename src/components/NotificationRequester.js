import React from "react";
import {useGlobalContext} from "context";

const NotificationRequester = () => {
	const {
		notificationPermission,
		setNotificationPermission
	} = useGlobalContext();

	const handleButton = () => {
		if (Notification.permission !== 'denied') {
			Notification.requestPermission(permission => {
				setNotificationPermission(Notification.permission);
			});
		}
	};

	if (notificationPermission !== "default" || !("Notification" in window)) {
		return null;
	}

	return (
		<section>
			<p>This app uses browser notifications to alert you.</p>
			<p><strong>Click the button below to allow or deny notifications.</strong></p>

			<div className="btn-container">
				<button className="btn btn-green" onClick={handleButton}>
					Allow/Deny
				</button>
			</div>
		</section>
	);
};

export default NotificationRequester;