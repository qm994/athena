import FilterInfoTypes from './filter-info.types';

export const setFilterInfo = (filter_info) => {
    return dispatch => {
        dispatch({
            type: FilterInfoTypes.SET_FILTER_FIELDS,
            payload: filter_info
        })
    }
};
