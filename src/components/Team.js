import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";

export default function Team() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch("https://greatbritishtalent.com/wp-json/wp/v2/pages/2/?acf_format=standard")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf);
                setIsLoaded(true);
            });
    }, []);

    if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;

    return (
        <>
            <section className="our_team">
                <Col md={6}>
                    <div className="our_team_red_box" >
                        <div className="title_row">
                            <h3>Our Team</h3>
                            <h5 className="lets_talk">lets talk</h5>
                        </div>
                        <Row className="extra-width">
                            {/* Item */}
                            <Col>
                                <div className=" card team_person">
                                    <div className="profile_box">
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <div className="profile_img">
                                                    <img src={items.first_member_image} alt="" />

                                                </div>
                                            </Col>
                                            <Col md={9}>
                                                <div className="profile_text">
                                                    <h3>{items.first_person_name}</h3>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="card_text">
                                            <p dangerouslySetInnerHTML={{ __html: items.our_team_text_jane_f }}></p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className=" card team_person">
                                    <div className="profile_box">
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <div className="profile_img">
                                                    <img src={items.second_member_image} alt="" />

                                                </div>
                                            </Col>
                                            <Col md={9}>
                                                <div className="profile_text">
                                                    <h3>{items.second_person_name}</h3>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="card_text">
                                            <p dangerouslySetInnerHTML={{ __html: items.our_team_text_steve }}></p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </section>
        </>
    );
}
