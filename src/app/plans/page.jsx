"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import {
  FiCheck,
  FiUser,
  FiBriefcase,
  FiArrowRight,
  FiZap,
  FiShield,
  FiTrendingUp,
  FiHelpCircle,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

const PlansPage = () => {
  const [isRecruiter, setIsRecruiter] = useState(false);

  const tiers = {
    seeker: [
      {
        name: "Free",
        id: 'seeker_free',
        price: "$0",
        icon: FiUser,
        sub: "Essential features for your search",
        features: ["10 saved jobs", "3 applications/mo", "Basic profile setup", "Email notifications", "Standard listing access"],
      },
      {
        name: "Pro",
        id: 'seeker_pro',
        price: "$19",
        icon: FiTrendingUp,
        sub: "For active career advancement",
        features: ["30 applications/mo", "Unlimited saved jobs", "Application tracking", "Salary insights data", "Profile visibility boost"],
      },
      {
        name: "Premium",
        id: 'seeker_premium',
        price: "$39",
        icon: FiZap,
        sub: "The ultimate competitive edge",
        features: ["Unlimited applications", "Top-tier profile boost", "Early access to new roles", "Priority support access", "Personalized career coaching"],
      },
    ],
    recruiter: [
      {
        name: "Free",
        id: 'recruiter_free',
        price: "$0",
        icon: FiBriefcase,
        sub: "Perfect for startups and small teams",
        features: ["3 active job posts", "Basic applicant CRM", "Standard site visibility", "Company profile page", "Email alert system"],
      },
      {
        name: "Growth",
        id: 'recruiter_growth',
        price: "$49",
        icon: FiTrendingUp,
        sub: "Scale your hiring operations",
        features: ["10 active job posts", "Advanced tracking tools", "Candidate analytics", "Priority email support", "Custom job templates"],
      },
      {
        name: "Enterprise",
        id: 'recruiter_enterprise',
        price: "$149",
        icon: FiShield,
        sub: "Full suite for large organizations",
        features: ["50 active job posts", "Advanced dashboard data", "Featured listing priority", "Team collaboration seats", "Custom branding support"],
      },
    ],
  };

  const activePlans = isRecruiter ? tiers.recruiter : tiers.seeker;

  return (
    <div className="min-h-screen bg-[#020105] py-20 px-4">
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .text-shimmer {
          background: linear-gradient(90deg, #52525b, #ffffff, #52525b);
          background-size: 200% 100%;
          animation: shimmer 4s infinite linear;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>

      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-16 text-shimmer">
          Select Your Strategic Tier
        </h1>

        {/* Toggle */}
        <div className="inline-flex p-1 bg-zinc-900 mb-16 border border-zinc-800 rounded-2xl">
          {["Seekers", "Recruiters"].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setIsRecruiter(idx === 1)}
              className={`flex items-center gap-3 px-12 py-4 font-black uppercase tracking-widest transition-all rounded-2xl ${
                (idx === 1) === isRecruiter
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {idx === 0 ? <FiUser /> : <FiBriefcase />} {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {activePlans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#0a0a0c] border border-zinc-800 flex flex-col group hover:border-zinc-500 transition-all rounded-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <h3 className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-white">
                  <Icon /> {plan.name}
                </h3>
                <p className="text-xs text-zinc-600 mb-6 uppercase tracking-widest">
                  {plan.sub}
                </p>
                <div className="text-5xl font-black text-white mb-8">
                  {plan.price}
                  <span className="text-lg text-zinc-600">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1 text-left">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="text-zinc-400 text-xs flex items-start gap-3"
                    >
                      <FiCheck className="text-zinc-500 mt-1" /> {f}
                    </li>
                  ))}
                </ul>

                <form
                  action="/api/checkout_sessions"
                  method="POST"
                  className="w-full"
                >
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <button
                    type="submit"
                    className="w-full bg-zinc-900 border border-zinc-700 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-2xl h-12 flex items-center justify-center gap-2"
                  >
                    Checkout <FiArrowRight />
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white uppercase tracking-widest mb-10 border-l-4 border-white pl-4">
            <FiHelpCircle className="text-white" /> Support Hub
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes, you can seamlessly upgrade or downgrade your tier via your account settings dashboard at any time.",
              },
              {
                q: "What is the refund policy?",
                a: "We offer a 14-day money-back guarantee on all annual plans if you're not satisfied with our service.",
              },
              {
                q: "What payment methods are supported?",
                a: "We accept all major credit cards, PayPal, and provide invoicing for Enterprise-level users.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-[#0a0a0c] border border-zinc-800 p-6 group open:border-zinc-500 transition-all rounded-2xl"
              >
                <summary className="font-bold text-white uppercase tracking-wide cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-zinc-500 group-open:hidden">
                    <FiPlus />
                  </span>
                  <span className="text-white hidden group-open:block">
                    <FiMinus />
                  </span>
                </summary>
                <p className="text-zinc-400 mt-4 leading-relaxed text-sm pt-4 border-t border-zinc-800">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;