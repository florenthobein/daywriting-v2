import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromChallenge from './challenge.reducer';

export interface State {
  challenges: fromChallenge.State;
}

export const reducers: ActionReducerMap<State> = {
  challenges: fromChallenge.challengesReducer,
};

export const selectChallengeState = createFeatureSelector<fromChallenge.State>('challenges');

export const selectChallengeIds = createSelector(
  selectChallengeState,
  fromChallenge.selectChallengeIds
);

export const selectChallengeEntities = createSelector(
  selectChallengeState,
  fromChallenge.selectChallengeEntities
);

export const selectAllChallenges = createSelector(
  selectChallengeState,
  fromChallenge.selectAllChallenges
);

export const selectChallengeTotal = createSelector(
  selectChallengeState,
  fromChallenge.selectChallengeTotal
);

export const selectCurrentChallengeId = createSelector(
  selectChallengeState,
  fromChallenge.getSelectedChallengeId
);

export const selectCurrentChallenge = createSelector(
  selectChallengeEntities,
  selectCurrentChallengeId,
  (challengeEntities, challengeId) => challengeEntities[challengeId]
);
