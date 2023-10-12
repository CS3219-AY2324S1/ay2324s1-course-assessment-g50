import { addMessage, removeMessage } from "../reducers/alertSlice";
import { v4 as uuidv4 } from "uuid";

const Severity = {
	error: "error",
	warning: "warning",
	info: "info",
	success: "success",
};

class AlertNotification {
	constructor(severity, msg) {
        this.severity = severity;
        this.msg = msg;
    }

	static error(msg) {
		const severityMessage = `Error: ${msg}`;
		return new AlertNotification(Severity.error, severityMessage);
	}

	static warning(msg) {
		const severityMessage = `Warning: ${msg}`;
		return new AlertNotification(Severity.warning, severityMessage);
	}

	static info(msg) {
		const severityMessage = `Info: ${msg}`;
		return new AlertNotification(Severity.info, severityMessage);
	}

	static success(msg) {
		const severityMessage = `Success: ${msg}`;
		return new AlertNotification(Severity.success, severityMessage);
	}

	notify = (dispatch) => {
		const id = uuidv4();
		const alertData = { id, severity: this.severity, message: this.msg };
		
		dispatch(addMessage(alertData));
		setTimeout(() => {
			dispatch(removeMessage(alertData.id));
		}, 4000);
	}
};

export default AlertNotification;