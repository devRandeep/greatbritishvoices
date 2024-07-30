import React, { useEffect, useState } from "react";

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

  return <></>;
}
