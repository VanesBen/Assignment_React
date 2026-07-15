export default function Button({title, onClick}) {
    return (
        <button onClick={onClick} className="rounded-[20px] px-6 py-2.5 text-white font-medium bg-accent hover:bg-blue-950 cursor-pointer active:bg-blue-950">{title}</button>
    )
} 