import React from "react";

const AppContext = React.createContext({
  userPosition: {},
  setUserPosition: () => {}
});

export default AppContext
