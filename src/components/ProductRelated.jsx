import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/carousel.css";
import { useSelector } from "react-redux";
// import { addToCart } from "../actions";

const ProductRelated = ({idProduto, idCategory}) => {
  // const dispatch = useDispatch();

  const scrollCarousel = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api-ecommerce-hackadev.herokuapp.com/product_all")
      .then((response) => response.json())
      .then(setData);
  }, []);
  const handleLeftClick = (event) => {
    event.preventDefault();
    scrollCarousel.current.scrollLeft -= scrollCarousel.current.offsetWidth;
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    scrollCarousel.current.scrollLeft += scrollCarousel.current.offsetWidth;
  };

  const products = useSelector((state) => state.product.products);

  console.log(products);
  return (
    <>
      <h2>Confira outros produtos que podem te interessar: </h2>

      <section className="section all-products" id="products">
        <div className="main-container"></div>

        <div className="carousel" ref={scrollCarousel}>

          {data          

            .filter((p) => p.product_category === idCategory && p.id_product !== idProduto) 
            .slice(0, 16)

            .map((product) => {
              return (
                <div className="product-item">
                  <div className="overlay">
                    <Link
                      to={`/product/${product.id_product}`}
                      className="product-thumb"
                    >
                      <img
                        src={`/images/product${product.id_product}.png`}
                        alt="Imagem do produto"
                      />
                    </Link>
                    <span
                      className="discount"
                      style={
                        !product.product_percent
                          ? { display: "none" }
                          : undefined
                      }
                    >{`-${product.product_percent}%`}</span>
                  </div>

                  <div className="product-info">
                    <span>{product.category_name}</span>
                    <div className="product-stars">
                      {[...Array(product.product_rating)].map(() => (
                        <i className="bx bxs-star"></i>
                      ))}
                    </div>

                    <a href="/">{product.product_name}</a>

                    <h4>
                      {" "}
                      {product.product_price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h4>
                  </div>

                </div>
              );
            })}
        </div>
      </section>
      <div className="buttons">
        <button onClick={handleLeftClick}>
          <img src="/images/seta.png" alt="left arrow" />
        </button>

        <button onClick={handleRightClick}>
          <img src="/images/seta.png" alt="right arrow" />
        </button>
      </div>
    </>
  );
};
export default ProductRelated;
