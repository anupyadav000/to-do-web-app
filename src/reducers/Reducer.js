import { myState } from "../states/State";
export const myReducer = (state = myState, action) => {
  console.log(action);
  switch (action.type) {
    case "SetList":
      return {
        toDos: action.list,
      };
    default:
      return state;
  }
};
