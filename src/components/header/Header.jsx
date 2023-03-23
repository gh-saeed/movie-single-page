import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrolly, setLastScrolly] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const searchQueryHandeler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/saerch/${query}`);
			setTimeout(() => {
				setShowSearch(false);
			}, 1000)
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItems">Movies</li>
                    <li className="menuItems">TV Shows</li>
                    <li className="menuItems">
                        <HiOutlineSearch />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            <div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandeler}
                        />
                        <VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                </ContentWrapper>
            </div>
        </header>
    );
};

export default Header;
