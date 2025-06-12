import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";


export default function Root() {
    return(
        <>  
            <header>
                <Header/>
            </header>            
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>        
    );
}