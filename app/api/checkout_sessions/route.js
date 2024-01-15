import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req, res) {
  const headersList = headers();
  const request = await req.json();
  const cartDetailsArray = Object.values(request);

  if (req.method === 'POST') {

    const lineItems = cartDetailsArray.map((item) => {
      const img = item.image[0].url;
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [img],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity
      }
    })
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1OXbtfJCglCarSCaTC27Efws'},
            { shipping_rate: 'shr_1OXbv1JCglCarSCa5P6gMl1k'},
        ],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${headersList.get("origin")}/success`,
        cancel_url: `${headersList.get("origin")}/canceled`,
      }
      const session = await stripe.checkout.sessions.create(params);
      
      return NextResponse.json({sessionId: session.id});
    } catch (err) {
      return NextResponse.json({error: "Error creating checkout session"});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}



