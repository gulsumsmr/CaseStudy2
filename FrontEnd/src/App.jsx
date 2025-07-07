import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCarousel from "./components/ProductCarousel";
import './fonts.css';
import './App.css'; 

function App() {
  const [products, setProducts] = useState([]);
  const [goldPrice, setGoldPrice] = useState(70);
  const [sortBy, setSortBy] = useState(""); 

  useEffect(() => {
    const baseUrl = "https://casestudy-abo4.onrender.com/api/products"; 
    const url = sortBy ? `${baseUrl}?sort=${sortBy}` : baseUrl;

    console.log("📡 API çağrısı:", url);

    axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setGoldPrice(res.data[0]?.goldPrice ?? 70);
      })
      .catch((err) => console.error(err));
  }, [sortBy]);

  return (
    <div className="container py-5">
      <h1 style={{ fontFamily: "AvenirBook", fontSize: "45px", textAlign: "center" }}>
        Products List
      </h1>

      <div className="mb-4 text-center">
        <span className="sort-heading d-block mb-2">Sırala:</span>

        <div className="d-flex justify-content-center gap-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              value="price"
              checked={sortBy === "price"}
              onChange={() => setSortBy("price")}
              id="sortPrice"
            />
            <label className="form-check-label sort-option-label" htmlFor="sortPrice">
              Fiyata Göre (Artan)
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              value="popularity"
              checked={sortBy === "popularity"}
              onChange={() => setSortBy("popularity")}
              id="sortPopularity"
            />
            <label className="form-check-label sort-option-label" htmlFor="sortPopularity">
              Popülerliğe Göre (Azalan)
            </label>
          </div>
        </div>
      </div>

      <ProductCarousel products={products} goldPrice={goldPrice} />
    </div>
  );
}

export default App;

