
interface ProductPriceInterface {
    originalPrice: number
    discountPercent: number
}

export default function ProductPrice({ originalPrice, discountPercent }: ProductPriceInterface) {
    const price = originalPrice * (100 - discountPercent) / 100
    return <div className="flex gap-2">
        <p className="font-bold md:text-2xl tex-xl">${price.toFixed(0)}</p>
        {discountPercent !== 0 && <>
            <p className="font-bold text-2xl text-gray-500 line-through">${originalPrice}</p>
            <p className="w-14.5 h-7 bg-red-100 rounded-full text-red-500 text-xs flex items-center justify-center">{discountPercent}%</p></>
            }

    </div>
}