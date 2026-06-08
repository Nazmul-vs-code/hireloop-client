import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import { FiMapPin, FiBriefcase, FiCheckCircle, FiGlobe, FiClock, FiLayers } from 'react-icons/fi';
import { Button, Card, Chip } from '@heroui/react';
import Link from 'next/link';

const JobDetailsPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) return <div className="text-white p-20 text-center">Job not found.</div>;

    return (
        <div className="min-h-screen bg-[#020105] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12 border-b border-zinc-800 pb-12">
                    <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-extrabold mb-4 text-white uppercase tracking-tight">{job.jobTitle}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-zinc-400">
                            <span className="flex items-center gap-2 font-bold text-white"><FiGlobe /> {job.companyName}</span>
                            <span className="flex items-center gap-2"><FiMapPin /> {job.location}</span>
                            <Chip radius="none" variant="flat" color="primary" className="text-xs uppercase font-bold">{job.jobCategory}</Chip>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Content Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 uppercase tracking-widest"><FiBriefcase className="text-indigo-500" /> Responsibilities</h3>
                            <Card radius="none" className="bg-zinc-900/20 border border-zinc-800 shadow-none p-8">
                                <div className="text-zinc-300 leading-relaxed">{job.responsibilities}</div>
                            </Card>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 uppercase tracking-widest"><FiCheckCircle className="text-emerald-500" /> Requirements</h3>
                            <Card radius="none" className="bg-zinc-900/20 border border-zinc-800 shadow-none p-8">
                                <div className="text-zinc-300 leading-relaxed">{job.requirements}</div>
                            </Card>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card radius="none" className="sticky top-10 bg-[#0a0a0c] border border-zinc-800 p-6 shadow-none">
                            <div className="mb-6">
                                <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Compensation</p>
                                <h2 className="text-3xl font-black text-emerald-400">
                                    {job.currency} {Number(job.salaryMin).toLocaleString()} - {Number(job.salaryMax).toLocaleString()}
                                </h2>
                            </div>
                            
                            <div className="w-full border-b border-zinc-800 mb-6" />

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><FiLayers /> Type</span>
                                    <span className="font-bold">{job.jobType}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500 text-sm flex items-center gap-2"><FiClock /> Posted</span>
                                    <span className="font-bold">{new Date(job.createdAt.$date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* FIXED: Using a standard Next.js Link wrapper instead of 'as={Link}' */}
                            <Link href={`/apply/${job._id}`} className="block w-full">
                                <Button 
                                    radius="none" 
                                    size="lg" 
                                    className="w-full bg-white text-black font-bold uppercase tracking-widest"
                                >
                                    Apply Now
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;