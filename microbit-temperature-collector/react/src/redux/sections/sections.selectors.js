import { createSelector } from "reselect";

const selectState = (state) => state.sections;

export const selectSections = createSelector(
  selectState,
  (sections) => sections.sections
);


export const selectImageSlides = createSelector(
  selectSections,
  (sections) => sections[0]
);

export const selectMainContent = createSelector(
  selectSections,
  (sections) => sections[1]
);

// export const selectSectionsFetching = createSelector(
//     selectSection,
//     section =>  section
// )
