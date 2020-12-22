import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCustomer, UpdateCustomer } from "../actions/customerActions";
import CustomerItem from "../components/CustomerItem";
import _ from "lodash";
import "../App.css";
import { Field, Form, Formik } from "formik";
import styled from "styled-components";

const FormikBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 40px auto 0px auto;
  width: 80%;
  justify-content: center;
`;
const CustomerPage = (props) => {
  const customerId = props.match.params.id;
  const dispatch = useDispatch();
  const customerItem = useSelector((state) => state.CustomerItem);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = () => {
    dispatch(GetCustomer(customerId));
  };

  const ShowData = () => {
    if (!_.isEmpty(customerItem.data[customerId])) {
      return (
        <>
          <CustomerItem
            key={customerItem.data[customerId]._id}
            _id={customerItem.data[customerId]._id}
            firstName={customerItem.data[customerId].firstName}
            lastName={customerItem.data[customerId].lastName}
            email={customerItem.data[customerId].email}
            customerSince={customerItem.data[customerId].customerSince}
          ></CustomerItem>
          <FormikBox>
            <Formik
              initialValues={{
                firstName: customerItem.data[customerId].firstName,
                lastName: customerItem.data[customerId].lastName,
                email: customerItem.data[customerId].email,
              }}
              onSubmit={async (values) => {
                dispatch(
                  UpdateCustomer(customerId, {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                  })
                );
              }}
            >
              <Form>
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" placeholder="Jane" />

                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" placeholder="Doe" />

                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </FormikBox>
        </>
      );
    }

    if (customerItem.loading) {
      return <p>loading...</p>;
    }
    if (customerItem.errMsg !== "") {
      return <p>{customerItem.errMsg}</p>;
    }

    return <p>unable get data</p>;
  };

  return <p>{ShowData()}</p>;
};

export default CustomerPage;
