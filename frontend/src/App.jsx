import Footer from "./components/Footer";
import Header from "./components/Header";

import Router from "./components/Router";

import ProductReview from "./assets/images/chair_review/design-prouct.jpg";
import Navbar from "./components/Navbar";
import {ToastContainer} from 'react-toastify'

function App() {

  const ProductReviewObj = [
    {
      id: 105,
      imgsrc: ProductReview,
      title: "Chair Design",
      price: 170,
      size: "large",
      review: "4/5 | 10 review(s)",
    },
  ];

  return (
    <>
      <Header />
      <Navbar />
      <Router ProductReviewObj={ProductReviewObj} />
      <ToastContainer/>
      <Footer />
    </>
  );
}

export default App;
