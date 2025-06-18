import { memo } from "react";

export const IndexCell = memo(({ value, record, CellClassName }) => {
    console.log("Rendering IndexCell:", record, value);
    return <span className={CellClassName}>{value}</span>;
  });
  