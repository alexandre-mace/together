import isSameDay from "../../../utils/agenda/isSameDay";
import React from "react";

const AgendaDay = (props) => (
  <>
    {(!props.events[props.index - 1] || props.events[props.index - 1] && !isSameDay(props.events[props.index - 1].date, props.event.date)) &&
    <div className={"col-12 text-center mt-3"}>
      <span>
        {
          (new Date(props.event.date))
            .toLocaleDateString('fr-FR', {weekday: "long", month: "long", day: "numeric"})
            .toUpperCase()
        }
      </span>
    </div>
    }
  </>
);

export default AgendaDay;
