import React, { useState } from "react";
import ReadOnlyRow from "./readonly-row";
import EditRow from "./edit-row";
import NonAdminRow from "./nonadmin-row.js";
import { useSelector } from "react-redux";

const ExpandableRow = (props) => {
  const [isReadOnly, setReadOnly] = useState(true);
  let row_num = props.row_num;
  const rowColor = row_num % 2 === 1 ? "#FFFFFF" : "rgb(247 248 250)";
  const userRole = useSelector(state => state.currentUser.userRole);

  return (
    <>
      { userRole === 'admin' ?
        isReadOnly ? (
          <ReadOnlyRow {...props} setReadOnly={setReadOnly} rowColor={rowColor} />
        ) : (
          <EditRow {...props} setReadOnly={setReadOnly} rowColor={rowColor} />
        ) 
        : <NonAdminRow {...props} rowColor={rowColor} />
        }
    </>
  );
};

export default ExpandableRow;
