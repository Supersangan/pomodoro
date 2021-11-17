import { ActionCreator, Reducer } from 'redux';
import { IDayStats } from '../reducer';

// SET MODE
export const STATS_TOTAL_TIME_INCREMENT = 'STATS_TOTAL_TIME_INCREMENT';

export type TIncrementTotalTime = {
  type: typeof STATS_TOTAL_TIME_INCREMENT;
  date: string;
  value: number;
};

export const actionIncrementTotalTime: ActionCreator<TIncrementTotalTime> = (
  date,
  value
) => ({
  type: STATS_TOTAL_TIME_INCREMENT,
  date,
  value,
});

export type TStatsActions = TIncrementTotalTime;

export const statsReducer: Reducer<IDayStats[] | undefined, TStatsActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case STATS_TOTAL_TIME_INCREMENT:
      if (state.findIndex((dayStats) => dayStats.date === action.date) !== -1) {
        return state.map((dayStats) => {
          if (dayStats.date === action.date) {
            const totalTime =
              dayStats?.totalTime !== undefined ? dayStats.totalTime : 0;
            return { ...dayStats, totalTime: totalTime + action.value };
          }
          return dayStats;
        });
      }

      return [...state, { date: action.date, totalTime: action.value }];

    default:
      return state;
  }
};
