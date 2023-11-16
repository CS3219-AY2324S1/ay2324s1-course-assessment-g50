import React from "react";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts.messages);
  return (
    <div style={{ margin: "10px", zIndex: 1300, position: "fixed" }}>
      {alerts.map((alert, i) => (
        <Alert severity={alert.severity} key={i} sx={{
          margin: "10px",
          zIndex: 1400,
          position: 'fixed',
          top: `${i * 60}px`, // Each alert is offset by 60px times its index
          right: '10px',
        }}>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default Alerts;
