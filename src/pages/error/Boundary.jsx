import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        return this.state.hasError ?
        <div>
            <Helmet>
                <title>Error - PromotBox</title>
            </Helmet>
            <div className="err-nav-wrapper">
                <button className="bg-transparent err-back-btn" onClick={_e=>window.location.href = window.location.host}>
                    <Arrowleft stroke="grey" fill="grey" width="13" height="13" /> 
                    <span className="color-grey">Back</span>
                </button>
            </div>
            <div className="err-content-wrapper">
                <h1>
                    Ups!
                </h1>
                <p>
                    Terjadi kesalahan pada halaman ini. Silakan muat ulang halaman ini atau kembali ke <Link to="/">Beranda</Link>.
                </p>
            </div>
        </div>
        : this.props.children
    }
}