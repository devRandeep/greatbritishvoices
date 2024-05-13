import React, { useEffect, useState } from "react";
import Team from "./Team";
import Pagebread from "./Pagebread";
import { Col, Row } from "react-bootstrap";
import Callnumber from "./Callnumber";
import Wesupply from "./Wesupply";
import { Helmet } from "react-helmet";
import { render } from "react-dom";
import SeoApi from "./SeoApi";
// import { Helmet, HelmetProvider } from "react-helmet-async";
export default function About() {

    const [items, setItems] = useState({});

    useEffect(() => {
        fetch("https://greatbritishtalent.com/wp-json/wp/v2/pages/3069")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf);
            })
            .catch((error) => {
                console.error("Error fetching page data:", error);
            });
    }, []);

    if (!items || !Object.keys(items).length) {
        return <div className='please_wait'> <div className="loader" > </div><span>Data Loading....</span > </div>;
    }
    return (
        <>
            <h1>about</h1>
        </>
    );
}