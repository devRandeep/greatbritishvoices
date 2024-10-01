import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Celebrityvoices() {
  const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
		fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740")
			.then((res) => res.json())
			.then((json) => {
				setItems(json.acf_fields);
				setIsLoaded(true);
			});
	}, []);
  if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;
  return (
    <div>
      <section className='celebrityvoices'>     
        <img src={items.celebrity_voices_background.url} alt="" />
        <div className="celebrityvoicesContent">
            <h3>{items.cv_title}</h3>
            <p>{items.cv_description}</p>
            <Link to="/celebrityvoicepage" className='button radius-0rounded-0'>{items.cv_button_title} </Link>
        </div>
      </section>
    </div>
  );
}
