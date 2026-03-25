// TODO 6: props를 받아서 장바구니 목록을 렌더링하세요
//         - cart: 장바구니에 담긴 과일 배열
//         - onRemoveFromCart: 장바구니 제거 함수
const About = ({ cart, onRemoveFromCart }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>장바구니</h2>
      {/* TODO: cart 배열을 map으로 순회하며 장바구니 아이템을 렌더링하세요 */}
      {/* 각 아이템에는 이모지, 이름, 가격, "제거" 버튼이 있어야 합니다 */}
      {/* 장바구니가 비어있으면 "장바구니가 비어있습니다" 메시지를 보여주세요 */}
      <p>여기에 장바구니 목록을 렌더링하세요</p>

      <div>
        {cart.length
          ? cart.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {item.emoji} {item.name}
                    </p>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <p>{item.price.toLocaleString()}원</p>
                      <button
                        onClick={() => {
                          onRemoveFromCart(item.id);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "장바구니가 비어있습니다"}
      </div>
    </div>
  );
};

export default About;
