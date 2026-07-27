"use client"
import { useEffect, useState } from "react"
import login from '../../assets/login.png'
import Modal from "../components/Modal";
import { useAuth } from "../components/AuthContextProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


export default function Settings() {

    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        if (!user || user.isAnonymous) {
            setLoading(false);
            return;
        }

    async function getData() {
        try {
        const userDoc = await getDoc(
            doc(db, "users", user.uid)
        );
        
        if (!userDoc.exists()) {
            throw new Error("User document was not found.");
        }

        const subscriptionId =
            userDoc.data().stripeSubscriptionId;

        if (!subscriptionId) {
            throw new Error(
            "This user does not have a subscription."
            );
        }

        const res = await fetch(
            `/api/subscription?sub_id=${encodeURIComponent(
            subscriptionId
            )}`
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
            data.error || "Unable to load subscription."
            );
        }

        setSubscription(data);
        } catch (err) {
        console.error(
            "Error fetching subscription:",
            err
        );
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    getData();
    }, [user]);

    if (!user || user.isAnonymous) {
        return (
            <div className="wrapper">
            <div className="container">
                <div className="row">
                <div className="section__title page__title">
                    Settings
                </div>

                <div className="settings__login--wrapper">
                    <img src={login.src} alt="" />

                    <div className="settings__login--text">
                    Login to your account to see your details.
                    </div>

                    <button
                    className="btn settings__login--btn"
                    onClick={() => setIsModalOpen(true)}
                    >
                    Login
                    </button>
                </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                error={error}
                setError={setError}
            />
            </div>
        );
    }
  
    if (loading) return <div>Loading settings...</div>;


  return (
    
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="section__title page__title">
            Settings
          </div>

          <div className="setting__content">
            <div className="settings__sub--title">
              Your Subscription Plan
            </div>

            <div className="settings__text">
              {subscription?.planName}
            </div>
          </div>

          <div className="setting__content">
            <div className="settings__sub--title">
              Email
            </div>

            <div className="settings__text">
              {subscription?.customerEmail}
            </div>
          </div>
        </div>
      </div>
    </div>
    );

}