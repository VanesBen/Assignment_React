import emailIc from "../../assets/icon/email-ic.png"
import nameIc from "../../assets/icon/name-ic.png"
import passIc from "../../assets/icon/pass-ic.png"
import eyeIc from "../../assets/icon/eye-ic.png"
import eyeCrossIc from "../../assets/icon/eye-cross-ic.png"
import Button from "../general/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Navbar from "../general/Navbar";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client"
import LoadingPulse from "../general/LoadingPulse"
import { ResponseAlert } from "../general/ResponseAlert"

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const {isLoading, setUser, setIsLoading, user, s} = useAuth();
    const [alert, setAlert] = useState({ type: "", message: "" });
    
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault()
        setIsLoading(true)

        const payload = {
            name: name,
            email: email,
            role: role,
            password: password,
            password_confirmation: passwordConfirmation,
            balance: 0
        }

        console.log(payload)

        axiosClient.post('/auth/register',payload)
            .then(({data}) => {

                localStorage.setItem('ACCESS_TOKEN', data.data.token)
                setUser(data.data.user)
            
                setAlert({
                    type: "success",
                    message: data.data.message || "User successfully Created"
                });

                if (data.data.user.role === 'admin') {
                    navigate('/admin/dashboard'); 
                } else if (data.data.user.role === 'seller') {
                    navigate('/seller/katalog');
                } else if (data.data.user.role === 'buyer') {
                    navigate('/seller/katalog');
                } else {
                    navigate('/');
                }


            })
            .catch(err => {
                console.error("Ada yang salah di proses login:", err);
                const response = err.response;
                
                if (response && response.status === 422) {
                    // Ambil pesan error dari API, atau pakai default message jika tidak ada
                    const apiError = response.data.errors;
                    const msg = typeof apiError === 'object' 
                        ? Object.values(apiError).flat().join('\n') 
                        : response.data.message;

                    setAlert({
                        type: "error",
                        message: msg || "Email or password wrong!"
                    });
                } else {
                    // Handle error selain 422 (misal server mati, atau 500)
                    setAlert({
                        type: "error",
                        message: response?.data?.message || "Failed connect to server!"
                    });
                }
            }).finally (
                () => {
                    setIsLoading(false)
                }
            )
    }

    return (
        <>
        {alert.message && (
            <ResponseAlert
                errorType={alert.type} 
                errorMessage={alert.message} 
                onClose={() => setAlert({ type: "", message: "" })} 
            />
        )}
        {
            isLoading == true ? <LoadingPulse /> : null
        }
        <Navbar/>
        <section id="login" className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#0f111a] px-4 py-12">
                
                <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-gray-500 p-8 text-center shadow-xl md:p-10">
                    
                    <h1 className="text-3xl font-bold text-white mb-2">Sign-Up</h1>
                    <p className="text-sm text-white/90 leading-relaxed mb-8 max-w-80 mx-auto">
                        Create your account and access the world's most advanced digital marketplace.
                    </p>

                    {/* Form */}
                    <form className="flex flex-col gap-4 text-left">
                        
                        {/* Input Name */}
                        <div className="relative flex items-center">
                            <img 
                                className="absolute left-4 w-5 h-5 object-contain pointer-events-none opacity-80" 
                                src={nameIc} 
                                alt="Name icon" 
                            />
                            <input 
                                className="w-full rounded-full bg-[#3d3f47] py-3.5 pl-12 pr-4 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                                placeholder="Name" 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input Email */}
                        <div className="relative flex items-center">
                            <img 
                                className="absolute left-4 w-5 h-5 object-contain pointer-events-none opacity-80" 
                                src={emailIc} 
                                alt="Email icon" 
                            />
                            <input 
                                className="w-full rounded-full bg-[#3d3f47] py-3.5 pl-12 pr-4 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                                placeholder="Email" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Select Role */}

                        <div className="relative flex items-center">
                            {/* Ikon di Sisi Kiri (Menggunakan SVG Pengguna/Role agar selaras dengan input email lu) */}
                            <div className="absolute left-4 pointer-events-none opacity-80 text-white">
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                    />
                                </svg>
                            </div>

                            {/* Elemen Select */}
                            <select 
                                className="w-full rounded-full bg-[#3d3f47] py-3.5 pl-12 pr-10 text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm appearance-none cursor-pointer"
                                value={role} // Pastikan sudah membuat state: const [role, setRole] = useState("buyer")
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="" disabled className="bg-[#3d3f47] text-white/60">
                                    Select your role
                                </option>
                                <option value="buyer" className="bg-[#3d3f47] text-white">
                                    Buyer
                                </option>
                                <option value="seller" className="bg-[#3d3f47] text-white">
                                    Seller 
                                </option>
                            </select>

                            {/* Ikon Panah Kustom di Sisi Kanan (Karena appearance-none mematikan panah bawaan browser) */}
                            <div className="absolute right-4 pointer-events-none opacity-80 text-white">
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M19 9l-7 7-7-7" 
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Input Password */}
                        <div className="relative flex items-center">
                            <img 
                                className="absolute left-4 w-5 h-5 object-contain pointer-events-none opacity-80" 
                                src={passIc} 
                                alt="Password icon" 
                            />
                            <input 
                                className="w-full rounded-full bg-[#3d3f47] py-3.5 pl-12 pr-12 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                                placeholder="Password" 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* Tombol Toggle Show/Hide Password */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 focus:outline-none hover:opacity-80 transition-opacity"
                            >
                                <img 
                                    className="w-5 h-5 object-contain" 
                                    src={showPassword ? eyeIc : eyeCrossIc} 
                                    alt="Toggle password visibility" 
                                />
                            </button>
                        </div>

                        {/* Input Password Confirmation */}
                        <div className="relative flex items-center">
                            <img 
                                className="absolute left-4 w-5 h-5 object-contain pointer-events-none opacity-80" 
                                src={passIc} 
                                alt="Password icon" 
                            />
                            <input 
                                className="w-full rounded-full bg-[#3d3f47] py-3.5 pl-12 pr-12 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                                placeholder="Password" 
                                type={showPassword2 ? "text" : "password"}
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                            {/* Tombol Toggle Show/Hide Password */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword2(!showPassword2)}
                                className="absolute right-4 focus:outline-none hover:opacity-80 transition-opacity"
                            >
                                <img 
                                    className="w-5 h-5 object-contain" 
                                    src={showPassword2 ? eyeIc : eyeCrossIc} 
                                    alt="Toggle password visibility" 
                                />
                            </button>
                        </div>

                         <div className="text-right -mt-1 flex justify-end gap-2">
                            <p className="text-xs">Already have account?</p>
                            <a href="/login" className="text-xs font-bold text-white hover:underline">
                                Login
                            </a>
                        </div>

                        {/* Tombol Submit */}
                        <Button onClick={onSubmit} title={"Sign-Up"}></Button>

                       
                    </form>

                </div>
            </section>
        </>
        
    )
}