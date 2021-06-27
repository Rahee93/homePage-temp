import { createSelector } from "reselect";

const selectState = (state) => state.sections;

export const selectSections = createSelector(
  selectState,
  (sections) => sections.sections
);

export const selectSteps = createSelector(
  selectSections,
  (sections) => sections[0]
);

export const selectGallery = createSelector(
  selectSections,
  (sections) => sections[1]
);

export const selectImageSlides = createSelector(
  selectSections,
  (sections) => sections[2]
);

export const selectFeatures = createSelector(
  selectSections,
  (sections) => sections[3]
);

export const selectAboutUs = createSelector(
  selectSections,
  (sections) => sections[5]
);

export const selectMapJournal = createSelector(
  selectSections,
  (sections) => sections[4]
);

// export const selectSectionsFetching = createSelector(
//     selectSection,
//     section =>  section
// )
