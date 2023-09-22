import { addMessage, removeMessage } from "../reducers/alertSlice";
import { v4 as uuidv4 } from "uuid";

const Severity = {
  error: "error",
  warning: "warning",
  info: "info",
  success: "success",
};

const notify = (dispatch, alertData) => {
  dispatch(addMessage(alertData));
  setTimeout(() => {
    dispatch(removeMessage(alertData.id));
  }, 2000);
};

export const sendError = (dispatch, message) => {
  const id = uuidv4();
  const severity = Severity.error;

  const alertData = { id, severity, message };
  notify(dispatch, alertData);
};
