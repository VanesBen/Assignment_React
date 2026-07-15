export default function LoadingPulse() {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm">
            <h1 className=" animate-pulse transition-transform ease-in-out text-2xl text-white font-bold">Loading...</h1>
        </div>
    )
}