import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Team() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf_fields);
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
                            <h5 className="lets_talk"><Link to="contactus" className="text-black">lets talk</Link></h5>
                        </div>
                        <Row className="extra-width">
                            {/* Item */}
                            <Col>
                                <div className=" card team_person">
                                    <div className="profile_box">
                                        <Row className="align-items-center">
                                            <Col md={3}>
                                                <div className="profile_img">
                                                    <img src={items.team_member_image_1.url} alt="" />

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
                                                    <img src={items.team_member_image_2.url} alt="" />

                                                </div>
                                            </Col>
                                            <Col md={9}>
                                                <div className="profile_text">
                                                    <h3>{items.second_person_name}</h3>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="card_text">
                                            <p dangerouslySetInnerHTML={{ __html: items.our_team_text_steve}}></p>
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
