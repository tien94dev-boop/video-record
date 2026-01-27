import Image from "next/image";
import Rate from "@/components/home/Rate"
import ProductPrice from "@/components/home/ProductPrice";

interface ProductItemInterface {
    productName: string
    rate: number
    originalPrice: number
    discountPercent: number
    imgURL: string
}

export default function ProductItem({ productName, rate, originalPrice, discountPercent, imgURL }: ProductItemInterface){
    
    return <div className="col-span-4 md:col-span-2 lg:col-span-1">
    {/* Product Image */}
    <div className="pb-4">
      <Image
        src={imgURL}
        alt={"product-1.png"}
        width={295}
        height={298}
        className="w-full h-auto"
      />
    </div>
    {/* Title */}
    <div className="flex flex-col gap-2">
      <div className="">
        <p className=" text-xl leading-5 font-bold capitalize">{productName.toLowerCase()}</p>
      </div>
      <Rate rateNumber={rate}/>
      <ProductPrice originalPrice={originalPrice} discountPercent={discountPercent}/>
    </div>

  </div>
}