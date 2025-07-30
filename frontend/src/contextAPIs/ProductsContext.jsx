import { createContext } from "react";

import ImageGallery1 from "../assets/images/image_gallery/product-box1.png";
import ImageGallery2 from "../assets/images/image_gallery/product-box2.png";
import ImageGallery3 from "../assets/images/image_gallery/product-box3.png";

import NewArrivals1 from "../assets/images/new_arrivals/product1.jpg";
import NewArrivals2 from "../assets/images/new_arrivals/product2.jpg";
import NewArrivals3 from "../assets/images/new_arrivals/product3.jpg";
import NewArrivals4 from "../assets/images/new_arrivals/product4.jpg";
import NewArrivals5 from "../assets/images/new_arrivals/product5.jpg";
import NewArrivals6 from "../assets/images/new_arrivals/product6.jpg";
import NewArrivals7 from "../assets/images/new_arrivals/product7.jpg";
import NewArrivals8 from "../assets/images/new_arrivals/product8.jpg";

import OurBlog1 from "../assets/images/our_blog/blog1.jpg";
import OurBlog2 from "../assets/images/our_blog/blog2.jpg";

import SendMessage from "../assets/images/icons/sendMessage.png";

import AuthorProfile from "../assets/images/author_summary/testinomial1.png";

import React from "../assets/react.svg";

export const ProductContext = createContext();

export default function ProductsAPIContext({ children }) {
  const ProductsData = [
    {
      id: 1,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals1,
      price: 170,
    },
    {
      id: 2,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals2,
      price: 170,
    },
    {
      id: 3,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals3,
      price: 170,
    },
    {
      id: 4,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals4,
      price: 170,
    },
    {
      id: 5,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals5,
      price: 170,
    },
    {
      id: 6,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals6,
      price: 170,
    },
    {
      id: 7,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals7,
      price: 170,
    },
    {
      id: 8,
      title: "Chair Design",
      product_type: "Bag",
      imgsrc: NewArrivals8,
      price: 170,
    },
  ];

  return (
    <ProductContext.Provider value={{ ProductsData }}>
      {children}
    </ProductContext.Provider>
  );
}
