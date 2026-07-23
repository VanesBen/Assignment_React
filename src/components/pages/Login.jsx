import Navbar from "../general/Navbar";
import emailIc from "../../assets/icon/email-ic.png"
import passIc from "../../assets/icon/pass-ic.png"
import eyeIc from "../../assets/icon/eye-ic.png"
import eyeCrossIc from "../../assets/icon/eye-cross-ic.png"
import { useState } from "react";
import Button from "../general/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import axiosClient from "../../axios-client";
import LoadingPulse from "../general/LoadingPulse";
import { ResponseAlert } from "../general/ResponseAlert";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {isLoading, setUser, setIsLoading, user, s} = useAuth();
    const [alert, setAlert] = useState({ type: "", message: "" });
    setIsLoading(false)
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault()
        setIsLoading(true)

        const payload = {
            email: email,
            password: password
        }

        console.log(payload)

        axiosClient.post('/auth/login',payload)
            .then(({data}) => {
                
                localStorage.setItem('ACCESS_TOKEN', data.data.token)
                localStorage.setItem('USER_DATA', JSON.stringify(data.data.user));
                setUser(data.data.user)
            
                if (data.data.user.role === 'admin') {
                    navigate('/admin/dashboard'); 
                } else if (data.data.user.role === 'seller') {
                    navigate('/seller/katalog');
                } else if (data.data.user.role === 'buyer') {
                    navigate('/user/katalog');
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
                        message: msg || "Format email atau password salah!"
                    });
                } else {
                    setAlert({
                        type: "error",
                        message: response?.data?.message || "Koneksi ke server gagal!"
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
                // Fungsi onClose untuk membersihkan state agar alert bisa ditutup
                onClose={() => setAlert({ type: "", message: "" })} 
            />
        )}
        {
            isLoading == true ? <LoadingPulse/> : null
        }
        <section id="login" className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#0f111a] px-4 py-12">
                
                {/* Kartu Login Box */}
                <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-gray-500 p-8 text-center shadow-xl md:p-10">
                    
                    <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                    <p className="text-sm text-white/90 leading-relaxed mb-8 max-w-[280px] mx-auto">
                        Welcome back. Ready to discover what’s new in tech?
                    </p>

                    {/* Form */}
                    <form className="flex flex-col gap-4 text-left">
                        
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

                        {/* Forgot Password Link */}
                        <div className="text-right -mt-1">
                            <a href="#forgot" className="text-xs text-white hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Tombol Submit */}
                        <Button onClick={onSubmit} title={"Login"}></Button>

                        <div className="text-right -mt-1">
                            <a href="/signup" className="text-xs text-white hover:underline">
                                Create Account
                            </a>
                        </div>
                    </form>

                </div>
            </section>
        </>
        
    )
}