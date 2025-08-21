import "../pages/homepage.css";

import ImageGallery1 from "../assets/images/image_gallery/product-box1.png";
import ImageGallery2 from "../assets/images/image_gallery/product-box2.png";
import ImageGallery3 from "../assets/images/image_gallery/product-box3.png";

import OurBlog1 from "../assets/images/our_blog/blog1.jpg";
import OurBlog2 from "../assets/images/our_blog/blog2.jpg";

import SendMessage from "../assets/images/icons/sendMessage.png";

import AuthorProfile from "../assets/images/author_summary/testinomial1.png";

import React from "../assets/react.svg";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../contextAPIs/ProductsContext";
//import { CartContext } from "../contextAPIs/CartContext";
import GallerySlides from "../components/GallerySlides";
import { useDispatch } from "react-redux";
import { addProduct } from "../reduxAPIs/CartSlice";

export default function HomePage(props) {
  const { ProductsData } = useContext(ProductContext);

  const cartDispatch = useDispatch();

  const navigate = useNavigate();
  /*   const { cartData, setCartData } = useContext(CartContext);

  console.log("Cart Data in HomePage : ", cartData.products);

  const addtocartHandler = (id) => {
    const newData = ProductsData.filter((obj) => obj.id == id);
    console.info("New Data : ", newData);

    cartData.products.length > 0
      ? setCartData({
          ...cartData,
          products: [...cartData.products, ...newData],
        })
      : setCartData({ ...cartData, products: newData });
  }; */

  return (
    <>
      {/* Home Page Wrapper */}

      <section className="home-page-section">
        {/* Hero Section */}
        <section className="hero-section container-fluid">
          <div className="hero-section-content container">
            <p>New Arrivals</p>
            <p>
              NEW STYLE <br /> FOR LAMP
            </p>
            <button>Shop Now</button>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="container image-gallery-wrapper ">
          <div className="container image-gallery">
            <div className="image-gallery-img">
              <img src={ImageGallery1} />
            </div>
            <div className="image-gallery-description">
              <p>ERENHOME DECO</p>
              <p>Creative home deco idea</p>
              <p>From : $167.00</p>
            </div>
          </div>
          <div className="container image-gallery">
            <div className="image-gallery-img">
              <img src={ImageGallery2} />
            </div>
            <div className="image-gallery-description">
              <p>ERENHOME DECO</p>
              <p>Creative home deco idea</p>
              <p>From : $167.00</p>
            </div>
          </div>
          <div className="container image-gallery">
            <div className="image-gallery-img">
              <img src={ImageGallery3} />
            </div>
            <div className="image-gallery-description">
              <p>ERENHOME DECO</p>
              <p>Creative home deco idea</p>
              <p>From : $167.00</p>
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="container-fluid new-arrival-section">
          {/* New Arrivals Header */}
          <div className="container new-arrivals-header">
            <h1>NEW ARRIVALS</h1>
            <p>Claritas est etiam processus dynamicus, qui sequitur.</p>
          </div>

          {/* New Arrivals Image Carousel */}
          <div className="container new-arrivals-imageCarousel-wrapper">
            {ProductsData.map((obj) => (
              <div key={obj.id}>
                <div className="new-arrivals-imageCarousel-img">
                  <img src={obj.imgsrc} alt="New Arrivals Product" />
                </div>
                <div className="new-arrivals-imageCarousel-description">
                  <div>
                    <p>{obj.title}</p>
                    <p>{obj.product_type}</p>
                  </div>
                  <div>
                    <p>${obj.price}</p>
                    <Link
                      to={`/productsdetail/${obj.id}`}
                      target="_blank"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/productsdetail/${obj.id}`);
                      }}
                    >
                      <button className="details-btn">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Review */}
          <div className="container product-review-section">
            {props.ProductReviewObj.map((obj) => (
              <div key={obj.id} className="container product-review-wrapper">
                <div className="product-review-img">
                  <img
                    src={obj.imgsrc}
                    alt="Product Review Image of Chair Design"
                  />
                </div>
                <div className="container product-review-description-wrapper">
                  <div className="product-review-description">
                    <h3>{obj.title}</h3>
                    <p>{obj.review} | Add your review</p>
                  </div>
                  <div className="product-review-price-wrapper">
                    <div className="product-review-price-details">
                      <p>${obj.price}</p>
                      <p>Size : {obj.size}</p>
                    </div>
                    <div className="product-review-btns">
                      <button>Buy</button>
                      <Link to={`/productsdetail/${obj.id}`}>
                        <button>Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container-fluid featured-product-wrapper">
          {/* featured-product-header */}
          <div className="featured-product-header">
            <h2>FEATURED PRODUCTS</h2>
            <p>laritas est etiam processus dynamicus, qui sequitur.</p>
          </div>

          {/* featured-product-gallery */}
          <div className="container featured-product-gallery">
            {ProductsData.map((obj) => (
              <div
                key={obj.id}
                className="featured-product-gallery-image-wrapper"
              >
                <div className="featured-product-img">
                  <img src={obj.imgsrc} alt={obj.title} />
                </div>
                <div className="container featured-product-description">
                  <div>
                    <p>{obj.title}</p>
                    <p>{obj.product_type}</p>
                  </div>
                  <div>
                    <p>${obj.price}</p>
                    {/* <button onClick={() => addtocartHandler(obj.id)}>
                      Add to Cart
                    </button> */}
                    <button onClick={() => cartDispatch(addProduct(obj))}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="featured-product-gallery-image-wrapper">
              <div className="featured-product-img">
                <img src={NewArrivals8} alt="Featured Product Gallery Image" />
              </div>
              <div className="container featured-product-description">
                <div>
                  <p>chair Design</p>
                  <p>bag</p>
                </div>
                <div>
                  <p>$170.00</p>
                  <button>Buy</button>
                </div>
              </div>
            </div>
            <div className="featured-product-gallery-image-wrapper">
              <div className="featured-product-img">
                <img src={NewArrivals7} alt="Featured Product Gallery Image" />
              </div>
              <div className="container featured-product-description">
                <div>
                  <p>chair Design</p>
                  <p>bag</p>
                </div>
                <div>
                  <p>$170.00</p>
                  <button>Buy</button>
                </div>
              </div>
            </div>
            <div className="featured-product-gallery-image-wrapper">
              <div className="featured-product-img">
                <img src={NewArrivals6} alt="Featured Product Gallery Image" />
              </div>
              <div className="container featured-product-description">
                <div>
                  <p>chair Design</p>
                  <p>bag</p>
                </div>
                <div>
                  <p>$170.00</p>
                  <button>Buy</button>
                </div>
              </div>
            </div>
            <div className="featured-product-gallery-image-wrapper">
              <div className="featured-product-img">
                <img src={NewArrivals5} alt="Featured Product Gallery Image" />
              </div>
              <div className="container featured-product-description">
                <div>
                  <p>chair Design</p>
                  <p>bag</p>
                </div>
                <div>
                  <p>$170.00</p>
                  <button>Buy</button>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* purchase Theme */}
        <section className="container purchase-theme-section">
          <div className="purchase-theme-wrapper">
            <div className="purchase-theme-content">
              <p>DO YOU LOVE US? PURCHASE THIS THEME!</p>
              <p>
                Typi non habent claritatem insitam, est usus legentis in iis qui
                facit eorum claritatem.
              </p>
            </div>
            <div className="purchase-theme-button">
              <button>PURCHASE</button>
            </div>
          </div>
        </section>

        {/* From our Blog */}
        <section className="container our-blog-section">
          {/* our-blog-header */}
          <div className="our-blog-header">
            <h2>FROM OUR BLOG</h2>
            <p>Claritas est etiam processus dynamicus, qui sequitur</p>
          </div>

          {/* our-blog-content-wrapper */}
          <div className="our-blog-content-wrapper">
            <div className="container our-blog-content">
              <div className="our-blog-content-image">
                <img src={OurBlog1} alt="Our Blog Image" />
              </div>
              <div className="container our-blog-content-description">
                <p>27/APRIL</p>
                <p>CLARITAS EST ETIAM PROCESSUS DYNAMICUS</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minus placeat soluta rerum animi maiores explicabo hic,
                  consequatur quisquam quidem at natus reiciendis quia tenetur
                  quae est. Vel sequi obcaecati eos?
                </p>
                <p>READ MORE &gt;&gt;</p>
              </div>
            </div>
            <div className="container our-blog-content">
              <div className="our-blog-content-image">
                <img src={OurBlog2} alt="Our Blog Image" />
              </div>
              <div className="container our-blog-content-description">
                <p>27/APRIL</p>
                <p>CLARITAS EST ETIAM PROCESSUS DYNAMICUS</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minus placeat soluta rerum animi maiores explicabo hic,
                  consequatur quisquam quidem at natus reiciendis quia tenetur
                  quae est. Vel sequi obcaecati eos?
                </p>
                <p>READ MORE &gt;&gt;</p>
              </div>
            </div>
          </div>
        </section>

        {/* News Letter */}
        <section className="container-fluid news-letter-section">
          <div className="container news-letter-content-wrapper">
            <div className="container news-letter-content">
              <h2>SIGN UP TO NEWSLETTER</h2>
              <p>
                Subscribe to the Eren mailing list to receive updates on new
                arrivals, special offers and other discount information.
              </p>
            </div>
            <div className="container news-letter-input">
              <div className="news-letter-input-wrapper">
                <input
                  type="text"
                  placeholder="Subscribe to our newsletter..."
                />
                <img src={SendMessage} alt="Send Message" />
              </div>
            </div>
          </div>
        </section>

        {/* Author Summary */}
        <section className="container author-summary-section">
          <div className="container author-summary-wrapper">
            <div className="author-summary-image">
              <img src={AuthorProfile} alt="Michel Smith Designer Image" />
              <p>MICHEL SMITH</p>
              <p>DESIGNER</p>
            </div>
            <div className="container author-summary-description">
              <p>
                Typi non habent claritatem insitam, est usus legentis in iis qui
                facit eorum claritatem. Investigationes demonstraverunt lectores
                legere me lius quod ii legunt saepius. Claritas est etiam
                processus dynamicus, qui sequitur mutationem consuetudium
                lectorum. Mirum est notare quam littera gothica.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container features-section">
          <div className="features-content-wrapper">
            <div className="features-image">
              <img src={React} alt="Free Shipping Image" />
            </div>
            <div className="features-description">
              <p>24/7 CUSTOMER SERVICE</p>
              <p>Free Shipping Worldwide</p>
            </div>
          </div>
          <div className="features-content-wrapper">
            <div className="features-image">
              <img src={React} alt="Free Shipping Image" />
            </div>
            <div className="features-description">
              <p>24/7 CUSTOMER SERVICE</p>
              <p>Free Shipping Worldwide</p>
            </div>
          </div>
          <div className="features-content-wrapper">
            <div className="features-image">
              <img src={React} alt="Free Shipping Image" />
            </div>
            <div className="features-description">
              <p>24/7 CUSTOMER SERVICE</p>
              <p>Free Shipping Worldwide</p>
            </div>
          </div>
        </section>

        {/* <GallerySlides /> */}
      </section>
    </>
  );
}
