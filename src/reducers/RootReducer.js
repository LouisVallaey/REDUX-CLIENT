import { combineReducers } from "redux";
import CustomerItemReducer from "./CustomerItemReducer";
import CustomerListReducer from "./CustomersListReducer";

const RootReducer = combineReducers({
  CustomerList: CustomerListReducer,
  CustomerItem: CustomerItemReducer,
});

export default RootReducer;
