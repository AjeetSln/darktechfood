import React, { useEffect, useState } from 'react';
import { getAllMenuItems } from './apiService';  // Adjust the path as needed
import FoodItem from './FoodItem';  // Adjust the path as needed
import './MenuList.css';
import { BiSearch } from 'react-icons/bi';
import { MdAdd, MdCancel, MdRemove } from 'react-icons/md';
import { BsHouseFill, BsPersonCircle, BsKeyFill, BsFillTrash2Fill } from 'react-icons/bs';
import './navbar.css';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar'; // Import useNavigate
import Footer from './Footer';

// Adjust the path as needed
const images = [
    'src/components/res1.jpg',
    'src/components/res2.jpg',
    'src/components/res3.jpg',
];

const MenuList = ({ cart, setCart }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [query, setQuery] = useState('');
    // const [cart, setCart] = useState([]);
    const [itemAmount, setitemAmount] = useState(0);
    const [total, settotal] = useState(0);
    const [AutoSliderVisible, SetAutoSliderVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Initialize useNavigate

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

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await getAllMenuItems();
                setMenuItems(data);
                setFilteredProducts(data); // Initialize with all items
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (query === '') {
            setFilteredProducts(menuItems);
        } else {
            const filtered = menuItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [query, menuItems]);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    // const handleClick = () => {
    //     SetAutoSliderVisible(false);
    // }

    const handleCancelClick = () => {
        setQuery('');
    }

    const handleAddToCart = (item) => {
        const newItem = { ...item, amount: 1 };
        const cartItem = cart.find((cartItem) => cartItem._id === item._id);

        if (cartItem) {
            setCart(cart.map((cartItem) =>
                cartItem._id === item._id
                    ? { ...cartItem, amount: cartItem.amount + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, newItem]);
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };





    const removeFromCart = (quantity) => {
        const newcart = cart.filter((items) => {
            return items.quantity !== quantity;
        });
        setCart(newcart)
    }
    const clearCart = () => {
        setCart([]);
    }
    useEffect(
        () => {

            const total = cart.reduce((accumulator, currentItem) => {

                const priceAsNumber = parseFloat(currentItem.price);

                if (isNaN(priceAsNumber)) {

                    return accumulator

                }

                return accumulator + priceAsNumber * currentItem.amount;

            }, 0);

            settotal(total);

        }, [cart]

    );
    useEffect(

        () => {

            if (cart) {

                const amount = cart.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.amount;
                }, 0);

                setitemAmount(amount);

            }

        }, [cart]
    );
    const increaseAmount = (quantity) => {
        const cartItem = cart.find((items) => items.quantity = quantity);
        addToCart(cartItem, quantity)
    };
    const decreaseAmount = (quantity) => {
        const cartItem = cart.find((items) => {
            return items.quantity === quantity;
        });
        if (cartItem) {
            const newcart = cart.map((items) => {
                if (items.quantity === quantity) {
                    return { ...items, amount: cartItem.amount - 1 }
                } else {
                    return items
                }
            });
            setCart(newcart);
        } else {
            if (cartItem.amount < 1) {
                removeFromCart(quantity);
            }
        }
    }
    const handleViewCart = () => {
        console.log("Navigating to cart with items:", cart);
        navigate('/cart', { state: { cartItems: cart } });
    };


    return (
        <div>
            {/* Navbar */}
            
            <Navbar 
                query={query} 
                setQuery={setQuery} 
                isMenuOpen={isMenuOpen} 
                toggleMenu={toggleMenu} 
            />

            {/* AutoSlider */}
            <div className="carousel">
                <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
                <div className="dots">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            </div>

            {/* Menu List */}
            <div className='Headline'>
                Enjoy Latest Food in our Canteen
            </div>
            <div className="menu-list">
                {filteredProducts.map((item) => (
                    <FoodItem key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
            </div>

            {/* Fixed View Cart Button */}
            <button onClick={handleViewCart} className="fixed-cart-button">
                View Cart ({itemAmount}) items)
            </button>

            <Footer/>
        </div>

    );

};

export default MenuList;
