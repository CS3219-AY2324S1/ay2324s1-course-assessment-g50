import React, { useState } from "react";
import ReadOnlyRow from "./readonly-row";
import EditRow from "./edit-row";

const ExpandableRow = (props) => {
  const [isReadOnly, setReadOnly] = useState(true);
  let row_num = props.row_num;
  const rowColor = row_num % 2 === 0 ? "#FFFFFF" : "rgb(247 248 250)";

  return (
    <>
      {isReadOnly ? (
        <ReadOnlyRow {...props} setReadOnly={setReadOnly} rowColor={rowColor} />
      ) : (
        <EditRow {...props} setReadOnly={setReadOnly} rowColor={rowColor} />
      )}
    </>
  );
};

export default ExpandableRow;
