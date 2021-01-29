import React from "react";
import "../../src/styles.css"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import { CheckboxWithLabel } from 'formik-material-ui';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

let selectedCrypto = "Selected Crypto"
let selectedCurrency = "Selected Currency"
let exchangeRate = "Exchange Rate"
let transactionFee = "Transaction Fee"
let networkFee = "Network Fee"
let total = "Total"

const SignupForm = () => {
    return (
        <>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '' }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
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
                                    <InputLabel>From Currency</InputLabel>
                                    <Field
                                        component={Select}
                                        name="currency"
                                        as="select"
                                        className="my-select"
                                        fullWidth
                                    >
                                        <option value="USD">United States Dollar</option>
                                        <option value="GBP">Euro</option>
                                    </Field>

                                    <ErrorMessage name="currency" />
                                </FormControl>
                                <FormControl>
                                    <Field
                                        fullWidth
                                        className="form-textarea"
                                        label={`${selectedCurrency} Amount`}
                                        name="currency-amount"
                                        type="number"
                                        placeholder="Amount"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="currency-amount" />
                                </FormControl>
                            </div>
                            <div className="grid grid-col-1-1 grid-gap-15 mar-t-10 grid-small-1">
                                <FormControl>
                                    <InputLabel>To Crypto</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="crypto"
                                        as="select"
                                        className="my-select"
                                    >
                                        <option value="BTC">Bitcoin</option>
                                        <option value="ETH">Ethereum</option>
                                    </Field>
                                    <ErrorMessage name="crypto" />
                                </FormControl>
                                <FormControl>
                                    <Field
                                        className="form-textarea"
                                        label={`${selectedCrypto} Amount`}
                                        name="crypto-amount"
                                        type="number"
                                        placeholder="Amount"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="currency-amount" />
                                </FormControl>
                            </div>
                            <div className="grid mar-t-10">
                                <FormControl>
                                    <Field
                                        label={`${selectedCrypto} Wallet Address`}
                                        component={TextField}
                                        className="form-textarea"
                                        name="crypto-address"
                                        type="text"
                                        placeholder="Wallet Address"
                                    />
                                </FormControl>
                            </div>
                            <div className="rate">
                                <p>
                                    Exchange Rate: {exchangeRate}<br />
                                    Transaction Fee: {transactionFee}<br />
                                    Network Fee: {networkFee}<br />
                                    <hr></hr>
                                    <b>Total: {total}</b>
                                </p>
                            </div>
                            <h3>Payment Information</h3>
                            <div className="grid grid-col-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <Field
                                        label="Card Number"
                                        className="form-textarea"
                                        name="card-number"
                                        type="text"
                                        placeholder="Card Number"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="card-number" />
                                </FormControl>
                                <FormControl>
                                    <Field
                                        label="Name on card"
                                        className="form-textarea"
                                        name="name"
                                        type="text"
                                        placeholder="Name on card"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="name" />
                                </FormControl>
                            </div>
                            <div className="grid grid-col-1-1-1 grid-gap-15 grid-small-1">
                                <FormControl>
                                    <InputLabel>Month</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="exp-month"
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
                                    <ErrorMessage name="exp-month" />
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Year</InputLabel>
                                    <Field
                                        component={Select}
                                        label=""
                                        name="exp-year"
                                        as="select"
                                        className="my-select"
                                        placeholder="Year"

                                    >
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </Field>
                                    <ErrorMessage name="exp-year" />
                                </FormControl>
                                <FormControl>
                                    <Field
                                        className="form-textarea"
                                        label="CVV"
                                        name="cvv"
                                        type="number"
                                        placeholder="CVV"
                                        component={TextField}

                                    />
                                    <ErrorMessage name="cvv" />
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
                                            placeholder="Billing Address Line 1"
                                            component={TextField}

                                        />
                                        <ErrorMessage name="address" />
                                    </FormControl>
                                </div>
                                <div className="grid grid-col-1">
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="Address Line 2"
                                            name="address-line-2"
                                            type="text"
                                            placeholder="Address Line 2"
                                            component={TextField}
                                        />
                                        <ErrorMessage name="address-line-2" />
                                    </FormControl>
                                </div>
                                <div className="grid grid-col-1-1-1 grid-gap-15 grid-small-1">
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="City"
                                            name="city"
                                            type="text"
                                            placeholder="City"
                                            component={TextField}

                                        />
                                        <ErrorMessage name="city" />
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
                                        <ErrorMessage name="state" />
                                    </FormControl>
                                    <FormControl>
                                        <Field
                                            className="form-textarea"
                                            label="Zip Code"
                                            name="zip-code"
                                            type="number"
                                            placeholder="Zip Code"
                                            component={TextField}

                                        />
                                        <ErrorMessage name="zip-code" />
                                    </FormControl>
                                </div>
                            </div>

                            <div className="options">
                                <FormControl>
                                    <div className="grid grid-col-1-1 grid-gap-15 grid-small-1">
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="Email"
                                            Label={{ label: 'Email Receipt' }}
                                        />
                                        <Field
                                            component={CheckboxWithLabel}
                                            type="checkbox"
                                            name="Text"
                                            Label={{ label: 'Text Receipt' }}
                                        />
                                    </div>
                                </FormControl>
                            </div>
                            <div className="grid grid-col-1">
                                <FormControl>
                                    <Field
                                        component={CheckboxWithLabel}
                                        type="checkbox"
                                        name="acceptedTerms"
                                        Label={{
                                            label: <div>
                                                I authorize Wyre to debit my account indicated for the amount above on today’s date, and I agree to <a href="/">Wyre's terms</a>
                                            </div>
                                        }}
                                    />
                                </FormControl>
                            </div>


                            <button
                                className="bluebtn"
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                onClick={submitForm}
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

export default SignupForm