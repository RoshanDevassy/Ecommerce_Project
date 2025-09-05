import ProductCard from "../components/ProductCard";
import './productspage.css'

export default function ProductsPage() {  

  return (
    <>
      <section className="products-page-section">
        <h3 style={{textAlign:"center",padding:"32px 0"}}>PRODUCTS</h3>
        <div className="products-article-wrapper">
          <ProductCard/>
        </div>
      </section>
    </>
  );
}
