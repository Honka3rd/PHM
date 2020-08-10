import {
	ADD_NEW_CONFIG_ITEM_RUNNING_DATA,
	CLEAR_CONFIG_ITEMs_RUNNING_DATA,
	REMOVE_SINGLE_ITEM_RUNNING_DATA,
    SELECT_RUNNING_DATA_COLOR,
	SELECT_RUNNING_DATA_COVERTER,
	SELECT_RUNNING_DATA_DTYPE,
	SELECT_RUNNING_DATA_ROUTE,
	SELECT_RUNNING_DATA_TRAIN,
	CLEAR_RUNNING_DATA_COLOR,
	CLEAR_RUNNING_DATA_COVERTER,
	CLEAR_RUNNING_DATA_DTYPE,
	CLEAR_RUNNING_DATA_ROUTE,
	CLEAR_RUNNING_DATA_TRAIN,
	LOAD_ROUNNING_DATA,
	GET_RUNNING_DATA_FIELDS,
	LOAD_SELECTED_ROUNNING_FIELDS,
    LOAD_SELECTED_ROUNNING_META,
    FOCUS_CARD_ITEM
} from "./constants";

export const rightConfigList = (state = [], action) => {
	if (action.type === ADD_NEW_CONFIG_ITEM_RUNNING_DATA) {
		return [...state, action.payload];
	}

	if (action.type === CLEAR_CONFIG_ITEMs_RUNNING_DATA) {
		return [];
	}

	if (action.type === REMOVE_SINGLE_ITEM_RUNNING_DATA) {
		state.splice(state.indexOf(action.payload), 1);
		return [...state];
	}

	return state;
};

export const runningDataFields = (state = [], action) => {
	if (action.type === GET_RUNNING_DATA_FIELDS) {
		return [...action.payload];
	}
	return state;
};

export const runningDataDType = (state = [], action) => {
	if (action.type === SELECT_RUNNING_DATA_DTYPE) {
		return [...action.payload];
	}

	if (action.type === CLEAR_RUNNING_DATA_DTYPE) {
		return [];
	}

	return state;
};

export const runningDataColor = (state = [], action) => {
	if (action.type === SELECT_RUNNING_DATA_COLOR) {
		return [...action.payload];
	}

	if (action.type === CLEAR_RUNNING_DATA_COLOR) {
		return [];
	}

	return state;
};

export const runningDataConverter = (state = null, action) => {
	if (action.type === SELECT_RUNNING_DATA_COVERTER) {
		return action.payload;
	}

	if (action.type === CLEAR_RUNNING_DATA_COVERTER) {
		return null;
	}

	return state;
};

export const runningDataRoute = (state = null, action) => {
	if (action.type === SELECT_RUNNING_DATA_ROUTE) {
		return action.payload;
	}

	if (action.type === CLEAR_RUNNING_DATA_ROUTE) {
		return null;
	}

	return state;
};

export const runningDataTrain = (state = null, action) => {
	if (action.type === SELECT_RUNNING_DATA_TRAIN) {
		return action.payload;
	}

	if (action.type === CLEAR_RUNNING_DATA_TRAIN) {
		return null;
	}

	return state;
};

export const runningDataSet = (state = [], action) => {
	if (action.type === LOAD_ROUNNING_DATA) {
		return [...action.payload];
	}

	return state;
};

export const selectedRunningFields = (state = [], action) => {
	if (action.type === LOAD_SELECTED_ROUNNING_FIELDS) {
		return [...action.payload];
	}

	return state;
};

export const runningMeta = (state = null, action) => {
	if (action.type === LOAD_SELECTED_ROUNNING_META) {
		if (!action.payload) {
			return null;
		}

		return { ...action.payload };
	}

	return state;
};

export const cardItemId = (state = null, action) => {
    if(action.type === FOCUS_CARD_ITEM) {
        return action.payload;
    }

    return state;
}