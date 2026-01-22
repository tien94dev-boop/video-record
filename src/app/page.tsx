import Image from "next/image";
import ProductItem from "@/components/home/ProductItem";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "T-SHIRT WITH TAPE DETAILS",
      rate: 4.4,
      originalPrice: 140,
      discountPercent: 25,
      imgURL: "/images/product1.png",
    },
    {
      id: 2,
      name: "SKINNY FIT JEANS",
      rate: 3.6,
      originalPrice: 260,
      discountPercent: 15,
      imgURL: "/images/product2.png",
    },
    {
      id: 3,
      name: "CHECKERED SHIRT",
      rate: 4.5,
      originalPrice: 200,
      discountPercent: 30,
      imgURL: "/images/product3.png",
    },
    {
      id: 4,
      name: "SLEEVE STRIPED T-SHIRT",
      rate: 3.4,
      originalPrice: 180,
      discountPercent: 20,
      imgURL: "/images/product4.png",
    }
  ]
  return (
    <div className="lg:px-25 md:px-4 px-4">
      <h2 className="text-5xl font-bold pb-8 text-center">NEW ARRIVALS</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => {
          const { id, name: productName, rate, originalPrice, discountPercent, imgURL } = product
          return <ProductItem
            key={id}
            productName={productName}
            rate={rate}
            originalPrice={originalPrice}
            discountPercent={discountPercent}
            imgURL={imgURL}
          />
        })}
      </div>

    </div>
  );
}
