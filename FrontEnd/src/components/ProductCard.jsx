import React, { useState } from "react";

function ProductCard({ product, goldPrice }) {
  const [color, setColor] = useState("yellow");

  const colorMap = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  };

  const colorCode = {
    yellow: "#E6CA97",
    white: "#D9D9D9",
    rose: "#E1A4A9",
  };

  const dynamicPrice = product.price.toFixed(2); 

  const stars =
    "★".repeat(Math.round(product.popularityScore * 5)) +
    "☆".repeat(5 - Math.round(product.popularityScore * 5));

  return (
    <div className="text-start">
      {}
      <div
        className="d-flex justify-content-start align-items-center"
        style={{
          height: "200px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          paddingLeft: "10px"
        }}
      >
        <img
          src={product.images[color]}
          alt={product.name}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
        />
      </div>

      {}
      <div className="mt-2 px-1">
        <h5 style={{ fontFamily: "MontserratMedium", fontSize: "15px", marginBottom: "4px" }}>
          {product.name}
        </h5>

        <p style={{ fontFamily: "MontserratRegular", fontSize: "15px", marginBottom: "4px" }}>
          ${dynamicPrice} USD
        </p>

        <p style={{ fontFamily: "AvenirBook", fontSize: "14px", marginBottom: "4px" }}>
          {product.popularity * 1}/5 <span style={{ color: "#c5a253" }}>{stars}</span>
        </p>

        <p style={{ fontFamily: "AvenirBook", fontSize: "12px", marginBottom: "8px" }}>
          {colorMap[color]}
        </p>

        <div className="d-flex gap-2">
          {["yellow", "white", "rose"].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                backgroundColor: colorCode[c],
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: color === c ? "2px solid black" : "1px solid #ccc"
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;



