import * as Yup from "yup";
import { useRouter } from 'next/router';
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import React from "react";
import { server } from "../config";

const formContainer = {
    display: "block",
    textAlign: "center",
    // marginLeft: "auto",
    // marginRight: "auto",

}
const formStyling = {
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
    border: "2px dotted",
    borderRadius: "10px",
    padding: "70px"

}

const inputStyle = {
    padding: "5px",
    borderRadius: "10px",
    '--hover-color': 'blue',
    '--hover-opacity': 0.5

}
const errorColor = {
    color: "red"
}

const buttonDelete = {
    backgroundColor: " #f44336",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline - block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
}

const buttonAdd = {
    backgroundColor: "#008CBA",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline - block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
}


const buttonSubmit = {
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline - block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
}

const NewUser = () => {
    const router = useRouter();

    const validateForm = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .required("Email required")
            .email("Enter valid email"),
        gender: Yup.string().required("Gender is required"),
        addr: Yup.array().of(
            Yup.object().shape({
                street: Yup.string(),
                house: Yup.string(),
                city: Yup.string(),
                country: Yup.string(),
            })
        )
    })
    const createUser = async (values) => {
        try {

            const res = await fetch(`${server}/api/users`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (<div>
        <div style={formContainer}>
            <h3> Add A User </h3>
            <hr />
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    gender: "",
                    addr: [{
                        street: "",
                        house: "",
                        city: "",
                        country: "",
                    }
                    ],
                }}
                validationSchema={validateForm}
                onSubmit={values => createUser(values)}
                render={({ values }) => (
                    <Form style={formStyling}>
                        <hr />
                        <h5>First Name :  </h5>
                        <Field placeholder="Enter your first name..." name={`firstName`} style={inputStyle} />
                        <ErrorMessage name={`firstName`} render={msg => <div style={errorColor} >{msg}</div>} />
                        <h5>Last Name : </h5>
                        <Field placeholder="Enter your last name..." name={`lastName`} style={inputStyle} />
                        <ErrorMessage name={`lastName`} render={msg => <div style={errorColor} >{msg}</div>} />
                        <h5>Email : </h5>
                        <Field placeholder="Enter your email ..." name={`email`} style={inputStyle} />
                        <ErrorMessage name={`email`} render={msg => <div style={errorColor} >{msg}</div>} />
                        <h5>Gender : </h5>
                        <Field placeholder="Enter your gender..." name={`gender`} style={inputStyle} />
                        <ErrorMessage name={`gender`} render={msg => <div style={errorColor} >{msg}</div>} />

                        <h5>Address :  </h5>
                        <FieldArray
                            name="addr"
                            render={arrayHelpers => {
                                const addr = values.addr;
                                return (
                                    <div>
                                        {addr && addr.length > 0
                                            ? addr.map((user, index) => (
                                                <div key={index}>
                                                    <Field
                                                        placeholder="Enter your street address..."
                                                        name={`addr.${index}.street`}
                                                        style={inputStyle}
                                                    />
                                                    <br />

                                                    <Field
                                                        placeholder="Enter your house number..."
                                                        name={`addr.${index}.house`}
                                                        style={inputStyle}
                                                    />
                                                    <br />

                                                    <Field
                                                        placeholder="Enter your city..."
                                                        name={`addr.${index}.city`}
                                                        style={inputStyle}
                                                    />
                                                    <br />

                                                    <Field
                                                        placeholder="Enter your country..."
                                                        name={`addr.${index}.country`}
                                                        style={inputStyle}
                                                    />
                                                    <br />

                                                    <button
                                                        style={buttonDelete}
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                    >
                                                        Delete Address
                                                    </button>
                                                    <br />
                                                    <br />
                                                </div>
                                            ))
                                            : null}
                                        <button
                                            style={buttonAdd}
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    street: "",
                                                    house: "",
                                                    city: "",
                                                    country: "",
                                                })
                                            } // insert an empty string at a position
                                        >
                                            Add Other Address
                                        </button>
                                        <br />
                                        <br />
                                        <br />
                                        <div>
                                            <button style={buttonSubmit} type="submit">Form Submit</button>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <hr />
                    </Form>
                )}
            />
        </div>


    </div>)

}

export default NewUser;