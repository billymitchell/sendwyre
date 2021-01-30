import React, { useState, useEffect } from "react";
import "../../src/styles.css"

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
// import { CheckboxWithLabel } from 'formik-material-ui';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

let exchangeRate = "Exchange Rate"
let transactionFee = "Transaction Fee"
let networkFee = "Network Fee"


function SignupForm() {

    const [emailState, setEmailState] = useState(false);
    const [phoneState, setPhoneState] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState("")
    const [selectedCurrency, setSelectedCurrency] = useState("")
    const [currencyAmount, setCurrencyAmount] = useState("")

    let total = `${currencyAmount} + ${networkFee} + ${transactionFee}`


    useEffect(() => {
        console.log("useEffect Called");
    }, [])

    const DisplayEmail = () => {
        if (emailState === true) {
            return (
                <FormControl>
                    <Field
                        className="form-textarea"
                        label="Email"
                        name="email"
                        type="email"
                        component={TextField} />
                </FormControl>
            );
        } else {
            return (
                <></>
            );
        }
    }
    const DisplayPhone = () => {
        if (phoneState === true) {
            return (
                <FormControl>
                    <Field
                        className="form-textarea"
                        label="Phone"
                        name="phone"
                        type="phone"
                        component={TextField} />
                </FormControl>
            );
        } else {
            return (
                <></>
            );
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    // selectedCurrency: selectedCurrency,
                    // currencyAmount: "",
                    // selectedCrypto: selectedCrypto,
                    cryptoAmount: "",
                    cryptoAddress: "",
                    cardNumber: "",
                    name: "",
                    expMonth: "",
                    expYear: "",
                    cvv: "",
                    address: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    zip: "",
                    // emailCheckbox: emailState,
                    // phoneCheckbox: phoneState,
                    Authorization: false,
                }}
                validationSchema={
                    Yup.object({
                        selectedCurrency: Yup.string().required("Required"),
                        currencyAmount: Yup.number().required("Required").positive("Positive Number Required"),
                        crypto: Yup.string().required("Required"),
                        cryptoAmount: Yup.number().required("Required").positive("Positive Number Required"),
                        cryptoAddress: Yup.string()
                            .min(26, "Must be at least 26 characters")
                            .max(35, "Must be less then 35 characters")
                            .required("Required"),

                        // Card Verification
                        cardNumber: Yup.string().required("Required"),
                        name: Yup.string()
                            .max(30, 'Must be 30 characters or less')
                            .required("Required"),
                        expMonth: Yup.string().required("Required"),
                        expYear: Yup.string().required("Required"),
                        cvv: Yup.string().required("Required"),

                        // Address Verification
                        address: Yup.string().required("Required"),
                        addressLine2: Yup.string().required("Required"),
                        city: Yup.string().required("Required"),
                        state: Yup.string().required("Required"),
                        zip: Yup.string().required("Required"),

                        // Authorization Check
                        Authorization: Yup.boolean().required("Must Authorize")
                    })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ submitForm, isSubmitting }) => (

                    <div className="form-container">
                        <h1>Transfer Funds</h1>
                        <Form>
                            <div className="grid grid-col-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <InputLabel>From</InputLabel>
                                    <Field
                                        component={Select}
                                        name="selectedCurrency"
                                        as="select"
                                        className="my-select"
                                        fullWidth
                                        onChange={(currencyEvent) => {

                                            setSelectedCurrency(currencyEvent.target.value);
                                        }}
                                    >
                                        <option value="USD">United States Dollar</option>
                                        <option value="GBP">Euro</option>
                                    </Field>
                                </FormControl>
                                <FormControl>
                                    <Field
                                        fullWidth
                                        className="form-textarea"
                                        label={`${selectedCurrency} Amount`}
                                        name="currencyAmount"
                                        type="number"
                                        component={TextField}
                                        onChange={(currencyAmountEvent) => {

                                            function onChange() {
                                                console.log(currencyAmountEvent.target.value)
                                                setCurrencyAmount(currencyAmountEvent.target.value);
                                            }
                                            onChange()
                                        }}
                                    />
                                </FormControl>
                            </div>
                            <div className="grid grid-col-1-1 grid-gap-15 mar-t-10 grid-small-1">
                                <FormControl>
                                    <InputLabel>To</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="selectedCrypto"
                                        as="select"
                                        className="my-select"
                                        onChange={(cryptoEvent) => {
                                            setSelectedCrypto(cryptoEvent.target.value);
                                        }}
                                    >
                                        <option value="BTC">Bitcoin</option>
                                        <option value="ETH">Ethereum</option>
                                    </Field>
                                </FormControl>
                                <FormControl>
                                    <Field
                                        className="form-textarea"
                                        label={`${selectedCrypto} Amount`}
                                        name="cryptoAmount"
                                        type="number"
                                        component={TextField}
                                    />

                                </FormControl>
                            </div>
                            <div className="grid mar-t-10">
                                <FormControl>
                                    <Field
                                        label={`${selectedCrypto} Wallet Address`}
                                        component={TextField}
                                        className="form-textarea"
                                        name="cryptoAddress"
                                        type="text"
                                    />
                                </FormControl>
                            </div>
                            <div className="rate">
                                <p>
                                    Exchange Rate: {exchangeRate}<br />
                                    Transaction Fee: {transactionFee}<br />
                                    Network Fee: {networkFee}<br />
                                </p>
                                <hr />
                                <p>
                                    <b>Total: {total}</b>
                                </p>
                            </div>
                            <h3>Payment Information</h3>
                            <div className="grid grid-col-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <Field
                                        label="Card Number"
                                        className="form-textarea"
                                        name="cardNumber"
                                        type="text"

                                        component={TextField}
                                    />
                                </FormControl>
                                <FormControl>
                                    <Field
                                        label="Name on card"
                                        className="form-textarea"
                                        name="name"
                                        type="text"
                                        component={TextField}
                                    />
                                </FormControl>
                            </div>
                            <div className="grid grid-col-1-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <InputLabel>Month</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="expMonth"
                                        as="select"
                                        className="my-select"

                                    >
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </Field>

                                </FormControl>
                                <FormControl>
                                    <InputLabel>Year</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="expYear"
                                        as="select"
                                        className="my-select"
                                    >
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </Field>

                                </FormControl>
                                <FormControl>
                                    <Field
                                        className="form-textarea"
                                        label="CVV"
                                        name="cvv"
                                        type="number"
                                        component={TextField}
                                    />
                                </FormControl>
                            </div>
                            <div className="billing-info">
                                <div className="grid grid-col-1">
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="Billing Address Line 1"
                                            name="address"
                                            type="text"
                                            component={TextField}
                                        />
                                    </FormControl>
                                </div>
                                <div className="grid grid-col-1">
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="Address Line 2"
                                            name="addressLine2"
                                            type="text"
                                            component={TextField}
                                        />
                                    </FormControl>
                                </div>
                                <div className="grid grid-col-1-1-1 grid-gap-15 grid-small-1">
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="City"
                                            name="city"
                                            type="text"
                                            component={TextField}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <InputLabel>State</InputLabel>
                                        <Field
                                            component={Select}
                                            label="State"
                                            name="state"
                                            as="select"
                                            className="my-select"
                                        >
                                            <option value="MD">Maryland</option>
                                            <option value="NY">New York</option>
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="Zip Code"
                                            name="zip"
                                            type="number"
                                            component={TextField}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="options">
                                <div className="">
                                    <FormControlLabel control={
                                        <Checkbox onChange={(emailCheckboxEvent) => {
                                            // console.log(emailCheckboxEvent.target.checked),
                                            setEmailState(emailCheckboxEvent.target.checked);
                                        }}

                                            name="emailCheckbox" />
                                    } label="Email Receipt" />

                                    <FormControlLabel control={
                                        <Checkbox onChange={(phoneCheckboxEvent) => {
                                            // console.log(emailCheckboxEvent.target.checked),
                                            setPhoneState(phoneCheckboxEvent.target.checked)
                                        }}

                                            name="textCheckbox" />
                                    } label="Text Receipt" />
                                </div>
                                <div className="optional-inputs grid grid-col-1">
                                    {DisplayEmail()}
                                </div>
                                <div className="optional-inputs grid grid-col-1">
                                    {DisplayPhone()}
                                </div>
                            </div>
                            <div className="grid grid-col-1">
                                <FormControlLabel control={
                                    <Checkbox name="Authorization" />
                                } label={
                                    <span>
                                        I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to <a href="/">Wyre's terms</a>
                                    </span>
                                } />
                            </div>
                            <button
                                className="bluebtn"
                                type="submit"
                            >
                                Submit
                            </button>
                        </Form>
                    </div>
                )
                }
            </Formik >
        </>
    );
};

export default SignupForm;



