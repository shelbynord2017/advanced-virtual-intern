"use client"
import React, { useState } from 'react'
import pricing from '../../assets/pricing-top.png'
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import AccordionItem from '../components/AccordionItem';
import Checkout from '../components/Checkout'


export default function ChoosePlan() {

    const [planChoice, setPlanChoice] = useState('yearly')
    const [showCheckout, setShowCheckout] = useState(false)

    const priceId =
    planChoice === "yearly"
    ? "price_1TvOu0LBH7C63U8xreJ05JHy"
    : "price_1TvOubLBH7C63U8xuXhAHjbh";

    const buttonText =
    planChoice === "yearly"
    ? "Start your 7-day free trial"
    : "Start your monthly subscription";

    const handlePlanChoice = (event) => {
        setPlanChoice(event.target.value);
    };


  return (    
    <div className="wrapper__full">
        {/* <div className="sidebar__overlay sidebar__overlay--hidden"></div>
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
        <div className="plan">
            <div className="plan__header--wrapper">
                <div className="plan__header">
                    <div className="plan__title">
                        Get unlimited access to many amazing books to read
                    </div>
                    <div className="plan__sub--title">
                        Turn ordinary moments into amazing learning opportunities
                    </div>
                    <figure className='plan__img--mask'>
                        <img src={pricing.src} alt="" />
                    </figure>
                </div>
            </div>
            <div className="row">
                <div className="container">
                    <div className="plan__features--wrapper">
                        <div className="plan__features">
                            <figure className='plan__features--icon'>
                                <IoDocumentText className='plan__features--icon-img'/>
                            </figure>
                            <div className="plan__features--text">
                                <b>Key ideas in a few min</b>
                                " with many books to read"
                            </div>
                        </div>
                        <div className="plan__features">
                            <figure className='plan__features--icon'>
                                <RiPlantFill className='plan__features--icon-img'/>
                            </figure>
                            <div className="plan__features--text">
                                <b>3 million</b>
                                " people growing with Summarist everyday"
                            </div>
                        </div>
                        <div className="plan__features">
                            <figure className='plan__features--icon'>
                                <FaHandshake className='plan__features--icon-img'/>
                            </figure>
                            <div className="plan__features--text">
                                <b>Precise recommendations</b>
                                " collections curated by experts"
                            </div>
                        </div>
                    </div>
                    <div className="section__title">Choose the plan that fits you</div>
                    <button className={`plan__card ${planChoice === 'yearly' ? 'active' : ''}`}>
                        <input 
                        type="radio"
                        name='subscription'
                        value='yearly'
                        checked={planChoice === 'yearly'}
                        onChange={handlePlanChoice} />
                        <div className="plan__card--content">
                            <div className="plan__card--title">Premium Plus Yearly</div>
                            <div className="plan__card--price">$99.99/year</div>
                            <div className="plan__card--text">7-day free trial included</div>
                        </div>
                    </button>
                    <div className="plan__card--separator">
                        <div className="plan__separator">or</div>
                    </div>
                    <button className={`plan__card ${planChoice === 'monthly' ? 'active' : ''}`}>
                        <input 
                        type="radio"
                        name='subscription'
                        value='monthly'
                        checked={planChoice === 'monthly'}
                        onChange={handlePlanChoice} />
                        <div className="plan__card--content">
                            <div className="plan__card--title">Premium Monthly</div>
                            <div className="plan__card--price">$9.99/month</div>
                            <div className="plan__card--text">No trial included</div>
                        </div>
                    </button>
                    <div className="plan__card--cta">
                        <span className='btn--wrapper'>
                            <button 
                            onClick={() => setShowCheckout(true)}
                            className='btn'>
                                <span>{buttonText}</span>
                            </button>
                        </span>
                        <div className="plan__disclaimer">
                            Cancel your trial at any time before it ends, and you won't be charged.
                        </div>
                    </div>
                    {showCheckout && (
                    <Checkout priceId={priceId} />
                    )}
                    <div className="faq__wrapper">
                        <div className="accordion__card">
                            <AccordionItem
                                question="How does the 7-day free trial work?"
                                answer="Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, 
                                    and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, 
                                    and you may terminate your subscription prior to the conclusion of the 7-day free trial."
                            />
                        </div>
                        <div className="accordion__card">
                            <AccordionItem
                                question="Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
                                answer="While an annual plan is active, it is not feasible to switch to a monthly plan. 
                                    However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
                            />
                        </div>
                        <div className="accordion__card">
                            <AccordionItem
                                question="What's included in the Premium plan?"
                                answer="Premium membership provides you with the ultimate Summarist 
                                    experience, including unrestricted entry to many best-selling 
                                    books high-quality audio, the ability to download titles for offline reading, 
                                    and the option to send your reads to your Kindle."
                            />
                        </div>
                        <div className="accordion__card">
                            <AccordionItem
                                question="Can I cancel during my trial or subscription?"
                                answer="You will not be charged if you cancel your trial 
                                    before its conclusion. While you will not have complete 
                                    access to the entire Summarist library, you can still expand 
                                    your knowledge with one curated book per day."
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* import footer */}
        </div>
    </div>
  )
}

