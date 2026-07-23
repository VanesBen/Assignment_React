import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../general/Navbar";
import axiosClient from "../../axios-client";
import LoadingPulse from "../general/LoadingPulse";

export default function ProductCategories() {
    const {isLoading, setUser, setIsLoading, user} = useAuth();
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [users, setUsers] = useState([])

    function loadUser() {
        axiosClient.get('/categories/')
            .then(({data}) => {
                setUsers(data.data)
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

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <>
        {
            isLoading == true ?  <LoadingPulse/> : null
        }
        <section className="flex flex-col gap-4">
            {
                users == null ? null : 
                users.map((item) => {
                    return (
                        <div key={item.id} className="rounded-xl bg-gray-200 px-4 flex justify-between items-center py-4">
                            <div className="text-black">
                                <h1 className="font-bold text-[18px]">{item.name}</h1>
                                <p className="font-normal text-[12px]">{item.description}</p>
                            </div>
                            {/* <div>
                                <a href={`/admin/dashboard/${item.id}`} className="text-accent font-bold hover:cursor-pointer">View Detail</a>
                            </div> */}
                        </div>
                    )
                })
            }
        </section>
        </>
    )
}
