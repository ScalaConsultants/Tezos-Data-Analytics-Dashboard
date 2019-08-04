import {
    SET_LOADER_TRUE,
    SET_LOADER_FALSE,
} from "../actions/loader";

const initState = true;
export const loader = (state = initState, action: any): any => {
    switch (action.type) {
        case SET_LOADER_TRUE:
            return true;
        case SET_LOADER_FALSE:
            return false;
        default:
            return state;
    }
};
