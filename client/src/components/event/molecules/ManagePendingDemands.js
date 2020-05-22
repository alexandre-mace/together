import React, {useContext} from "react";
import sortByDateDesc from "../../../utils/agenda/sorters/sortByDateDesc";
import AgendaDay from "../atoms/AgendaDay";
import AppContext from "../../../config/context/appContext";
import ManagePendingDemandCard from "../atoms/ManagePendingDemandCard";

const ManagePendingDemands = (props) => {
  const appContext = useContext(AppContext);

  return (
    <div className="container">
      <div className="row">
        {props.events && sortByDateDesc(props.events).map((event, index) => (
          <React.Fragment key={index}>
            <AgendaDay
              events={props.events}
              event={event}
              index={index}
            />
            <div className={"col-12 mt-3"} key={index}>
              <ManagePendingDemandCard
                event={event}
                history={props.history}
                handleMapView={appContext.handleMapView}
                refuseDemand={props.refuseDemand}
                acceptDemand={props.acceptDemand}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};
export default ManagePendingDemands
