import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function BritishFemale() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://greatbritishvoices.co.uk/wp-json/wp/v2/pages/?parent=14275&acf_format=standard"
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json); // Save the whole response
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return (
      <div className="please_wait">
        <div className="loader"></div>
        <span>Data Loading....</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure that the acf field exists before accessing it
  const acf = items && items.length > 0 ? items[0].acf : null;

  return (
    <>
      <section className="british__female__voiceovers sectionpadding">
        <Row className="align-items-center p-4">
          <Col md={2}>
            <img
              src={acf.topic_image.url}
              alt=""
            />
          </Col>
          <Col md={10}>
            {acf && (
              <div className="voice__text__panel">
                <h1>{acf.topic_title}</h1>
                <p dangerouslySetInnerHTML={{ __html: acf.topic_description }}></p>
              </div>
            )}
          </Col>
        </Row>
      </section>
    </>
  );
}
