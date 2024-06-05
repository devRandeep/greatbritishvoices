import React, { useRef, useState } from 'react';
import { Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Ourprocess() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef1 = useRef(null); // Ref for the first Carousel  

    const ourProcessSlider = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
            gap: 20,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            gap: 20,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            gap: 20,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            gap: 10,
            centerSlide: true,
        }
    };


    return (
        <>
            <section className='ourProcess sectionpadding'>
                <Row>
                    <div className="heading_panel">
                        <h3>Our Process</h3>
                        <p>We are a boutique voice artists bureau and we take great delight and care in discussing and advising you to ensure the voice artist you select adds that extra dimension, turning your event into the most successful and memorable occasion it deserves. Simply call, email or fill in the online enquiry for a swift response.</p>
                        <div className="slider_control">
                        </div>
                    </div>
                </Row>

                <Row className='mt-3'>
                    <Carousel
                        ref={carouselRef1} // Use carouselRef1 for the first Carousel
                        showDots={true}
                        responsive={ourProcessSlider}
                        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                    >
                        <div className="processBox">
                            <div className="processIcon">
                                <img src="https://greatbritishtalent.com/static/css/img/001-form.png" alt="" />
                            </div>
                            <b>01.</b>
                            <div className="processText">
                                <p>01. Enquiry Form</p>
                                <p>Fill in the online enquiry form with as much information as possible, please don't worry if you don't know all the details right now!</p>
                            </div>
                        </div>
                    </Carousel>


                </Row>
            </section>
        </>
    );
}
