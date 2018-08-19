import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IChallenge } from '@app/models/challenge';

export enum ChallengeActionTypes {
  SELECT_CHALLENGE = '[Challenge] Select Challenge',
  UNSELECT_CHALLENGE = '[Challenge] Unselect Challenge',
  LOAD_CHALLENGES = '[Challenge] Load Challenges',
  ADD_CHALLENGE = '[Challenge] Add Challenge',
  ADD_CHALLENGES = '[Challenge] Add Challenges',
  UPSERT_CHALLENGE = '[Challenge] Upsert Challenge',
  UPSERT_CHALLENGES = '[Challenge] Upsert Challenges',
  UPDATE_CHALLENGE = '[Challenge] Update Challenge',
  UPDATE_CHALLENGES = '[Challenge] Update Challenges',
  DELETE_CHALLENGE = '[Challenge] Delete Challenge',
  DELETE_CHALLENGES = '[Challenge] Delete Challenges',
  CLEAR_CHALLENGES = '[Challenge] Clear Challenges',
}

export class SelectChallenge implements Action {
  readonly type = ChallengeActionTypes.SELECT_CHALLENGE;

  constructor(public payload: { challenge: IChallenge }) {}
}

export class UnselectChallenge implements Action {
  readonly type = ChallengeActionTypes.UNSELECT_CHALLENGE;

  constructor() {}
}

export class LoadChallenges implements Action {
  readonly type = ChallengeActionTypes.LOAD_CHALLENGES;

  constructor(public payload: { challenges: IChallenge[] }) {
  }
}

export class AddChallenge implements Action {
  readonly type = ChallengeActionTypes.ADD_CHALLENGE;

  constructor(public payload: { challenge: IChallenge }) {}
}

export class UpsertChallenge implements Action {
  readonly type = ChallengeActionTypes.UPSERT_CHALLENGE;

  constructor(public payload: { challenge: IChallenge }) {}
}

export class AddChallenges implements Action {
  readonly type = ChallengeActionTypes.ADD_CHALLENGES;

  constructor(public payload: { challenges: IChallenge[] }) {}
}

export class UpsertChallenges implements Action {
  readonly type = ChallengeActionTypes.UPSERT_CHALLENGES;

  constructor(public payload: { challenges: IChallenge[] }) {}
}

export class UpdateChallenge implements Action {
  readonly type = ChallengeActionTypes.UPDATE_CHALLENGE;

  constructor(public payload: { challenge: Update<IChallenge> }) {}
}

export class UpdateChallenges implements Action {
  readonly type = ChallengeActionTypes.UPDATE_CHALLENGES;

  constructor(public payload: { challenges: Update<IChallenge>[] }) {}
}

export class DeleteChallenge implements Action {
  readonly type = ChallengeActionTypes.DELETE_CHALLENGE;

  constructor(public payload: { id: string }) {}
}

export class DeleteChallenges implements Action {
  readonly type = ChallengeActionTypes.DELETE_CHALLENGES;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearChallenges implements Action {
  readonly type = ChallengeActionTypes.CLEAR_CHALLENGES;
}

export type ChallengeActionsUnion =
  | SelectChallenge
  | UnselectChallenge
  | LoadChallenges
  | AddChallenge
  | UpsertChallenge
  | AddChallenges
  | UpsertChallenges
  | UpdateChallenge
  | UpdateChallenges
  | DeleteChallenge
  | DeleteChallenges
  | ClearChallenges;
