import Image from "next/image"

interface BannerItem {
    statistic: string
    statisticName: string
}
interface BannerInterface {
    title: string
    des: string
    btnName: string
    bannerItems: BannerItem[]
    bannerDesktopUrl: string
    bannerMobileUrl: string
}
export default function Banner({ data }: { data: BannerInterface }) {
    const { bannerDesktopUrl, bannerMobileUrl, title, des, btnName, bannerItems } = data
    return <div className={`bg-[#F2F0F1] grid grid-cols-2 gap-4 lg:px-25 md:px-4 px-4 md:pt-25 pt-8`}>
        <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            <h2 className="md:text-[64px] md:leading-[64px] text-4xl leading-8 md:font-bold">{title}</h2>
            <p className="md:text-base leading-5.5 text-sm">{des}</p>
            <div>
                <div className="md:w-[210px] w-full h-13 bg-black flex justify-center items-center rounded-full cursor-pointer">
                    <p className="text-white cursor-pointer">{btnName}</p>
                </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 mt-2 md:divide-x md:divide-gray-400 gap-4">
                {bannerItems.map((bannerItem, index) => {
                    return <div key={index} className="text-center first:text-center last:text-center last:col-span-2
                                                        md:col-span-1 md:last:col-span-1 md:last:text-right md:first:text-left
                                                        max-md:even:border-l-2 even:border-gray-400
                                                        ">
                        <p className="md:text-[40px] text-3xl font-bold">{bannerItem.statistic}</p>
                        <p className="md:text-base text-xs">{bannerItem.statisticName}</p>
                    </div>
                })}
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
            <Image
                src="/images/banner-img.jpg"
                alt="banner-img"
                width={656}
                height={663}
                className="w-full"
            />
        </div>

    </div>
}