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
	FOCUS_CARD_ITEM,
} from "./constants";

export const addNewRunningDataConfigItem = (item) => {
	return {
		type: ADD_NEW_CONFIG_ITEM_RUNNING_DATA,
		payload: item,
	};
};

export const clearRunningDataItems = () => {
	return {
		type: CLEAR_CONFIG_ITEMs_RUNNING_DATA,
	};
};

export const removeSingleItemRunningData = (item) => {
	return {
		type: REMOVE_SINGLE_ITEM_RUNNING_DATA,
		payload: item,
	};
};

export const selectRunningDataColor = (color) => {
	return {
		type: SELECT_RUNNING_DATA_COLOR,
		payload: color,
	};
};

export const selectRunningDataConverter = (converter) => {
	return {
		type: SELECT_RUNNING_DATA_COVERTER,
		payload: converter,
	};
};

export const selectRunningDataDType = (dtype) => {
	return {
		type: SELECT_RUNNING_DATA_DTYPE,
		payload: dtype,
	};
};

export const selectRunningDataRoute = (route) => {
	return {
		type: SELECT_RUNNING_DATA_ROUTE,
		payload: route,
	};
};

export const selectRunningDataTrain = (train) => {
	return {
		type: SELECT_RUNNING_DATA_TRAIN,
		payload: train,
	};
};

export const clearRunningDataColor = () => {
	return {
		type: CLEAR_RUNNING_DATA_COLOR,
	};
};

export const clearRunningDataConverter = () => {
	return {
		type: CLEAR_RUNNING_DATA_COVERTER,
	};
};

export const clearRunningDataDType = () => {
	return {
		type: CLEAR_RUNNING_DATA_DTYPE,
	};
};

export const clearRunningDataRoute = () => {
	return {
		type: CLEAR_RUNNING_DATA_ROUTE,
	};
};

export const clearRunningDataTrain = () => {
	return {
		type: CLEAR_RUNNING_DATA_TRAIN,
	};
};

export const loadRunningData = (data) => {
	return {
		type: LOAD_ROUNNING_DATA,
		payload: data,
	};
};

export const loadSelectedRunningFields = (fields) => {
	return {
		type: LOAD_SELECTED_ROUNNING_FIELDS,
		payload: fields,
	};
};

export const loadRunningMeta = (meta) => {
	return {
		type: LOAD_SELECTED_ROUNNING_META,
		payload: meta,
	};
};

export const getRunningDataFields = (fields) => {
	return {
		type: GET_RUNNING_DATA_FIELDS,
		payload: fields,
	};
};

export const focusCardItem = (cardId) => {
	return {
		type: FOCUS_CARD_ITEM,
		payload: cardId,
	};
};
