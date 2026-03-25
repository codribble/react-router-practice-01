import React from "react";

const FruitItem = ({ item, isCart, handler }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          {item.emoji} {item.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <p>{item.price.toLocaleString()}원</p>
          <button onClick={handler}>{isCart ? "제거" : "담기"}</button>
        </div>
      </div>
    </div>
  );
};

export default FruitItem;
