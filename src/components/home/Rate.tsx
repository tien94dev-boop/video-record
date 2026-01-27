import Image from "next/image"
interface RateInterface {
    rateNumber: number
}

export default function Rate({ rateNumber }: RateInterface) {
    const rate = Math.round(rateNumber * 2) / 2
    const rateArray: ("full" | "part")[] = []
    for (let i = 0; i < rate; i++) {//3.5 
        const diff = rate - i
        if (diff >= 1) {
            rateArray.push("full")
        } else if (diff === 0.5) {
            rateArray.push("part")
        }
    }

    return <div className="flex gap-4 items-center">
        {/* star */}
        <div className="flex gap-2 ">
            {rateArray.map((type, index) => {
                if (type === "full") {
                    return (
                        <Image
                            key={index}
                            src="/images/icon-star.png"
                            alt="icon-star"
                            width={18}
                            height={18}
                        />
                    )
                } else {
                    return (
                        <Image
                            key={index}
                            src="/images/icon-star-half.png"
                            alt="icon-star-half"
                            width={9}
                            height={18}
                        />
                    )
                }
            })}

        </div>
        {/* rate */}
        <p className="text-sm">{rateNumber}/5</p>
    </div>

}