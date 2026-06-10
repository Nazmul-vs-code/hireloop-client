import React from 'react';
import { FiCheckCircle, FiMail, FiArrowRight, FiHome } from 'react-icons/fi';
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import Link from 'next/link';
import { createSubscriptions } from '@/lib/actions/subsciptions';

export default async function Success({ searchParams }) {
  // Await the searchParams promise
  const { session_id } = await searchParams;

  if (!session_id) return redirect('/');

  // Destructure status and customer_details directly from the result
  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  console.log(metadata , ' meta data')
  // console.log( status , ' status ')
  if (status === 'open') return redirect('/');

  if (status === 'complete') {

    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId
    }

    const result = await createSubscriptions(subsInfo)
    console.log(result , ' result of subscriptions ')

    return (
      <div className="min-h-screen bg-[#020105] flex items-center justify-center p-6">
        <main className="max-w-lg w-full bg-[#0a0a0c] border border-zinc-800 p-12 rounded-2xl text-center space-y-8 shadow-[0_0_40px_rgba(34,197,94,0.15)] animate-pulse">
          
          {/* Animated Icon */}
          <div className="mx-auto w-20 h-20 bg-emerald-950/30 border border-emerald-900 flex items-center justify-center rounded-full">
            <FiCheckCircle className="text-emerald-500 w-10 h-10 animate-bounce" />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              Payment Received
            </h1>
            <p className="text-zinc-400 leading-relaxed text-sm">
              We appreciate your business! A confirmation email has been sent to {customerEmail}. 
              You can now access your new features.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <Link 
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-xl h-12"
            >
              Access Dashboard <FiArrowRight />
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full border border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest hover:border-white hover:text-white transition-all rounded-xl h-12"
            >
              <FiHome /> Back Home
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-zinc-800 flex items-center justify-center gap-2 text-zinc-600 text-xs uppercase tracking-widest">
            <FiMail /> Need help? 
            <a href={`mailto:orders@example.com`} className="text-white underline underline-offset-4">
              Contact Support
            </a>
          </div>
        </main>
      </div>
    );
  }
}