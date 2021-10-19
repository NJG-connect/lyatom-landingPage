import React, { useCallback, useState } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { UserInfoType } from "./types/UserInfoContext";
import { UserInfoContext } from "./contexts/UserInfoContext";

const initialUserContext = {
  emailOrPhone: "",
  isSubmitting: false,
};

function App() {
  const [userContext, setUserContext] =
    useState<UserInfoType>(initialUserContext);

  const updateUserContext = useCallback(
    (values) => {
      setUserContext({ ...userContext, ...values });
    },
    [userContext]
  );

  return (
    <UserInfoContext.Provider
      value={{ userContext, setUserContext: updateUserContext }}
    >
      <HomeScreen />
    </UserInfoContext.Provider>
  );
}

export default App;
