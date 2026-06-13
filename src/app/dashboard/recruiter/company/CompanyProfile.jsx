"use client";

import { createCompany, updateCompany } from '@/lib/actions/companys';
import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiBriefcase, FiMapPin, FiGlobe, FiGrid, FiFileText, 
  FiUsers, FiUploadCloud, FiX, FiEdit2, FiCheckCircle, 
  FiXCircle, FiClock, FiLoader, FiCalendar 
} from "react-icons/fi";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    category: "Technology",
    websiteUrl: "",
    location: "",
    employeeRange: "1-10 employees",
    description: "",
  });


  console.log(recruiter)

  useEffect(() => {
    setCompanyData(recruiterCompany || null);
    setIsInitializing(false);
  }, [recruiterCompany]);

  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved') return { icon: FiCheckCircle, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (s === 'rejected') return { icon: FiXCircle, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
    return { icon: FiClock, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    if (!companyData) return;
    setFormData({
      companyName: companyData.companyName || "",
      category: companyData.category || "Technology",
      websiteUrl: companyData.websiteUrl || "",
      location: companyData.location || "",
      employeeRange: companyData.employeeRange || "1-10 employees",
      description: companyData.description || "",
    });
    setIsOpen(true);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalizedPayload = { ...formData,
         recruiterId: recruiter.id,
          status: 'pending',
          recruiterEmail: recruiter.email,

      };
      if (companyData?._id) {
        await updateCompany(companyData._id, finalizedPayload);
        setCompanyData((prev) => ({ ...prev, ...finalizedPayload }));
      } else {
        const res = await createCompany(finalizedPayload);
        setCompanyData({ _id: res.insertedId, ...finalizedPayload, createdAt: new Date() });
      }
      setIsOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) return <div className="min-h-screen flex items-center justify-center bg-[#020105]"><FiLoader className="w-8 h-8 animate-spin text-indigo-500" /></div>;

  const statusCfg = getStatusConfig(companyData?.status);
  const StatusIcon = statusCfg.icon;

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full border border-zinc-800 bg-[#0a090e] rounded-3xl p-10 shadow-2xl">
        {companyData?._id ? (
          <div className="space-y-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                  {companyData.companyLogo ? <img src={companyData.companyLogo} className="w-full h-full object-cover" /> : <FiBriefcase className="w-8 h-8 text-zinc-600" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{companyData.companyName}</h1>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">{companyData.category}</span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.color}`}>
                      <StatusIcon className="w-3 h-3" /> {companyData.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={handleEditClick} className="p-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition"><FiEdit2 /></button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiGlobe, label: "Website", val: companyData.websiteUrl },
                { icon: FiMapPin, label: "Location", val: companyData.location },
                { icon: FiUsers, label: "Team Size", val: companyData.employeeRange },
                { icon: FiCalendar, label: "Joined", val: companyData.createdAt ? new Date(companyData.createdAt).toLocaleDateString() : "N/A" }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1"><item.icon className="w-3 h-3"/>{item.label}</div>
                  <div className="font-semibold text-sm truncate">{item.val}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-500 uppercase mb-2">Description</h3>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950 p-5 rounded-2xl border border-zinc-900">{companyData.description}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-2">No Company Profile</h2>
            <button onClick={() => setIsOpen(true)} className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm mt-4">Create Profile</button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleSubmitProfile} className="w-full max-w-lg bg-[#0c0b10] border border-zinc-800 p-8 rounded-3xl space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Edit Profile</h2>
              <button type="button" onClick={() => setIsOpen(false)}><FiX /></button>
            </div>
            <input name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full p-4 bg-zinc-950 rounded-xl border border-zinc-800" placeholder="Company Name" />
            <div className="grid grid-cols-2 gap-4">
              <input name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className="w-full p-4 bg-zinc-950 rounded-xl border border-zinc-800" placeholder="Website" />
              <input name="location" value={formData.location} onChange={handleInputChange} className="w-full p-4 bg-zinc-950 rounded-xl border border-zinc-800" placeholder="Location" />
            </div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-4 bg-zinc-950 rounded-xl border border-zinc-800 h-24" placeholder="Description" />
            <button type="submit" className="w-full bg-white text-black p-4 rounded-xl font-bold text-sm">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
}