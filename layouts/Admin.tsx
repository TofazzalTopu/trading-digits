import React from "react";
import Sidebar from "../components/SideBar";
import Footer from "../components/SideBar/footer";


export default function Admin({ children }) {
    return (
        <>
            <Sidebar />
            <div className="relative width-controller bg-black">
                {/* <AdminNavbar /> */}
                {/* Header */}
                {/* <HeaderStats /> */}
                <div className="px-4 mx-auto w-full -m-24 bg-black">
                    {children}
                    {/* <FooterAdmin /> */}
                    <Footer />
                </div>
            </div>

        </>
    );
}
