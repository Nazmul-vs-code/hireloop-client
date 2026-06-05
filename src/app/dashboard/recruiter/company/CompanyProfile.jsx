"use client";

import { createCompany } from '@/lib/actions/companys';
import React, { useState } from 'react';
import { 
  FiPlus, 
  FiBriefcase, 
  FiMapPin, 
  FiGlobe, 
  FiGrid, 
  FiFileText, 
  FiUsers, 
  FiUploadCloud,
  FiX,
  FiEdit2
} from "react-icons/fi";

export default function CompanyProfile({recruiter}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Stores the persistent data received from your MongoDB database instance
  const [companyData, setCompanyData] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    category: "Technology",
    websiteUrl: "",
    location: "",
    employeeRange: "1-10 employees",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); 
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setFormData({
      companyName: companyData.companyName,
      category: companyData.category,
      websiteUrl: companyData.websiteUrl,
      location: companyData.location,
      employeeRange: companyData.employeeRange,
      description: companyData.description,
    });
    setLogoPreview(companyData.companyLogo || null);
    setIsOpen(true);
  };

  // HANDLESUBMIT PIPELINE INTEGRATION WITH APIS
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let uploadedLogoUrl = companyData?.companyLogo || "";

    try {
      // 1. Asset Image Node Handshake Pipeline
      if (selectedFile) {
        const apiKey = process.env.NEXT_PUBLIC_IMAGE_PUBLIC_UPLOAD_API || '8bb84650e0d6caa98ea544c5b10bcdb1';
        if (!apiKey) {
          throw new Error("Imgbb public upload API key configuration token is missing inside environment files.");
        }

        const imgbbData = new FormData();
        imgbbData.append("image", selectedFile);

        const urlWithParams = `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`;

        const imgbbResponse = await fetch(urlWithParams, {
          method: "POST",
          body: imgbbData,
        });

        if (!imgbbResponse.ok) {
          throw new Error("Imgbb media service failed to upload image payload.");
        }

        const imgbbResult = await imgbbResponse.json();
        uploadedLogoUrl = imgbbResult.data.url; 
        console.log("Imgbb Asset Node Upload Successful:", uploadedLogoUrl);
      }

      const finalizedPayload = {
        ...formData,
        companyLogo: uploadedLogoUrl, 
        recruiterId: recruiter.id,
      };

      // 2. Network Endpoint Synchronization
      if (companyData) {
        // EDIT MODE: Trigger placeholder framework for update mutations
        console.log("Updating existing metadata entity logic pipeline...");
        
        // For now, update local state directly until your PUT/PATCH API is ready
        setCompanyData(finalizedPayload);
      } else {
        // CREATION MODE: Dispatch transaction matrix straight to backend cluster
        console.log("Saving full company registry metadata profile to backend...");
        
        const databaseResult = await createCompany(finalizedPayload);
        
        if (databaseResult && databaseResult.insertedId) {
          console.log("Database entry synchronized successfully:", databaseResult);
          
          // Hydrate component dashboard framework using the real document structure
          setCompanyData({
            _id: databaseResult.insertedId,
            ...finalizedPayload
          });
        } else {
          throw new Error("Backend server accepted request body matrix but failed data parsing ingestion validation.");
        }
      }
      
      // 3. Clear State Registers & Close Overlays
      setIsOpen(false);
      setLogoPreview(null);
      setSelectedFile(null);
      setFormData({
        companyName: "",
        category: "Technology",
        websiteUrl: "",
        location: "",
        employeeRange: "1-10 employees",
        description: "",
      });

    } catch (err) {
      console.error("Critical Profile Submit Failure Pipeline Interception:", err.message);
      alert(`Error context details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020105] text-zinc-100 flex flex-col items-center p-6 select-none relative pt-16">
      
      {!companyData && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all duration-200 shadow-[0_4px_30px_rgba(255,255,255,0.1)] cursor-pointer mb-10 mx-auto"
        >
          <FiPlus className="w-4 h-4 stroke-[3]" />
          Create a Company
        </button>
      )}

      <div className="max-w-xl w-full border border-zinc-800/60 bg-[#0a090e]/40 rounded-2xl p-8 backdrop-blur-xl flex flex-col shadow-lg transition-all duration-300">
        {companyData ? (
          <div className="flex flex-col space-y-6">
            <div className="flex items-start justify-between border-b border-zinc-900/80 pb-5">
              <div className="flex items-center gap-4">
                {companyData.companyLogo ? (
                  <img 
                    src={companyData.companyLogo} 
                    alt="Company Logo" 
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FiBriefcase className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{companyData.companyName}</h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-0.5 rounded-md mt-1">
                    <FiGrid className="w-3 h-3" /> {companyData.category}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleEditClick}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <FiEdit2 className="w-3 h-3" />
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5 bg-zinc-950/30 border border-zinc-900/60 p-3 rounded-xl">
                <FiMapPin className="text-zinc-600 w-4 h-4 flex-shrink-0" />
                <span className="truncate">{companyData.location}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-zinc-950/30 border border-zinc-900/60 p-3 rounded-xl">
                <FiUsers className="text-zinc-600 w-4 h-4 flex-shrink-0" />
                <span>{companyData.employeeRange}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-zinc-950/30 border border-zinc-900/60 p-3 rounded-xl sm:col-span-2">
                <FiGlobe className="text-zinc-600 w-4 h-4 flex-shrink-0" />
                <a 
                  href={`https://${companyData.websiteUrl}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-indigo-400 hover:underline font-mono truncate"
                >
                  {companyData.websiteUrl}
                </a>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                <FiFileText className="w-3.5 h-3.5" /> About corporate entity
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/20 border border-zinc-900/40 p-4 rounded-xl whitespace-pre-wrap">
                {companyData.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FiBriefcase className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-md font-bold text-white">No Corporate Entity Connected</h2>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                Your profile workspace is currently unlinked. Click the button above to register your brand.
              </p>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="w-full max-w-3xl bg-[#0c0b10] border border-zinc-800/80 text-zinc-100 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col z-10">
            <form onSubmit={handleSubmitProfile} className="flex flex-col m-0">
              <button type="button" onClick={() => setIsOpen(false)} className="absolute right-5 top-5 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-900/60 rounded-xl transition-all cursor-pointer">
                <FiX className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-1 pt-7 px-8 pb-5 border-b border-zinc-900/60">
                <h3 className="text-xl font-bold tracking-tight text-white">{companyData ? "Update Corporate Profile" : "Register New Company"}</h3>
                <p className="text-xs text-zinc-500 font-normal mt-0.5">Enter your business details to start hiring on HireLoop.</p>
              </div>

              <div className="px-8 py-6 space-y-5 max-h-[65vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Company Name</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-600"><FiBriefcase className="w-4 h-4" /></span>
                      <input required type="text" placeholder="e.g. Acme Corp" value={formData.companyName} onChange={handleInputChange} name="companyName" className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/40 text-sm text-zinc-200 placeholder-zinc-700 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 transition-all outline-none" />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Industry / Category</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-600"><FiGrid className="w-4 h-4" /></span>
                      <select name="category" value={formData.category} onChange={handleInputChange} className="w-full pl-10 pr-8 py-2.5 bg-zinc-950/40 text-sm text-zinc-300 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 outline-none appearance-none cursor-pointer">
                        <option value="Technology" className="bg-[#0c0b10]">Technology</option>
                        <option value="Design" className="bg-[#0c0b10]">Design</option>
                        <option value="Marketing" className="bg-[#0c0b10]">Marketing</option>
                        <option value="Finance" className="bg-[#0c0b10]">Finance</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Website URL</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-600"><FiGlobe className="w-4 h-4" /></span>
                      <span className="absolute left-9 text-xs text-zinc-600 font-mono pointer-events-none select-none">https://</span>
                      <input required type="text" placeholder="www.company.com" value={formData.websiteUrl} onChange={handleInputChange} name="websiteUrl" className="w-full pl-20 pr-4 py-2.5 bg-zinc-950/40 text-sm text-zinc-200 placeholder-zinc-700 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 transition-all outline-none" />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Location</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-600"><FiMapPin className="w-4 h-4" /></span>
                      <input required type="text" placeholder="City, Country" value={formData.location} onChange={handleInputChange} name="location" className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/40 text-sm text-zinc-200 placeholder-zinc-700 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 transition-all outline-none" />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Employee Count Range</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-600"><FiUsers className="w-4 h-4" /></span>
                      <select name="employeeRange" value={formData.employeeRange} onChange={handleInputChange} className="w-full pl-10 pr-8 py-2.5 bg-zinc-950/40 text-sm text-zinc-300 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 outline-none appearance-none cursor-pointer">
                        <option value="1-10 employees" className="bg-[#0c0b10]">1-10 employees</option>
                        <option value="11-50 employees" className="bg-[#0c0b10]">11-50 employees</option>
                        <option value="51-200 employees" className="bg-[#0c0b10]">51-200 employees</option>
                        <option value="201+ employees" className="bg-[#0c0b10]">201+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-zinc-400">Company Logo</label>
                    <label className="group relative flex items-center gap-3 px-3.5 bg-zinc-950/40 hover:bg-zinc-950/80 border border-dashed border-zinc-800 hover:border-indigo-500/40 rounded-xl cursor-pointer h-[44px] transition-all overflow-hidden">
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                      {logoPreview ? (
                        <div className="flex items-center gap-2.5 w-full">
                          <img src={logoPreview} alt="Preview" className="w-5 h-5 rounded object-cover border border-zinc-700" />
                          <span className="text-xs text-indigo-400 font-mono truncate font-medium">Image Loaded Properly</span>
                        </div>
                      ) : (
                        <>
                          <FiUploadCloud className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                          <div className="flex flex-col text-left">
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-200 font-medium transition-colors leading-none">Upload image</span>
                            <span className="text-[10px] text-zinc-600 font-mono tracking-tight mt-0.5">PNG, JPG up to 5MB</span>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Brief Description</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-zinc-600"><FiFileText className="w-4 h-4" /></span>
                    <textarea required name="description" rows="3" value={formData.description} onChange={handleInputChange} placeholder="Tell us about your company's mission and culture..." className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/40 text-sm text-zinc-200 placeholder-zinc-700 border border-zinc-800/60 rounded-xl focus:border-indigo-500/60 outline-none transition-all resize-none min-h-[90px]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 bg-zinc-950/40 border-t border-zinc-900/60">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 bg-transparent hover:bg-zinc-900/60 text-zinc-400 border border-zinc-800 rounded-xl text-xs font-bold transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-xl text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer">
                  {loading ? "Uploading to Imgbb..." : companyData ? "Save Changes" : "Register Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}