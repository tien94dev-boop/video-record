import Image from "next/image";

interface ProductItemInterface {
    productName: string
    rate: number
    originalPrice: number
    discountPercent: number
    imgURL: string
}

export default function ProductItem({ productName, rate, originalPrice, discountPercent, imgURL }: ProductItemInterface){
    const price = originalPrice*(100-discountPercent)/100
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
      <div className="flex gap-4 items-center">
        {/* star */}
        <div className="flex gap-2 ">
          <Image 
            src="/images/icon-star.png"
            alt="icon-star"
            width={18}
            height={18}
          />
          <Image 
            src="/images/icon-star.png"
            alt="icon-star"
            width={18}
            height={18}
          />
          <Image 
            src="/images/icon-star.png"
            alt="icon-star"
            width={18}
            height={18}
          />
          <Image 
            src="/images/icon-star.png"
            alt="icon-star"
            width={18}
            height={18}
          />
          <Image 
            src="/images/icon-star-half.png"
            alt="icon-star-half"
            width={9}
            height={18}
          />
        </div>
        {/* rate */}
        <p className="text-sm">{rate}/5</p>
      </div>
      <div className="flex gap-2">
        <p className="font-bold md:text-2xl tex-xl">${price.toFixed(0)}</p>
        <p className="font-bold text-2xl text-gray-500 line-through">${originalPrice}</p>
        <p className="w-14.5 h-7 bg-red-100 rounded-full text-red-500 text-xs flex items-center justify-center">{discountPercent}%</p>
      </div>
    </div>

  </div>
}