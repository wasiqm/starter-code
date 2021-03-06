import { LOAD_DATA, CLEAR_DATA, LOAD_SCORES, LOAD_LEADERBOARDS } from '../types';

/**
 * Actions should be as light weight as possible. No asynchronous processes should be started in actions.
 * This is why the data fetching was done prior to loading the data to the global store.
 * 
 * "uploads" the data taken as an input into the datastore
 */
export const loadData = data => ({
  type: LOAD_DATA,
  payload: data
});

/**
 * clears the existing data in the dataStore
 */
export const clearData = () => ({
  type: CLEAR_DATA
});

export const loadScores = data => ({
  type: LOAD_SCORES,
  payload: data
});

export const loadLeaderboards = data => ({
  type: LOAD_LEADERBOARDS,
  payload: data
});