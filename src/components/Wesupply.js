import React, { useState, useRef } from 'react';
import { Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Wesupply() {
    
    const supplySlider = {
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

    const SupplyCard = [
        {
            iconUrl: "https://greatbritishvoices.co.uk/static/css/img/arrow.png",
            cardTitle: "Female Voices",
            cardUrl: "https://greatbritishvoices.co.uk/voice/female-voiceover-artists/?gender=Female",
        },
        {
            iconUrl: "https://www.greatbritishtalent.com/static/css/img/mic.png",
            cardTitle: "Celebrity Voice Overs",
            cardUrl: "https://greatbritishvoices.co.uk/celebrity-voice-overs/",
        },
        {
            iconUrl: "https://greatbritishvoices.co.uk/static/css/img/mic.png",
            cardTitle: "Male Voices",
            cardUrl: "https://greatbritishvoices.co.uk/voice/male-voice-overs/",
        },
        {
            iconUrl: "https://greatbritishvoices.co.uk/static/css/img/spoon-plate.png",
            cardTitle: "Home Studios",
            cardUrl: "https://greatbritishvoices.co.uk/voice/home-studios/",
        },
        {
            iconUrl: "https://www.greatbritishtalent.com/static/css/img/faces.png",
            cardTitle: "Kids Voices",
            cardUrl: "https://greatbritishvoices.co.uk/voice/kids-voices/",
        },       
        {
            iconUrl: "	https://greatbritishvoices.co.uk/static/css/img/arrow.png",
            cardTitle: "UK Voices",
            cardUrl: "https://greatbritishvoices.co.uk/talent-search/?language=English_%28British%29&accent=GBV_British%2FRegional_Accents/",
        },      
        // Other SupplyCard items...

    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.previous();
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <section className="we_supply">
            <Row className='align-items-center'>
                <div className="heading_panel">
                    <h3>We supply</h3>
                    <div className="slider_control">
                        <button className='slide_arrow' id='next' onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
                        <button className='slide_arrow' id='prev' onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="we_supply_slider">
                    <Carousel
                        ref={carouselRef}
                        showDots={true}
                        responsive={supplySlider}
                        beforeChange={(current, next) => setCurrentSlide(next)}
                        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                    >
                        {SupplyCard.map((itemcard, index) => (
                            <div className="card" key={index}>
                                <div className="card_image">
                                    <img src={itemcard.iconUrl} alt="" />
                                </div>
                                <div className="card_title">
                                    <p><a href={itemcard.cardUrl} target="_blank">{itemcard.cardTitle}</a></p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </Row>
        </section>
    );
}
