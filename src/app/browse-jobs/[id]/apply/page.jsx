import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import JobApply from "./JobApply";
import { getJobById } from "@/lib/api/jobs";
import { getApplicationByApplicant } from "@/lib/api/applications";
import { FiCreditCard, FiAlertCircle } from "react-icons/fi";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) redirect(`/sign-in?redirect=/browse-jobs/${id}/apply`);

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020105]">
        <div className="w-full max-w-md p-8 bg-[#0a0a0c] border-l-4 border-yellow-500 shadow-2xl animate-pulse">
          <FiAlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white text-center">
            Access Denied
          </h1>
          <p className="text-zinc-400 text-center mt-2">
            Only seekers can access this.
          </p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationByApplicant(user?.id);

  const plan = await getPlanById(user?.plan || 'seeker_free')
  
  

  const job = await getJobById(id);

  return (
    <div className="min-h-screen bg-[#020105] py-20 px-4 font-sans text-zinc-100">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Stats Container with Tailwind-native Pulse & Gradient */}
        <div className="p-8 bg-[#0a0a0c] border border-zinc-800 relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-shadow duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />

          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <FiCreditCard /> {plan.name} Plan
            </div>
            <h2 className="text-4xl font-black text-white">
              {applications.length} / {plan.maxApplicationPerMonth}{" "}
              <span className="text-zinc-600">Applications</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              You have used your quota. Need more?
              <Link
                className="text-blue-400 hover:text-white ml-2 font-bold underline transition-colors"
                href="/plans"
              >
                View Plans
              </Link>
            </p>
          </div>
        </div>

        {/* Application Section */}
        {applications.length < parseInt(plan.maxApplicationPerMonth) ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <JobApply applicant={user} job={job} />
          </div>
        ) : (
          <div className="p-8 border border-red-500/30 bg-red-950/10 text-center text-red-400 font-bold uppercase tracking-widest">
            Limit reached. Upgrade to continue applying.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
