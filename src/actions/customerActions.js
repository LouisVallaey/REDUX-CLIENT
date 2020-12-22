import axios from "axios";

export const GetCustomerList = () => async (dispatch) => {
  try {
    dispatch({
      type: "CUSTOMERS_LIST_LOADING",
    });

    const res = await axios.get("http://192.168.0.243:3000/customers");

    dispatch({
      type: "CUSTOMER_LIST_SUCCES",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "CUSTOMER_LIST_FAIL",
    });
  }
};

export const GetCustomer = (customer) => async (dispatch) => {
  try {
    dispatch({
      type: "CUSTOMER_DATA_LOADING",
    });

    const res = await axios.get(
      "http://192.168.0.243:3000/customers/" + customer
    );
    dispatch({
      type: "CUSTOMER_DATA_SUCCES",
      payload: res.data,
      customerId: customer,
    });
  } catch (e) {
    dispatch({
      type: "CUSTOMER_DATA_FAIL",
    });
  }
};

export const UpdateCustomer = (customerId, customer) => async (dispatch) => {
  try {
    dispatch({
      type: "CUSTOMER_PATCH_LOADING",
    });

    const res = await axios.patch(
      "http://192.168.0.243:3000/customers/" + customerId,
      customer
    );
    dispatch({
      type: "CUSTOMER_PATCH_SUCCES",
      payload: res.data,
      customerId: customerId,
    });
  } catch (e) {
    dispatch({
      type: "CUSTOMER_PATCH_FAIL",
    });
  }
};

const AddCustomerReq = async (customers) => {
  const results = await customers.map(async (customer) => {
    try {
      const result = await axios.post(
        "http://192.168.0.243:3000/customers",
        customer
      );
      console.log(result.data);
      return result.data;
    } catch (e) {}
  });
  return results;
};

export const AddCustomers = (customers) => async (dispatch) => {
  try {
    dispatch({
      type: "CUSTOMERS_ADD_LOADING",
    });

    const res = await AddCustomerReq(customers);
    dispatch({
      type: "CUSTOMERS_ADD_SUCCES",
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: "CUSTOMERS_ADD_FAIL",
    });
  }
};

export const DeleteCustomers = (ids) => async (dispatch) => {
  try {
    dispatch({
      type: "CUSTOMERS_DELETE_LOADING",
    });

    const results = await ids.map(async (id) => {
      try {
        const result = await axios.delete(
          "http://192.168.0.243:3000/customers/" + id
        );
        return result.data;
      } catch (e) {}
    });

    dispatch({
      type: "CUSTOMERS_DELETE_SUCCES",
      payload: results,
    });
  } catch (e) {
    dispatch({
      type: "CUSTOMERS_DELETE_FAIL",
    });
  }
};
