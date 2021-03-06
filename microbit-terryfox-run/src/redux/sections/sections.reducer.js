import { SectionActionTypes } from "./sections.types";

const INITIAL_STATE = {
  sections: [],
  isFetching: false,
  errorMessage: undefined, // or empty string
};

const sectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SectionActionTypes.FETCH_SECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case SectionActionTypes.FETCH_SECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sections: action.payload,
      };
    case SectionActionTypes.FETCH_SECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sectionReducer;
