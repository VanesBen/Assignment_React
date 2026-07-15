import { useEffect, useState } from "react";

export function ResponseAlert({ errorType, errorMessage, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) setTimeout(onClose, 300);
        }, 1000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!errorMessage) return null;

    // Tentukan warna tema berdasarkan errorType
    const isSuccess = errorType === "success";
    const bgClass = isSuccess ? "bg-emerald-500 border-emerald-600" : "bg-rose-500 border-rose-600";
    const icon = isSuccess ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    );

    return (
        <div
            className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-300 ease-out 
                ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
                flex items-center gap-3 rounded-xl border px-5 py-3.5 text-white shadow-xl min-w-[300px] max-w-[90%] md:max-w-md ${bgClass}`}
        >
            {/* Icon */}
            <div className="flex-shrink-0 text-white bg-white/20 p-1.5 rounded-lg">
                {icon}
            </div>

            {/* Message */}
            <div className="flex-grow">
                <p className="text-sm font-semibold tracking-wide">{errorMessage}</p>
            </div>

            {/* Close Button */}
            <button 
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) setTimeout(onClose, 300);
                }} 
                className="text-white/80 hover:text-white transition-colors p-1"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
}