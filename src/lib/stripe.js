import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1Tg08wFgRHekoIkItEmQKGlf',
    'seeker_premium': 'price_1Tg3ViFgRHekoIkIgTNpICWX',
    'recruiter_growth': 'price_1Tg3UqFgRHekoIkIDuY4FE5T',
    'recruiter_enterprise': 'price_1Tg3UDFgRHekoIkIjrB8OnWM'
}