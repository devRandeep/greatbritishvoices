import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function BritishFemale() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://greatbritishvoices.co.uk/wp-json/wp/v2/pages/?parent=14275&acf_format=standard"
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoaded(true);
      });
  }, []);
  if (!isLoaded)
    return (
      <div className="please_wait">
        {" "}
        <div class="loader"> </div>
        <span>Data Loading....</span>
      </div>
    );

  return (
    <>
      <section className="british__female__voiceovers sectionpadding">
        <Row className="align-items-center p-4">
          <Col md={2}>
            <img
              src="	https://greatbritish.b-cdn.net/wp-content//uploads/2022/05/Female-Voices-at-Great-British-Voices.png
"
              alt=""
            />
          </Col>
          <Col md={10}>
            <div className="voice__text__panel">
              {/* <h1>{date}</h1> */}
              {/* <p dangerouslySetInnerHTML={{__html:acf.topic_description}}></p> */}
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
}
