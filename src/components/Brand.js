import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Brand() {
    const brandLogo = "https://greatbritish.b-cdn.net/wp-content/uploads/2020/09/client-logos.png";
    return (
        <>
            <div className="brand_logo">
                <Container>
                    <Row>
                        <Col md={6} className='mx-auto'>
                            <img src={brandLogo} alt="" />
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
}
