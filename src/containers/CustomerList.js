import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  GetCustomerList,
  AddCustomers,
  DeleteCustomers,
} from "../actions/customerActions";
import CustomerItem from "../components/CustomerItem";
import CSVReader from "react-csv-reader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const CustomerTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0px auto 0px auto;
`;

const FormikBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px auto 0px auto;
  justify-content: center;
`;

const CustomerHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto 0px auto;
`;

const CsvBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 40px auto 0px auto;

  p {
    margin-right: 10px;
  }
`;

const CustomerAddButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 40px auto 0px auto;
  button {
    cursor: pointer;
    background-color: #1c7293;
    color: white;
    width: 100%;
    height: 40px;
    margin: 20px;
    border: none;
    border-radius: 5px;
    outline: none;
    &:hover {
      background-color: #1f8db8;
    }
  }
`;

const CustomerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.CustomerList);

  const [addone, setaddone] = useState(false);
  const [addmultiple, setaddmultiple] = useState(false);
  const [deletecustomers, setdeletecustomer] = useState(false);

  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.replace(/\W/g, "_"),
  };

  const handleCSV = async (data, fileInfo) => {
    await dispatch(AddCustomers(data));
    dispatch(GetCustomerList());
  };

  const handleCustomerClick = (userid) => {
    history.push("/customer/" + userid);
  };
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    dispatch(GetCustomerList());
  };

  const deleteAllCustomers = async () => {
    const ids = customerList.data.map(({ _id }) => {
      return _id;
    });
    dispatch(DeleteCustomers(ids));
  };

  const CustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const ShowData = () => {
    if (!_.isEmpty(customerList.data)) {
      return (
        <>
          <CustomerHeader>
            <CustomerItem
              key={"header"}
              _id={"ID"}
              firstName={"firstName"}
              lastName={"lastName"}
              email={"email"}
              customerSince={"customerSince"}
            ></CustomerItem>
          </CustomerHeader>
          <CustomerTable>
            {customerList.data.map(
              ({ _id, firstName, lastName, email, customerSince }) => (
                <CustomerItem
                  handleCustomerClick={handleCustomerClick}
                  key={_id}
                  _id={_id}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  customerSince={customerSince}
                ></CustomerItem>
              )
            )}
          </CustomerTable>
        </>
      );
    }

    if (customerList.loading) {
      return <p>loading...</p>;
    }
    if (customerList.errMsg !== "") {
      return <p>{customerList.errMsg}</p>;
    }
    return <p>No customers</p>;
  };

  return (
    <>
      {!addmultiple && !addone && !deletecustomers && (
        <CustomerAddButtons>
          <button onClick={() => setaddone(true)}>Add Customer</button>
          <button onClick={() => setaddmultiple(true)}>Add Customers</button>
          <button onClick={deleteAllCustomers}>Delete all</button>
        </CustomerAddButtons>
      )}

      {addmultiple && (
        <>
          <CsvBox>
            <p>Upload .CSV file:</p>
            <CSVReader
              cssClass="csv-reader-input"
              onFileLoaded={handleCSV}
              parserOptions={parseOptions}
              inputId="csvId"
              inputStyle={{ color: "black" }}
            />
          </CsvBox>
        </>
      )}
      {addone && (
        <>
          <FormikBox>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
              }}
              validationSchema={CustomerSchema}
              onSubmit={async (values) => {
                await dispatch(
                  AddCustomers([
                    {
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                    },
                  ])
                );
                dispatch(GetCustomerList());
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" />

                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" />

                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </FormikBox>
        </>
      )}
      {ShowData()}
    </>
  );
};

export default CustomerList;
