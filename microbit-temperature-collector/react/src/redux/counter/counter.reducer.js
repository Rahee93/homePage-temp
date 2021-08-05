import { CounterActionTypes } from "./counter.types";

const INITIAL_STATE = {
  counter: [],
  isFetching: false,
  errorMessage: undefined,
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CounterActionTypes.FETCH_COUNTER_START:
      return {
        ...state,
        isFetching: true,
      };
    case CounterActionTypes.FETCH_COUNTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        counter: action.payload,
      };
    case CounterActionTypes.FETCH_COUNTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
