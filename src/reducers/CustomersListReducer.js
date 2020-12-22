const DefaultState = {
  loading: false,
  data: [],
  errMsg: "",
};

const CustomerListReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "CUSTOMERS_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errMsg: "",
      };
    case "CUSTOMER_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to get customers",
      };
    case "CUSTOMER_LIST_SUCCES":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errMsg: "",
      };

    case "CUSTOMERS_ADD_LOADING":
      return {
        ...state,
        loading: true,
        errMsg: "",
      };
    case "CUSTOMERS_ADD_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to add customers",
      };
    case "CUSTOMERS_ADD_SUCCES":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        errMsg: "",
      };

    case "CUSTOMERS_DELETE_LOADING":
      return {
        ...state,
        loading: true,
        errMsg: "",
      };
    case "CUSTOMERS_DELETE_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to delete customers",
      };
    case "CUSTOMERS_DELETE_SUCCES":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        errMsg: "",
      };

    default:
      return state;
  }
};

export default CustomerListReducer;
