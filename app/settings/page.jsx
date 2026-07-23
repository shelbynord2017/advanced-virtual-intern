"use client"
import search from "../../assets/search-icon.png"
import logo from "../../assets/logo.png"
import home from "../../assets/home-icon4.png"
import bookmark from "../../assets/bookmark-icon2.png"
import pen from "../../assets/pen-icon.png"
import settings from "../../assets/settings-icon.png"
import question from "../../assets/question-icon.png"
import logout from "../../assets/logout-icon.png"
import login from '../../assets/login.png'


export default function Settings() {
  return (
    <div className="wrapper">
        {/* <div className="search__background">
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
                                <img className="search__icon--img" src={search.src} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="sidebar__overlay sidebar__overlay--hidden"></div>
        <div className="sidebar sidebar__closed">
            <div className="sidebar__logo">
                <img src={logo.src} alt="" />
            </div>
            <div className="sidebar__wrapper">
                <div className="sidebar__top">
                    <a className="sidebar__link--wrapper">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={home.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">For you</div>
                    </a>
                    <a className="sidebar__link--wrapper">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={bookmark.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">My library</div>
                    </a>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={pen.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">Highlights</div>
                    </div>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={search.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">Search</div>
                    </div>
                </div>
                <div className="sidebar__bottom">
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={settings.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">Settings</div>
                    </div>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={question.src} alt="" />
                        </div>
                        <div className="sidebar__link--text">Help & Support</div>
                    </div>
                    <a 
                    onClick={handleLogout}
                    className="sidebar__link--wrapper">
                        <div className="sidebar__icon--wrapper">
                            <img className="sidebar__icon--img" src={logout.src} alt="" />
                        </div>
                        <div 
                        
                        className="sidebar__link--text">Logout</div>
                    </a>
                </div>
            </div>
        </div> */}
        <div className="container">
            <div className="row">
                <div className="section__title page__title">Settings</div>
                <div className="settings__login--wrapper">
                    <img src={login.src} alt="" />
                    <div className="settings__login--text">
                        Login to your account to see you details.
                    </div>
                    <button className='btn settings__login--btn'>
                        Login
                    </button>
                </div>
            </div>
        </div>

        <div className="setting__content">
            <div className="settings__sub--title">
                Your Subscription Plan
            </div>
            <div className="settings__text">
                premium
            </div>
        </div>
        <div className="setting__content">
            <div className="settings__sub--title">
                Email
            </div>
            <div className="settings__text">
                hannah@gmail.com
            </div>
        </div>
    </div>
    
  )
}
