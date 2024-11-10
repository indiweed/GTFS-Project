import React from "react";
import '../Sidebar/sidebar.css';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchMenu from "../SearchMenu/SearchMenu";

export default function Sidebar() {
    return (
        <>
        <BurgerMenu/>
        <SearchMenu/>
        </>
    )
}