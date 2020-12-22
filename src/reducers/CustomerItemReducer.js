const DefaultState = {
  loading: false,
  data: {},
  errMsg: "",
};

const CustomerItemReducer = (state = DefaultState, action) => {
  switch (action.type) {
    case "CUSTOMER_DATA_LOADING":
      return {
        ...state,
        loading: true,
        errMsg: "",
      };
    case "CUSTOMER_DATA_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to get customer",
      };
    case "CUSTOMER_DATA_SUCCES":
      return {
        ...state,
        loading: false,
        errMsg: "",
        data: {
          ...state.data,
          [action.customerId]: action.payload,
        },
      };

    case "CUSTOMER_PATCH_LOADING":
      return {
        ...state,
        loading: true,
        errMsg: "",
      };
    case "CUSTOMER_PATCH_FAIL":
      return {
        ...state,
        loading: false,
        errMsg: "Unable to update customer",
      };
    case "CUSTOMER_PATCH_SUCCES":
      return {
        ...state,
        loading: false,
        errMsg: "",
        data: {
          ...state.data,
          [action.customerId]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default CustomerItemReducer;
