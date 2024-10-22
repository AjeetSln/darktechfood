import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './navbar.css';

const Navbar = ({ query, setQuery, isMenuOpen, toggleMenu }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleCancelClick = () => {
        setQuery('');
    };

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector(".navbar");
            if (navbar) {
                navbar.classList.toggle("active", window.scrollY > 100);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <marquee className="mar">
                <h2 className='hed'>Welcome to Darktech Food</h2>
            </marquee>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/home">Darktech</a>
                <button className="navbar-toggler" onClick={toggleMenu} type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`navbar-collapse ${isMenuOpen ? 'show' : 'collapse'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Admin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                </div>
                <form>
                <div className="search">
                    <BiSearch className='search_icon' />
                    <input
                        type="search"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder='Search Any Food....'
                        className="search-input"
                    />
                    <MdCancel onClick={handleCancelClick} className='cancel' />
                </div>
                </form>
            </nav>
        </div>
    );
};

export default Navbar;
