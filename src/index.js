import React from "react";
import ReactDOM from "react-dom";
import Form from "./components/form";
import Logo from "./images/logo.svg";
import { Helmet } from "react-helmet";

function App() {
    return (
        <>
            <Helmet htmlAttributes>
                <link rel="stylesheet" href="//images.kiwi.com/fonts/circular-pro/style.min.css" />
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
                    <span className="lastline">
                        Wyre Payments, Inc. is a registered money service business (NMLS ID: 1574869).
                    </span>
                    <span>© Wyre, Inc 2013 - 2021. All rights reserved.</span>
                </div>
            </footer>
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);