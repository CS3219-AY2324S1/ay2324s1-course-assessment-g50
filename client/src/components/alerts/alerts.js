import React from "react";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts.messages);
  return (
    <>
      {alerts.map((alert, i) => (
        <Alert severity={alert.severity} key={i}>
          {alert.message}
        </Alert>
      ))}
    </>
  );
};

export default Alerts;
