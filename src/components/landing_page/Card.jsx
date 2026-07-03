export default function Card ({type, imgUrl, title, description, alt}) {
    return (
        <div className={`flex flex-col gap-2 shrink-0 rounded-xl ${type === "category" ? "w-71" : "w-90"} w-71 py-4`}>
            <img className="w-full bg-cover" src={imgUrl} alt={alt} />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-pretty text-l" >{description}</p>
        </div>
    )
}