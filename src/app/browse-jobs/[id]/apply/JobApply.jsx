'use client';
import React from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea } from '@heroui/react';
import { toast } from 'react-toastify';
import { submitApplications } from '@/lib/actions/applications';
import { getApplicationByApplicant } from '@/lib/api/applications';

const JobApply = ({ job, applicant }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const submissionData = {
            jobId: job?._id,
            jobTitle: job.jobTitle,
            applicantName: applicant.name,
            applicantId: applicant?.id,
            companyName: job?.companyName,
            status:'applied',
            ...data,
        };

        

        const res = await submitApplications(submissionData)
        
        if (res.insertedId) {
            toast.success("Application submitted successfully!");
            console.log("Application Submitted Successfully: ", submissionData);
            // setFormData({})
        }
    };

    const validateUrl = (value) => {
        // If optional field is empty, it's valid

        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return "Please enter a valid URL (e.g., https://example.com)";
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-16 p-8 bg-[#0a0a0c] border-t-4 border-indigo-500 shadow-2xl">
            <div className="mb-8 border-b border-zinc-800 pb-6">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                    Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{job.jobTitle}</span>
                </h1>
                <p className="text-zinc-500 mt-2">Submit your application for <span className="text-zinc-300 font-bold">{job.companyName}</span></p>
            </div>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6" validationBehavior="native">
                <TextField name="name" defaultValue={applicant.name} isReadOnly>
                    <Label className="text-blue-400 text-xs font-bold uppercase tracking-widest">Full Name</Label>
                    <Input className="bg-zinc-950 border-b-2 border-zinc-800 focus:border-blue-500 p-2" />
                </TextField>

                <TextField name="email" defaultValue={applicant.email} isReadOnly>
                    <Label className="text-blue-400 text-xs font-bold uppercase tracking-widest">Email Address</Label>
                    <Input className="bg-zinc-950 border-b-2 border-zinc-800 focus:border-blue-500 p-2" />
                </TextField>

                {/* Resume Link - Mandatory */}
                <TextField name="resumeUrl" isRequired validate={(val) => {
                    try { new URL(val); return true; } catch { return "Please enter a valid URL"; }
                }}>
                    <Label className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Resume Link (URL)</Label>
                    <Input placeholder="https://..." className="bg-zinc-950 border-b-2 border-zinc-800 focus:border-emerald-500 p-2" />
                    <Description className="text-xs text-zinc-600">A public link to your resume is required.</Description>
                    <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>

                {/* Portfolio Link - Added separately as optional */}
                <TextField name="portfolioUrl" validate={validateUrl}>
                    <Label className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Portfolio Link (Optional)</Label>
                    <Input placeholder="https://..." className="bg-zinc-950 border-b-2 border-zinc-800 focus:border-emerald-500 p-2" />
                    <Description className="text-xs text-zinc-600">Link to your work/projects.</Description>
                    <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>

                <div className="flex flex-col gap-2">
                    <Label className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Cover Letter (Optional)</Label>
                    <TextArea
                        name="coverLetter"
                        fullWidth
                        placeholder="Why are you a good fit?"
                        variant="bordered"
                        className="bg-zinc-950 border-2 border-zinc-800 focus:border-indigo-500"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold uppercase tracking-widest rounded-none shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
                    >
                        Submit Application
                    </Button>
                    <Button
                        type="reset"
                        className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest rounded-none hover:bg-zinc-800"
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;