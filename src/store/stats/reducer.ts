import { ActionCreator, Reducer } from 'redux';
import { IDayStats } from '../reducer';

// TOTAL TIME INCREMENT
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

// PRODUCTIVE TIME INCREMENT
export const STATS_PRODUCTIVE_TIME_INCREMENT =
  'STATS_PRODUCTIVE_TIME_INCREMENT';

export type TIncrementProductiveTime = {
  type: typeof STATS_PRODUCTIVE_TIME_INCREMENT;
  date: string;
  value: number;
};

export const actionIncrementProductiveTime: ActionCreator<TIncrementProductiveTime> =
  (date, value) => ({
    type: STATS_PRODUCTIVE_TIME_INCREMENT,
    date,
    value,
  });

// PAUSE TIME INCREMENT
export const STATS_PAUSE_TIME_INCREMENT = 'STATS_PAUSE_TIME_INCREMENT';

export type TIncrementPauseTime = {
  type: typeof STATS_PAUSE_TIME_INCREMENT;
  date: string;
  value: number;
};

export const actionIncrementPauseTime: ActionCreator<TIncrementPauseTime> = (
  date,
  value
) => ({
  type: STATS_PAUSE_TIME_INCREMENT,
  date,
  value,
});

// STOPS INCREMENT
export const STATS_STOPS_INCREMENT = 'STATS_STOPS_INCREMENT';

export type TIncrementStops = {
  type: typeof STATS_STOPS_INCREMENT;
  date: string;
};

export const actionIncrementStops: ActionCreator<TIncrementStops> = (date) => ({
  type: STATS_STOPS_INCREMENT,
  date,
});

export type TStatsActions =
  | TIncrementTotalTime
  | TIncrementProductiveTime
  | TIncrementPauseTime
  | TIncrementStops;

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

    case STATS_PRODUCTIVE_TIME_INCREMENT:
      if (state.findIndex((dayStats) => dayStats.date === action.date) !== -1) {
        return state.map((dayStats) => {
          if (dayStats.date === action.date) {
            const productiveTime =
              dayStats?.productiveTime !== undefined
                ? dayStats.productiveTime
                : 0;
            return {
              ...dayStats,
              productiveTime: productiveTime + action.value,
            };
          }
          return dayStats;
        });
      }

      return [...state, { date: action.date, productiveTime: action.value }];

    case STATS_PAUSE_TIME_INCREMENT:
      if (state.findIndex((dayStats) => dayStats.date === action.date) !== -1) {
        return state.map((dayStats) => {
          if (dayStats.date === action.date) {
            const pauseTime =
              dayStats?.pauseTime !== undefined ? dayStats.pauseTime : 0;
            return {
              ...dayStats,
              pauseTime: pauseTime + action.value,
            };
          }
          return dayStats;
        });
      }

      return [...state, { date: action.date, pauseTime: action.value }];

    case STATS_STOPS_INCREMENT:
      if (state.findIndex((dayStats) => dayStats.date === action.date) !== -1) {
        return state.map((dayStats) => {
          if (dayStats.date === action.date) {
            const stops =
              dayStats?.stops !== undefined ? dayStats.stops : 0;
            return {
              ...dayStats,
              stops: stops + 1,
            };
          }
          return dayStats;
        });
      }

      return [...state, { date: action.date, stops: 1 }];

    default:
      return state;
  }
};
