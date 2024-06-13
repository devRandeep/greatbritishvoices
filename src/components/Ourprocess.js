import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Ourprocess() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef1 = useRef(null); // Ref for the first Carousel  

    const ourProcessSlider = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
            gap: 100,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            gap: 100,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            gap: 100,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            gap: 10,
            centerSlide: true,
        }
    };

    const ourProcess = [
        {

            icon: "https://greatbritishtalent.com/static/css/img/001-form.png",
            processName: 'Enquiry Form',
            processText: "Fill in the online enquiry form with as much information as possible, please don't worry if you don't know all the details right now!",
        },
        {

            icon: "https://greatbritishtalent.com/static/css/img/002-support.png",
            processName: 'Lets Chat',
            processText: "If you would prefer to chat then simply dial +44 (0) 1753 439 289 where Alex and Kelly will be happy to take your details.",
        },
        {

            icon: "https://greatbritishtalent.com/static/css/img/003-loupe.png",
            processName: 'Our Search Results',
            processText: "We are not restricted to the voice artists listed on our website and will create an exciting and bespoke shortlist based on your brief, budget and requirements.",
        },
        {

            icon: "https://greatbritishtalent.com/static/css/img/004-hired.png",
            processName: 'Select Your Voice Artist',
            processText: "Working together we will narrow down your shortlist and find the perfect Voice Artist for your event.  You can also create your own shorlist if you wish.",
        },
        {

            icon: "https://greatbritishtalent.com/static/css/img/005-conference.png",
            processName: ' Voice Artist Delivers',
            processText: "We will organise logistics and a briefing call for you with your chosen Voice Artist so they are prepared and ready to deliver on the day of your event.",
        },

    ];


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
                        showDots={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        infinite={true}
                        responsive={ourProcessSlider}
                        beforeChange={(current, next) => setCurrentSlide(next)}
                        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                    >
                        {ourProcess.map((processValue, index) => (
                            <div className="processBox" key={index}>
                                <div className="processIcon">
                                    <img src={processValue.icon} alt="" />
                                </div>
                                <b>0{index + 1}.</b>
                                <div className="processText">
                                    <p>0{index + 1}. {processValue.processName}</p>
                                    <p>{processValue.processText}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Row>
            </section>
        </>
    );
}
