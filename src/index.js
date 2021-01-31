import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/form";
import Logo from "./images/logo.svg";
import { Helmet } from "react-helmet";

function App() {
    return (
        <>
            <Helmet htmlAttributes>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous" />


            </Helmet>
            <nav className="header">
                <div className="container">
                    <img src={Logo} alt="logo"></img>
                </div>
            </nav>
            <div>
                <div className="container">
                    <Form />
                </div>
            </div>
            <footer>
                <div className="container">
                    <p>
                        Wyre Payments, Inc. is a registered money service business (NMLS ID: 1574869).
                    </p>
                    <p>© Wyre, Inc 2013 - 2021. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);