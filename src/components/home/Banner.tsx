
interface BannerItem {
    statistic: string
    statisticName: string
}
interface BannerInterface{
    title: string
    des: string
    btnName: string
    bannerItems: BannerItem[]
    bannerDesktopUrl: string
    bannerMobileUrl: string
}
export default function Banner({ data }: {data: BannerInterface}){
    const { bannerDesktopUrl, bannerMobileUrl, title, des, btnName, bannerItems } = data
    return <div className={`bg-[url(/images/banner.jpg)] grid grid-cols-2 gap-4 lg:px-25 md:px-4 px-4 py-25`}>
        <div className="flex flex-col gap-6">
            <h2 className="text-[64px] leading-[64px] font-bold">{title}</h2>
            <p className="text-base leading-5.5">{des}</p>
            <div>
                <div className="w-[210px] h-13 bg-black flex justify-center items-center rounded-full cursor-pointer">
                    <p className="text-white cursor-pointer">{btnName}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 mt-2 divide-x divide-gray-500">
                {bannerItems.map((bannerItem, index)=>{
                    return <div key={index} className={`${index%2===1 ? "text-center" : ""} ${index===2 ? "text-right" : ""}`}>
                        <p className="text-[40px] font-bold">{bannerItem.statistic}</p>
                        <p className="text-base">{bannerItem.statisticName}</p>
                    </div>
                })}
            </div>
        </div>
        <div></div>

    </div>
}