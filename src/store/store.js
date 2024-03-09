import { legacy_createStore as createStore } from "redux";
import { myReducer } from "../reducers/Reducer";
import { myState } from "../states/State";

const store = createStore(myReducer, myState);

export default store;
