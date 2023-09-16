import Stripe from 'stripe';
import { Config } from 'sst/node/config';
import handler from '@notes/core/handler';
import { calculateCost } from '@notes/core/cost';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = handler(async (event: APIGatewayProxyEvent) => {
    const { storage, source } = JSON.parse(event.body || "{}");
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    const stripe = new Stripe(Config.STRIPE_SECRET_KEY, {
        apiVersion: '2023-08-16'
    })

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: 'eur',
    });

    return JSON.stringify({ status: true })
})