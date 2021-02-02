import FilterInfoTypes from './filter-info.types';

const INITIAL_STATE = {
    from_state: "",
    to_date: "",
    status: "",
    search_text: ""
}
const filterInfoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FilterInfoTypes.SET_FILTER_FIELDS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return {
                ...state
            };
    }
};

export default filterInfoReducer;