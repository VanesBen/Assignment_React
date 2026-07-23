import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import LoadingPulse from "../general/LoadingPulse";
import Button from "../general/Button";

export default function UserDetail() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [user, setUser] = useState()
    const {isLoading, setIsLoading} = useAuth();

    const { id } = useParams()

    function loadUser() {
        axiosClient.get(`/auth/${id}`)
            .then(({data}) => {
                setUser(data.data)
            })
            .catch(err => {
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
                    // Handle error selain 422 (misal server mati, atau 500)
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

    function back() {
        navigate("/admin/dashboard")
    }

    useEffect(()=> {
        loadUser()
    }, [])

    return (
        <> 
        {
            isLoading == true ?  <LoadingPulse/> : null
        }
        {
            user != null ? 
            <>
            <div className="ml-5">
                <Button title={"Back"} onClick={back}/>
            </div>
            <section className="flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {user.name}
                        </h2>
                        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30">
                        {user.role}
                        </span>
                    </div>
                    </div>

                    <div className="mt-5 space-y-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Email Address
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {user.email}
                        </p>
                    </div>
                    </div>

                </div>
            </section>
            </>
             :
            null
        }
        
        </>
    )
}