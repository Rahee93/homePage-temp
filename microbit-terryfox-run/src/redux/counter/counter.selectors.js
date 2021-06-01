import { createSelector } from "reselect";

const selectCounter = (state) => state.counter;

export const selectkmCounter = createSelector(selectCounter, (counter) =>
  counter.counter.reduce(function (acc, obj) {
    return acc + obj.counter;
  }, 0)
);

export const selectNewestTimeUpdates = createSelector(
  selectCounter,
  (counter) => {
    return counter.counter.slice(0, 5).map((t) => {
      var utcSeconds = t.timeStamp.seconds;
      var date = new Date(0);
      date.setUTCSeconds(utcSeconds);
      var formattedDate = date.toLocaleString();
      return formattedDate;
    });
  }
);
