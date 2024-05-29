import React, { useEffect, useState } from 'react';

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
            <h3>Celebrity Voices</h3>
            <p>Make your message stand out with celebrity talent</p>
            <button className='radius-0rounded-0'>view celebrity voices</button>
        </div>
      </section>
    </div>
  );
}
