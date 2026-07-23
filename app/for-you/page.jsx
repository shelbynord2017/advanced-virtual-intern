"use client"
import logo from '../../assets/logo.png'
import { FaHome, FaRegBookmark, FaPenAlt, FaSearch, FaPlayCircle, FaRegStar } from "react-icons/fa";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import { useAuth } from "../components/AuthContextProvider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function forYou() {
  
    const { logout } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [selectedBook, setSelectedBook] = useState([])
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const [suggestedBooks, setSuggestedBooks] = useState([])
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        console.log("logout clicked")
        try {
        console.log("before logout")
        await logout();
        console.log("after logout")
        router.push("/");
        } catch (err) {
        setError("invalid email or password");
        }
    };

    useEffect(()=> {
        async function fetchSelectedBook() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await response.json();
        setSelectedBook(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setSelectedBook([]);
        setLoading(false);
        }
    };
    fetchSelectedBook();
    }, []);


    useEffect(()=> {
        async function fetchRecommendedBooks() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        const data = await response.json();
        setRecommendedBooks(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setRecommendedBooks([]);
        setLoading(false)
        }
    };
    fetchRecommendedBooks();
    }, []);
    
    useEffect(()=> {
        async function fetchSuggestedBooks() {
        try {
        const response = await fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );
        const data = await response.json();
        setSuggestedBooks(data || []);
        setLoading(false);
        console.log(data)
        } catch (error) {
        console.error("Error fetching book:", error);
        setSuggestedBooks([]);
        setLoading(false)
        }
    };
    fetchSuggestedBooks();
    }, []);
  
  return (
    <>
        <div className="wrapper">
            <div className="search__background">
                <div className="search__wrapper">
                    <div className="search__content">
                        <div className="search">
                            <div className="search__input--wrapper">
                                <input 
                                    className='search__input'
                                    placeholder='Search for books'
                                    type="text" 
                                />
                                <div className="search__icon">
                                    <FaSearch  className="sidebar__icon--img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="sidebar__overlay sidebar__overlay--hidden"></div> */}
            <div className="sidebar sidebar__closed">
                <div className="sidebar__logo">
                    <img src={logo.src} alt="" />
                </div>
                <div className="sidebar__wrapper">
                    <div className="sidebar__top">
                        <a className="sidebar__link--wrapper">
                            <div className="sidebar__icon--wrapper">
                                <FaHome className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">For you</div>
                        </a>
                        <a className="sidebar__link--wrapper">
                            <div className="sidebar__icon--wrapper">
                                <FaRegBookmark className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">My library</div>
                        </a>
                        <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                            <div className="sidebar__icon--wrapper">
                                <FaPenAlt className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">Highlights</div>
                        </div>
                        <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                            <div className="sidebar__icon--wrapper">
                                <FaSearch  className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">Search</div>
                        </div>
                    </div>
                    <div className="sidebar__bottom">
                        <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                            <div className="sidebar__icon--wrapper">
                                <IoSettingsOutline className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">Settings</div>
                        </div>
                        <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                            <div className="sidebar__icon--wrapper">
                                <IoMdHelpCircle className="sidebar__icon--img" />
                            </div>
                            <div className="sidebar__link--text">Help & Support</div>
                        </div>
                        <a 
                        onClick={handleLogout}
                        className="sidebar__link--wrapper">
                            <div className="sidebar__icon--wrapper">
                                <IoLogOutOutline className="sidebar__icon--img" />
                            </div>
                            <div 
                            
                            className="sidebar__link--text">Logout</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="container">
                    <div className="for-you__wrapper">
                        <div className="for-you__title">
                            Selected just for you
                        </div>
                        <audio ></audio>
                        {selectedBook.map((book, index) => (
                        <button 
                        key={index} 
                        onClick={()=> router.push(`/book/${book.id}`)} 
                        className='selected__book'>
                            <div className="selected__book--sub-title">
                                {book.subTitle}
                            </div>
                            <div className="selected__book--line"></div>
                            <div className="selected__book--content">
                                <figure className='selected-book__image--wrapper'>
                                    <img className="selected-book__image" src={book.imageLink} alt="" />
                                </figure>
                                <div className="selected__book--text">
                                    <div className="selected__book--title">{book.title}</div> 
                                    <div className="selected__book--author">{book.author}</div>
                                    <div className="selected__book--duration-wrapper">
                                        <div className="selected__book--icon">
                                            <FaPlayCircle className='selected__book--icon' />
                                        </div>
                                        <div className="selected__book--duration">3 mins 23 secs</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                        ))} 
                        <div>
                            <div className="for-you__title">
                                Recommended For You
                            </div>
                            <div className="for-you__sub-title">
                                We think you'll like these
                            </div>
                            
                            <div className="for-you__recommended--books">
                                {recommendedBooks.map((book, index) => (
                                <button 
                                key={index} 
                                onClick={()=> router.push(`/book/${book.id}`)} 
                                className="for-you__recommended--books-link">
                                    {book.subscriptionRequired && 
                                        <div className="book__pill book__pill--subscription-required">
                                            Premium
                                        </div>
                                    }
                                    <audio></audio>
                                    <figure className='recommended-book__image--wrapper'>
                                        <img className="recommended-book__image" src={book.imageLink} />
                                    </figure>
                                    <div className="recommended__book--title">
                                        {book.title}
                                    </div>
                                    <div className="recommended__book--author">
                                        {book.author}
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        {book.subTitle}
                                    </div>
                                    <div className="recommended__book--details-wrapper">
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <CiClock2 />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                03:24
                                            </div>
                                        </div>
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <FaRegStar />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                {book.averageRating}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                 ))}
                            </div>
                           
                        </div>
                        <div>
                            <div className="for-you__title">
                                Suggested Books
                            </div>
                            <div className="for-you__sub-title">
                                Browse those books
                            </div>
                            <div className="for-you__recommended--books">
                                {suggestedBooks.map((book, index) => (
                                <button 
                                key={index} 
                                onClick={()=> router.push(`/book/${book.id}`)} 
                                className="for-you__recommended--books-link">
                                    <div className="book__pill book__pill--subscription-required">{book.subscriptionRequired && "Premium"}</div>
                                    <audio ></audio>
                                    <figure className='book__image--wrapper'>
                                        <img className="book__image" alt=""src={book.imageLink} />
                                    </figure>
                                    <div className="recommended__book--title">
                                        {book.title}
                                    </div>
                                    <div className="recommended__book--author">
                                        {book.author}
                                    </div>
                                    <div className="recommended__book--sub-title">
                                        {book.subTitle}
                                    </div>
                                    <div className="recommended__book--details-wrapper">
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <CiClock2 />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                03:24
                                            </div>
                                        </div>
                                        <div className="recommended__book--details">
                                            <div className="recommended__book--details-icon">
                                                <FaRegStar />
                                            </div>
                                            <div className="recommended__book--details-text">
                                                {book.averageRating}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>  
  )
}
