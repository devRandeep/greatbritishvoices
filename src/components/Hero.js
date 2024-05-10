import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { EffectFade } from 'swiper/core';


export default function Hero() {
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
                                    <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2020/06/Character-Voices-and-Impressionists-at-Great-British-Voices-min.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                <div className="voicesearchForm">
                    <form>

                        <div className="fieldItem">
                            <select name="voicetype" class="form-control text-capitalize font-weight-bold px-1" id="exampleFormControlSelect1">
                                <option disabled="" selected="">Specialism</option>
                                <option value="Broadcasters">Broadcasters</option>
                                <option value="Celebrity_Voices">Celebrity Voices</option>
                                <option value="Character_Actors">Character Actors</option>
                                <option value="Educational_Voiceovers">Educational Voiceovers</option>
                                <option value="Medical_Voiceovers">Medical Voiceovers</option>
                                <option value="Sports_Commentators">Sports Commentators</option>
                                <option value="Voice_Of_God">Voice Of God</option>
                            </select>
                        </div>
                        <div className="fieldItem">
                            <select name="language" class="form-control text-capitalize font-weight-bold px-1" id="exampleFormControlSelect1">
                                <option disabled="" selected="">Languages</option>
                                <option value="African">African</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Brazilian_Portuguese">Brazilian Portuguese</option>
                                <option value="Bulgarian">Bulgarian</option>
                                <option value="Canadian-French">Canadian-French</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Czech">Czech</option>
                                <option value="Danish">Danish</option>
                                <option value="Dutch">Dutch</option>
                                <option value="English_(British)">English (British)</option>
                                <option value="English_(Fluent_International)">English (Fluent International)</option>
                                <option value="Finnish">Finnish</option>
                                <option value="Flemish">Flemish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Greek">Greek</option>
                                <option value="Hebrew">Hebrew</option>
                                <option value="Indian">Indian</option>
                                <option value="Italian">Italian</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Lithuanian">Lithuanian</option>
                                <option value="Norwegian">Norwegian</option>
                                <option value="Polish">Polish</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Russian">Russian</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Swedish">Swedish</option>
                                <option value="Swiss">Swiss</option>
                                <option value="Thai">Thai</option>
                                <option value="Turkish">Turkish</option>
                                <option value="Welsh_Speakers">Welsh Speakers</option>
                            </select>
                        </div>
                        <div className="fieldItem">
                            <select name="accent" class="form-control text-capitalize font-weight-bold px-1" id="exampleFormControlSelect1" data-lol="
                                (RP) Neutral African All GBV International Accents Arabic &amp; Middle Eastern Asian Australasian Birmingham (Brummie) British Asian Caribbean Coventry Cumbrian European Generic Midlands Generic Northern Geordie Irish Lancashire Liverpudlian/Scouse London Mancunian Mid-Atlantic North American &amp; Canadian Scandinavian/Nordic Scottish Slavic South American Stoke on Trent Teesside Welsh Accent West Country Yorkshire 
                                ">
                                <option disabled="" selected="">Accent</option>
                                <option value="GBV_British/Regional_Accents" style={{ color: 'black', fontSize: '20px' }}>Regional Accents</option>
                                <option value="(RP)_Neutral"> - (RP) Neutral</option>
                                <option value="British_Asian" style={{ paddingRight: '10px' }}> - British Asian</option>
                                <option value="Irish"> - Irish</option>
                                <option value="London"> - London</option>
                                <option value="Generic_Midlands"> - Midlands</option>
                                <option value="Birmingham_(Brummie)"> -- Birmingham (Brummie)</option>
                                <option value="Coventry"> -- Coventry</option>
                                <option value="Generic_Northern"> - Northern</option>
                                <option value="Cumbrian"> -- Cumbrian</option>
                                <option value="Geordie"> -- Geordie</option>
                                <option value="Lancashire"> -- Lancashire</option>
                                <option value="Liverpudlian/Scouse"> -- Liverpudlian/Scouse</option>
                                <option value="Mancunian"> -- Mancunian</option>
                                <option value="Teesside"> -- Teesside</option>
                                <option value="Yorkshire"> -- Yorkshire</option>
                                <option value="Scottish"> -- Scottish</option>
                                <option value="Welsh_Accent"> -- Welsh</option>
                                <option value="West_Country"> -- West Country</option>
                                <option disabled="" style={{ color: 'black', fontSize: '20px', height: '40px' }}>International Accents</option>
                                <option value="All_International_Accents"> - All International Accents</option>
                                <option value="Arabian"> - Arabian</option>
                                <option value="African"> - African</option>
                                <option value="Asian"> - Asian</option>
                                <option value="Australasian"> - Australasian</option>
                                <option value="Caribbean"> - Caribbean</option>
                                <option value="European"> - European</option>
                                <option value="Mid-Atlantic"> - Mid-Atlantic</option>
                                <option value="North_American_&amp;_Canadian"> - North American &amp; Canadian</option>
                                <option value="Scandinavian/Nordic"> - Scandinavian/Nordic</option>
                                <option value="Slavic"> - Slavic</option>
                                <option value="South_American"> - South American</option>
                            </select>
                        </div>
                        <div className="fieldItem">
                            <select name="age" class="form-control text-capitalize font-weight-bold px-1" id="exampleFormControlSelect1">
                                <option disabled="" selected="">Age Range</option>
                                <option value="20's">20's</option>
                                <option value="30's_&amp;_40's">30's &amp; 40's</option>
                                <option value="50's">50's</option>
                                <option value="Child_&amp;_Teen">Child &amp; Teen</option>
                            </select>
                        </div>

                        <div className="fieldItem">
                            <select name="gender" class="form-control text-capitalize font-weight-bold px-1" id="exampleFormControlSelect1">
                                <option disabled="" selected="">Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Male_/_Female">Male / Female</option>
                            </select>
                        </div>
                        <div className="fieldItem">
                            <input type="text" placeholder='Search By Artist Name' />
                        </div>
                        <div className="fieldItem">
                            <button type='submit'><span><svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M27 24.57l-5.647-5.648a8.895 8.895 0 0 0 1.522-4.984C22.875 9.01 18.867 5 13.938 5 9.01 5 5 9.01 5 13.938c0 4.929 4.01 8.938 8.938 8.938a8.887 8.887 0 0 0 4.984-1.522L24.568 27 27 24.57zm-13.062-4.445a6.194 6.194 0 0 1-6.188-6.188 6.195 6.195 0 0 1 6.188-6.188 6.195 6.195 0 0 1 6.188 6.188 6.195 6.195 0 0 1-6.188 6.188z"></path></g></svg></span>Search</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
