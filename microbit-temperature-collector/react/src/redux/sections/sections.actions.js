import { SectionActionTypes } from "./sections.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase";

// USING THUNK: ACTION CAN RETURN a FUNCTION
export const fetchSectionsStart = () => ({
  type: SectionActionTypes.FETCH_SECTIONS_START,
});

export const fetchSectionsSuccess = (collectionsMap) => ({
  type: SectionActionTypes.FETCH_SECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchSectionsFailure = (errorMessage) => ({
  type: SectionActionTypes.FETCH_SECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchSectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("sections-temperature-collector"); // 1. create a collection ref
    dispatch(fetchSectionsStart()); // 2. dispatch an action (which will switch isFetching: true)

    // 3. begin async request
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchSectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchSectionsFailure(error.message)));
  };
};
