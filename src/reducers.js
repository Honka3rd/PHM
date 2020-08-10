import { combineReducers } from "redux";
import { runningDataContainerOffset, VERIFY_LOGIN_INFO } from "./main";
import {
	rightConfigList,
	runningDataColor,
	runningDataConverter,
	runningDataDType,
	runningDataRoute,
	runningDataTrain,
	runningDataSet,
	runningDataFields,
	selectedRunningFields,
	runningMeta,
	cardItemId
} from "./runningDataObservation/reducers";
const verified = (state = false, action) => {
	if (action.type === VERIFY_LOGIN_INFO) {
		return action.payload;
	}

	return state;
};

export default combineReducers({
	runningDataContainerOffset,
	verified,
	rightConfigList,
	runningDataColor,
	runningDataConverter,
	runningDataDType,
	runningDataRoute,
	runningDataTrain,
	runningDataSet,
	runningDataFields,
	selectedRunningFields,
	runningMeta,
	cardItemId
});
