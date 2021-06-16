import React, { useEffect, useState } from "react";
import StorageContext from "./storage-context";
import { find } from "lodash";

function LocalStorageProvider(props) {
  const [launches, setLaunches] = useState([]);
  const [launchPads, setLaunchPads] = useState([]);

  useEffect(() => {
    const launches = JSON.parse(localStorage.getItem("launches")) || [];
    const launchPads = JSON.parse(localStorage.getItem("launchPads")) || [];
    setLaunchPads(launchPads);
    setLaunches(launches);
  }, []);

  useEffect(() => {
    localStorage.setItem("launchPads", JSON.stringify(launchPads));
  }, [launchPads]);

  useEffect(() => {
    localStorage.setItem("launches", JSON.stringify(launches));
  }, [launches]);

  const storeLaunchItem = (item) => {
    const items = getUpdatedList(launches, item, "flight_number");
    setLaunches(items);
  };

  const storeLaunchPad = (item) => {
    const items = getUpdatedList(launchPads, item, "id");
    setLaunchPads(items);
  };

  const isStored = (source, item) => find(source, item);
  const isLaunchStored = (item) => isStored(launches, item);
  const isLaunchPadStored = (item) => isStored(launchPads, item);

  const getUpdatedList = (source, item, identifier) => {
    let updatedList = [];
    if (isStored(source, item)) {
      updatedList = source.filter((i) => i[identifier] !== item[identifier]);
    } else {
      updatedList = [...source, item];
    }
    return updatedList;
  };

  return (
    <StorageContext.Provider
      value={{
        launches,
        launchPads,
        isLaunchStored,
        isLaunchPadStored,
        storeLaunchPad,
        storeLaunchItem,
      }}
    >
      {props.children}
    </StorageContext.Provider>
  );
}

export default LocalStorageProvider;
