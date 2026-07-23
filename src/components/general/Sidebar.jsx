import { Link } from "react-router";

export default function Sidebar() {

    const linksSeller = [
        {
            path: "",
            link_name: "Overview"
        },
                {
            path: "",
            link_name: "Create Product"
        },
    ]

    return (
        <nav className="flex h-10">
            <ul className="flex flex-col">
                {
                    linksSeller.map((item) => {
                        return (
                            <li>
                                <Link to={item.path} >{item.link_name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}