import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ChallengeActionsUnion, ChallengeActionTypes } from '@app/actions/challenges';
import { IChallenge } from '@app/models/challenge';
import { DateHelper } from '@app/shared/date.helper';

export interface State extends EntityState<IChallenge> {
  // additional entities state properties
  selectedChallengeId: string | null;
}

export const adapter: EntityAdapter<IChallenge> = createEntityAdapter<IChallenge>({
  sortComparer: (a: IChallenge, b: IChallenge): number => DateHelper.compare(a.datekey, b.datekey)
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedChallengeId: null,
});

export function challengesReducer(state = initialState, action: ChallengeActionsUnion): State {
  switch (action.type) {
    case ChallengeActionTypes.SELECT_CHALLENGE: {
      return { ...state, selectedChallengeId: action.payload.challenge.id };
    }

    case ChallengeActionTypes.UNSELECT_CHALLENGE: {
      return { ...state, selectedChallengeId: null };
    }

    case ChallengeActionTypes.ADD_CHALLENGE: {
      return adapter.addOne(action.payload.challenge, state);
    }

    case ChallengeActionTypes.UPSERT_CHALLENGE: {
      return adapter.upsertOne(action.payload.challenge, state);
    }

    case ChallengeActionTypes.ADD_CHALLENGES: {
      return adapter.addMany(action.payload.challenges, state);
    }

    case ChallengeActionTypes.UPSERT_CHALLENGES: {
      return adapter.upsertMany(action.payload.challenges, state);
    }

    case ChallengeActionTypes.UPDATE_CHALLENGE: {
      return adapter.updateOne(action.payload.challenge, state);
    }

    case ChallengeActionTypes.UPDATE_CHALLENGES: {
      return adapter.updateMany(action.payload.challenges, state);
    }

    case ChallengeActionTypes.DELETE_CHALLENGE: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ChallengeActionTypes.DELETE_CHALLENGES: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ChallengeActionTypes.LOAD_CHALLENGES: {
      return adapter.addAll(action.payload.challenges, state);
    }

    case ChallengeActionTypes.CLEAR_CHALLENGES: {
      return adapter.removeAll({ ...state, selectedChallengeId: null });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedChallengeId = (state: State) => state.selectedChallengeId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectChallengeIds = selectIds;
export const selectChallengeEntities = selectEntities;
export const selectAllChallenges = selectAll;
export const selectChallengeTotal = selectTotal;
