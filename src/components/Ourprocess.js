import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Ourprocess() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef1 = useRef(null); // Ref for the first Carousel  

    const [items, setItems] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740",{
            mode: 'no-cors'
        })
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf_fields);
                setIsLoaded(true);
            });
    }, []);
    
    if (!isLoaded) return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;

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

    return (
        <>
            <section className='ourProcess sectionpadding'>
                <Row>
                    <div className="heading_panel">
                        <h3>Our Process</h3>
                        <p>{items.our_process_description}</p>
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
                        {items.our_process_boxes && items.our_process_boxes.map((processValue, index) => (
                            <div className="processBox" key={index}>
                                <div className="processIcon">
                                    <img src={processValue.opb_image_url} />
                                </div>
                                <b>0{index + 1}.</b>
                                <div className="processText">
                                    <p>{processValue.opb_title}</p>
                                    <p>{processValue.opb_description}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Row>
            </section>
        </>
    );
}
