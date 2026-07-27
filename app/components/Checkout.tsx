'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'
import { auth } from '@/app/firebase'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout({ priceId }: { priceId: string }) {
  const startCheckoutSessionForProduct = useCallback(async () => {
    console.log("fetchClientSecret called");
    const user = auth.currentUser

    if (!user) {
      throw new Error('You must be logged in before subscribing')
    }

    const idToken = await user.getIdToken()
    console.log("Calling startCheckoutSession");
    return startCheckoutSession(priceId, idToken)
  }, [priceId])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: startCheckoutSessionForProduct
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

