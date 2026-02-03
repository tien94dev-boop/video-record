import Link from "next/link"


interface NotificationSignUpInterface{
    handleNotificationClose: ()=>void
}
export default function NotificationSignUp({ handleNotificationClose }: NotificationSignUpInterface) {
    return <div className="w-full text-center bg-black px-4 py-2 relative text-white text-sm">
        Sign up and get 20% off to your first order.
        <Link href={"/"} className="font-semibold"> Sign Up Now</Link>
        <div className="absolute right-4 top-2 hover:cursor-pointer cursor-pointer w-6 h-6" onClick={()=>handleNotificationClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
}