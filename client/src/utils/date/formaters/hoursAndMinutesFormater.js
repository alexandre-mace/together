import format from "date-fns/format";
import React from "react";

export default function (date) {
  return <>{format(date, 'HH')}h{format(date, 'mm') !== 0 ? format(date, 'mm') : ''}</>
}
