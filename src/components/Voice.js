import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import SeoApi from "./SeoApi";
export default function Voice() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://greatbritishvoices.co.uk/wp-json/custom/v1/post/voice")
      .then((res) => res.json())
      .then((json) => {
        setItems(json.acf_fields);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded)
    return (
      <div className="please_wait">
        <div className="loader"></div>
        <span>Data Loading....</span>
      </div>
    );

  // Assuming items.icons is an array of objects for each icon
  const icons = Array.from({ length: 12 }, (_, i) => ({
    icon: items[`icon${i + 1}`],
    description: items[`description${i + 1}`]
  }));

  return (
    <>
    <Helmet>
				<title>Hire a Professional Voiceover Artist I Great British Voices</title>
			</Helmet>
      <SeoApi apiUrl={"https://greatbritishvoices.co.uk/wp-json/rankmath/v1/getHead?url=https://greatbritishvoices.co.uk/voice/"}/>
      <section className="TitleHeader sectionpadding">
        <h1>{items.top_header}</h1>
      </section>

      <section className="voiceOverArtist sectionpadding">
        <div className="TitleRow">
          <h1>{items.topic_header}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: items.topic_header_description }}
          ></p>
        </div>
      </section>

      <section className="voicesGridColumn sectionpadding">
        <Row className="grid">
          {icons.map((iconItem, index) => (
            <div className="boxPanel__main" key={index}>
              <div className="Icon__img">
                <img src={iconItem.icon.sizes.large} alt="" />
              </div>
              <div className="voice__descripiton">
                <h6>{iconItem.icon.title}</h6>
                <p
                  dangerouslySetInnerHTML={{
                    __html: iconItem.description,
                  }}
                ></p>
              </div>
            </div>
          ))}
        </Row>
      </section>

      <section className="aboutGBV sectionpadding">
        <h1>{items.bottom_header}</h1>
        <p dangerouslySetInnerHTML={{ __html: items.bottom_description }}></p>
      </section>
    </>
  );
}
