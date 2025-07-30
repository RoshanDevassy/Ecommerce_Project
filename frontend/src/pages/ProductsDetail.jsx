import { useLocation, useParams } from "react-router-dom";
import "./productdetail.css";
import { useContext, useEffect, useLayoutEffect } from "react";
import { ProductContext } from "../contextAPIs//ProductsContext";

function ProductDetail(props) {

  const { id } = useParams();
  const pathName = useLocation()

  const { ProductsData } = useContext(ProductContext);

  const newProduct = ProductsData.filter((obj) => obj.id == id);  

  useLayoutEffect(()=>{
    window.scrollTo(0,100)
  },[pathName])

  if (id == 105) {
    return (
      <>
        {props.ProductReviewObj.map((obj) => (
          <section key={obj.id} className="addtocartpage-section">
            <div className="addtocartpage-header">
              <h1>{obj.title}</h1>
            </div>
            <div className="addtocartpage-content-wrapper">
              <div className="addtocartpage-image">
                <img src={obj.imgsrc} alt="Chair Review product" />
              </div>
              <div className="addtocartpage-description">
                <p>{obj.review} </p>
                <p>Size : {obj.size}</p>
                <p>${obj.price}</p>
                <button>Buy</button>
              </div>
            </div>
          </section>
        ))}
      </>
    );
  }
  return (
    <>
      {newProduct.map((obj) => (
        <section key={obj.id} className="addtocartpage-section">
          <div className="addtocartpage-header">
            <h1>{obj.title}</h1>
          </div>
          <div className="addtocartpage-content-wrapper">
            <div className="addtocartpage-image">
              <img src={obj.imgsrc} alt={obj.title} />
            </div>
            <div className="addtocartpage-description">
              <p>{obj.title}</p>
              <p>{obj.product_type}</p>
              <p>${obj.price}</p>
              <button>Buy</button>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default ProductDetail;
