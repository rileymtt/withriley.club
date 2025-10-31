import React from "react";

type AppState = {
  account: TBinanceBalance | null;
  positions: TBinancePosition[];
  orders: TBinanceOrder[];
};

const initialState: AppState = {
  account: null,
  positions: [],
  orders: [],
};

type TAction = "UPDATE";

type Action = {
  type: TAction;
  payload: any;
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

function reducer(state: AppState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE":
      return { ...state, ...payload };
    default:
      return state;
  }
}

export const Provider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const contextValue = { state, dispatch };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

function useState() {
  const { state } = React.useContext(AppContext)!;
  return state;
}

function useAction() {
  const { dispatch, state } = React.useContext(AppContext)!;

  const update = (payload: Partial<AppState>) => {
    dispatch({ type: "UPDATE", payload });
  };

  return {
    update,
  };
}

export const MainProvider = {
  Provider,
  useState,
  useAction,
};
