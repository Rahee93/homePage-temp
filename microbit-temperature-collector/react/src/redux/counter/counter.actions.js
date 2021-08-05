import { CounterActionTypes } from "./counter.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase";

export const fetchCounterStart = () => ({
  type: CounterActionTypes.FETCH_COUNTER_START,
});

export const fetchCounterSuccess = (counter) => ({
  type: CounterActionTypes.FETCH_COUNTER_SUCCESS,
  payload: counter,
});

export const fetchCounterFailure = (errorMessage) => ({
  type: CounterActionTypes.FETCH_COUNTER_FAILURE,
  payload: errorMessage,
});

export const fetchCounterStartAsync = () => {
  return (dispatch) => {
    const counterRef = firestore
      .collection("kmCounter")
      .orderBy("timeStamp", "desc");
    dispatch(fetchCounterStart());
    counterRef
      .get()
      .then((snapshot) => {
        const counters = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCounterSuccess(counters));
      })
      .catch((error) => dispatch(fetchCounterFailure(error.message)));
  };
};
