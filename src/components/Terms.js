import React, { useEffect, useState } from 'react';
import SeoApi from './SeoApi';
import { Helmet } from 'react-helmet';


export default function Terms() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://greatbritishtalent.com/wp-json/wp/v2/pages/6774")
      .then((res) => res.json())
      .then((json) => {
        setItems(json.acf);
        setIsLoaded(true);
      });
  }, []);

  if (!items || !Object.keys(items).length) {
    return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;
  }

  return (
    <div>
      <>
        <Helmet>
          <title>Terms & Conditions  | Great British UK Talent</title>
        </Helmet>
        <SeoApi apiUrl="https://greatbritishtalent.com/wp-json/rankmath/v1/getHead?url=https://www.greatbritishtalent.com/tc/" />
        
        <section className='terms_and_condition'>
          <div className="term_condition_text_box" dangerouslySetInnerHTML={{ __html: items.content }}>
          </div>
        </section>
      </>
    </div>
  );
}
