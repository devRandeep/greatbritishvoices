import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Pagebread() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://greatbritishtalent.com/wp-json/wp/v2/pages/3078")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;

    return (
        <>
            <section className='page_breadcrumbs'>
                <Row>
                    <Col md={7} className='p-0'>
                        <div className="text_panel_breadcrumbs">
                            <h1>{items.heading}</h1>
                        </div>
                    </Col>
                    <Col md={5} className='p-0 d-sm-done d-md-block d-none'>
                        <div className="text_panel_breadcrumbs_image">
                            <img src={items.right_image} alt="" />
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    );
}
