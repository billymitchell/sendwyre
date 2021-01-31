import React, { useState, useEffect } from "react";
import "../../src/styles.css"
import { LinearProgress } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import { CheckboxWithLabel } from 'formik-material-ui';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';

import CurrencyFlag from 'react-currency-flags';

import BTC from "../../node_modules/cryptocurrency-icons/svg/color/btc.svg"
import ETH from "../../node_modules/cryptocurrency-icons/svg/color/eth.svg"


function SignupForm() {
    // const [networkFee, setNetworkFee] = useState("Network Fee")
    // const [transactionFee, setTransactionFee] = useState("Transaction Fee")
    // const [exchangeRate, setExchangeRate] = useState("Exchange Rate")
    const [emailState, setEmailState] = useState(false);
    const [phoneState, setPhoneState] = useState(false);

    useEffect(() => {
        // Todo: Fetch rates and fees, calculate total 
    }, [])

    const DisplayEmail = () => {
        if (emailState === true) {
            return (
                <div className="optional-inputs grid grid-col-1 email">
                    <FormControl>
                        <Field
                            className="form-textarea"
                            label="Email"
                            name="email"
                            type="email"
                            component={TextField} />
                    </FormControl>
                </div>
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
                <div className="optional-inputs grid grid-col-1 phone">
                    <FormControl>
                        <Field
                            className="form-textarea"
                            label="Phone"
                            name="phone"
                            type="phone"
                            component={TextField} />
                    </FormControl>
                </div>
            );
        } else {
            return (
                <></>
            );
        }
    }

    const initialValues = {
        selectedCurrency: "",
        currencyAmount: "",
        selectedCrypto: "",
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
        email: "",
        phone: "",
        authorization: "",
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    // + networkFee + transactionFee
    const validationSchema = Yup.object({
        selectedCurrency: Yup.string().required("Required"),
        currencyAmount: Yup.number().required("Required").positive("Positive Number Required"),
        selectedCrypto: Yup.string().required("Required"),
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

        // Receipt 
        email: Yup.string().email("Must be a valid email address"),
        phone: Yup.string().matches(phoneRegExp, "Must be a valid phone number"),

        // Authorization Check
        authorization: Yup.boolean(true).required("Must Authorize")
    })

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                // Todo: on submit send data to sendwyre API
                // on success, show order received message, send email/text
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    // Available props
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    submitForm,
                    setSubmitting,
                }) => (
                    <div className="form-container">
                        <h1>Transfer Funds</h1>
                        <Form onSubmit={handleSubmit}>
                            <CssBaseline />
                            <div className="grid grid-col-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <InputLabel>From</InputLabel>
                                    <Field
                                        component={Select}
                                        name="selectedCurrency"
                                        as="select"
                                        className="my-select"
                                        fullWidth
                                        // Todo: on change fetch exchange rate 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched['selectedCurrency'] && !!errors['selectedCurrency']}
                                    >
                                        <MenuItem value="USD"><CurrencyFlag currency="USD" size="sm" className="flag" />United States Dollar</MenuItem>
                                        <MenuItem value="GBP"><CurrencyFlag currency="EUR" size="sm" className="flag" /> Euro</MenuItem>

                                    </Field>
                                    {
                                        errors.selectedCurrency && touched.selectedCurrency &&
                                        <div className="MuiFormHelperText-root Mui-error">
                                            {errors.selectedCurrency}
                                        </div>
                                    }
                                </FormControl>
                                <FormControl>
                                    <Field
                                        fullWidth
                                        className="form-textarea"
                                        label={`${values.selectedCurrency} Amount`}
                                        name="currencyAmount"
                                        type="number"
                                        component={TextField}
                                    // Todo: on change fetch exchange rate 
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
                                        error={touched['selectedCrypto'] && !!errors['selectedCrypto']}
                                    // Todo: on change fetch exchange rate 
                                    >


                                        <MenuItem value="BTC"><img src={BTC} alt="BTC" className="crypto-img" /><span className="crypto-text">Bitcoin</span></MenuItem>
                                        <MenuItem value="ETH"><img src={ETH} alt="ETH" className="crypto-img" /><span className="crypto-text">Ethereum</span></MenuItem>
                                    </Field>
                                    {
                                        errors.selectedCrypto && touched.selectedCrypto &&
                                        <div className="MuiFormHelperText-root Mui-error">
                                            {errors.selectedCrypto}
                                        </div>
                                    }
                                </FormControl>
                                <FormControl>
                                    <Field
                                        className="form-textarea"
                                        label={`${values.selectedCrypto} Amount`}
                                        name="cryptoAmount"
                                        type="number"
                                        component={TextField}
                                    // Todo: on change fetch exchange rate 
                                    />
                                </FormControl>
                            </div>
                            <div className="grid mar-t-10">
                                <FormControl>
                                    <Field
                                        label={`${values.selectedCrypto} Wallet Address`}
                                        component={TextField}
                                        className="form-textarea"
                                        name="cryptoAddress"
                                        type="text"
                                    />
                                </FormControl>
                            </div>
                            <div className="rate">
                                <p className="fees">

                                    Exchange Rate: <br />
                                    Transaction Fee: <br />
                                    Network Fee: <br />
                                </p>
                                <hr />
                                <p>
                                    <b>Total: {values.currencyAmount}</b>
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
                                        error={touched['expMonth'] && !!errors['expMonth']}

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
                                    {
                                        errors.expMonth && touched.expMonth &&
                                        <div className="MuiFormHelperText-root Mui-error">
                                            {errors.expMonth}
                                        </div>
                                    }
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Year</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="expYear"
                                        as="select"
                                        className="my-select"
                                        error={touched['expYear'] && !!errors['expYear']}
                                    >
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </Field>
                                    {
                                        errors.expYear && touched.expYear &&
                                        <div className="MuiFormHelperText-root Mui-error">
                                            {errors.expYear}
                                        </div>
                                    }
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
                                            error={touched['state'] && !!errors['state']}
                                        >
                                            <option value="MD">Maryland</option>
                                            <option value="NY">New York</option>
                                        </Field>
                                        {
                                            errors.state && touched.state &&
                                            <div className="MuiFormHelperText-root Mui-error">
                                                {errors.state}
                                            </div>
                                        }
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
                                <div className="">
                                    {DisplayEmail()}
                                </div>
                                <div className="">
                                    {DisplayPhone()}
                                </div>
                            </div>
                            <div className="grid grid-col-1 auth-box">
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="authorization"
                                    Label={
                                        {
                                            label: <p className="auth">
                                                I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to <a href="/">Wyre's terms</a>
                                            </p>
                                        }
                                    }

                                />
                                {
                                    errors.authorization && touched.authorization &&
                                    <div className="MuiFormHelperText-root Mui-error">
                                        {errors.authorization}
                                    </div>
                                }
                            </div>
                            {isSubmitting && <LinearProgress />}
                            <button
                                className="bluebtn"
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
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



