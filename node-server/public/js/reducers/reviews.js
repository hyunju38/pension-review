import * as ActionsType from '../actions/ActionsCreator';
import * as Constants from '../constants';

const initState = {
    response: []
};

const review = (state = {}, action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case ActionsType.UPDATE_REVIEW:
            return Object.assign({}, state, {
                comment: action.comment,
                score: action.score
            });
        default:
            return state;
    }
};

const reviews = (state = [], action) => {
    switch (action.type) {
        case ActionsType.ADD_REVIEW:
            if (action.status !== Constants.SUCCESS) {
                return state;
            }
            return [
                ...state,
                action.response
            ];
        default:
            return state;
    }
}

const roots = (state = initState, action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case ActionsType.ADD_REVIEW:
            const statusObj = typeof action.status !== 'undefined' ?
                                { status: action.status } :
                                {};
            return Object.assign({}, state, {
                response: reviews(state.response, action)
            }, statusObj);
        case ActionsType.UPDATE_REVIEW:
            reviewsIndex = -1;
            state.forEach((review, index) => {
                if (review._id === action.id) {
                    reviewsIndex = index;
                }
            });

            if (reviewsIndex < 0) {
                return state;
            }

            return [
                ...state.slice(0, reviewsIndex),
                review(state[reviewsIndex], action),
                ...state.slice(reviewsIndex + 1)
            ];
        case ActionsType.REMOVE_REVIEW:
            return state.filter((review) => {
                return review._id !== action.id
            });
        default:
            return state;
    }
};

export default roots;
