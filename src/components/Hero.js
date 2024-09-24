import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { EffectFade } from 'swiper/core';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Filterform from './Filterform';


export default function Hero() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch("https://greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740",
            {
                mode: 'no-cors'
            }
        )
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf);
                setIsLoaded(true);
            });
    }, []);
    // if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;
    return (
        <>
            <main className='hero'>
                <section className="section_first">
                    <div className="column_first">
                        <Container>
                            <Row>
                                <h1>
                                    Great British
                                    <span
                                        href=""
                                        className="typewrite"
                                        data-period="2000"
                                        data-type='[ "speakers", "presenters.", "voices."]'
                                    >
                                        <span className="wrap"></span>
                                    </span>
                                </h1>
                            </Row>
                        </Container>
                    </div>
                    <div className="column_second">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            effect={'fade'}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <div className="sliderImage">
                                    <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2020/06/Character-Voices-and-Impressionists-at-Great-British-Voices-min.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="sliderImage">
                                    <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2020/06/Voice-of-God-Announcers-at-Great-British-Voices-min.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                {/* Voice Form */}
                <Filterform />
            </main>
        </>
    );
}
