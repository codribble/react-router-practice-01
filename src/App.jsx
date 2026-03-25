import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";

const CART_API = "http://localhost:4000/cart";
const FRUITS = [
  { id: 1, name: "사과", price: 1000, emoji: "🍎" },
  { id: 2, name: "바나나", price: 1500, emoji: "🍌" },
  { id: 3, name: "포도", price: 2000, emoji: "🍇" },
  { id: 4, name: "딸기", price: 2500, emoji: "🍓" },
  { id: 5, name: "오렌지", price: 1800, emoji: "🍊" },
];

const App = () => {
  // TODO 1: useState를 import하고, 장바구니(cart) state를 빈 배열로 선언하세요
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`${CART_API}`);
      if (!res.ok) {
        console.error(`에러발생: ${res.status} ${res.statusText}`);
        throw new Error(`${res.status}`);
      }
      const data = await res.json();

      setCart(data);
    };

    fetchCart();
  }, []);

  // TODO 2: 장바구니에 과일을 추가하는 함수 addToCart를 만드세요
  //         - fruit 객체를 파라미터로 받습니다
  //         - 이미 장바구니에 있는 과일은 추가하지 않습니다 (id로 비교)
  const addToCart = async (fruit) => {
    const existCartFruit = cart.some((f) => f.name === fruit.name);

    if (existCartFruit) {
      alert("이미 담긴 상품입니다.");
      return;
    }

    const res = await fetch(`${CART_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fruit),
    });
    if (!res.ok) {
      console.error(`에러발생: ${res.status} ${res.statusText}`);
      throw new Error(`${res.status}`);
    }
    const newItem = await res.json();

    setCart((prev) => [...prev, newItem]);
  };

  // TODO 3: 장바구니에서 과일을 제거하는 함수 removeFromCart를 만드세요
  //         - fruitId를 파라미터로 받습니다
  //         - filter를 사용하여 해당 과일을 제거합니다
  const removeFromCart = async (fruitId) => {
    await fetch(`${CART_API}/${fruitId}`, {
      method: "DELETE",
    });

    // setCart(cart.filter((item) => item.id !== fruitId));
    setCart((prev) => prev.filter((item) => item.id !== fruitId));
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>과일 가게</h1>
      </header>
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "12px 20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">과일 목록</Link>
        <Link to="/about">장바구니</Link>
        <Link to="/contact">주문 요약</Link>
      </nav>
      <Routes>
        {/* TODO 4: 각 컴포넌트에 필요한 props를 전달하세요 */}
        <Route
          path="/"
          element={<Home fruits={FRUITS} onAddToCart={addToCart} />}
        />
        <Route
          path="/about"
          element={<About cart={cart} onRemoveFromCart={removeFromCart} />}
        />
        <Route path="/contact" element={<Contact cart={cart} />} />
      </Routes>
    </div>
  );
};

export default App;
