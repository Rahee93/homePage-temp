import { createSelector } from "reselect";

const selectState = (state) => state.sections;

export const selectSections = createSelector(
  selectState,
  (sections) => sections.sections
);



export const selectAboutUs = createSelector(
  selectSections,
  (sections) => sections[0]
);



// export const selectSectionsFetching = createSelector(
//     selectSection,
//     section =>  section
// )
