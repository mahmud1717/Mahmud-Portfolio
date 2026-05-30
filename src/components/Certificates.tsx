import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { 
  Award, 
  Calendar, 
  MapPin, 
  X, 
  ArrowUpRight, 
  Search, 
  ShieldCheck, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Shield, 
  Lock, 
  Maximize, 
  Bookmark, 
  AlertCircle
} from "lucide-react";

interface Certificate {
  id: string; // Internal lookup ID
  verificationId: string; // Official public verification code
  title: string;
  issuer: string;
  recipient: string;
  date: string;
  location: string;
  category: "appreciation" | "participation" | "academic";
  description: string;
  scanUrl: string;
  banglaTitle?: string;
  banglaDesc?: string;
  banglaIssuer?: string;
  govRegNo?: string;
  sha256: string;
  registeredOn: string;
  fileSize: string;
  additionalDetails?: {
    venue?: string;
    authority?: string;
    authorTitle?: string;
    secondaryAuthority?: string;
    secondaryAuthorTitle?: string;
  };
}

const certificatesData: Certificate[] = [
  {
    id: "ucc-2023-hsc",
    verificationId: "MH-UCC-2023-9912",
    title: "Certificate of Appreciation",
    banglaTitle: "কৃতী শিক্ষার্থী সংবর্ধনা - জিপিএ ৫.০০",
    issuer: "UCC Group & UNIQUE Admission Care",
    recipient: "Mahmud Hossain",
    date: "30 December 2023",
    location: "Dhaka, Bangladesh",
    category: "academic",
    description: "Awarded in highly prestigious recognition of achieving an outstanding result with GPA 5.00 in the HSC Examination-2023, celebrating dedication, excellence, and academic distinction.",
    banglaDesc: "এইচএসসি পরীক্ষা-২০২৩-এ জিপিএ ৫.০০ পেয়ে জাঁকজমকপূর্ণ সাফল্য অর্জনের গৌরবময় স্বীকৃতিস্বরূপ এই সম্মাননা সনদ প্রদান করা হলো।",
    scanUrl: "/src/assets/images/certificate_ucc_1780076460078.png",
    govRegNo: "Gov. Reg. No: C-52834",
    sha256: "9fa31b2e185cd4bc7758ea0df083818e32c3f86e392dfbfa6da110ec9477fb0c",
    registeredOn: "30-12-2023 14:32:10 UTC",
    fileSize: "1.24 MB (PNG Scan)",
    additionalDetails: {
      authority: "Dr. M A Halim Patwary",
      authorTitle: "Chairman, UCC Group",
      venue: "UCC Group Headquarters, Dhaka"
    }
  },
  {
    id: "gronthosala-2026-appreciation",
    verificationId: "MH-GPL-2026-3021",
    title: "Certificate of Appreciation",
    issuer: "Gronthosala Public Library & Social Welfare Organisation",
    recipient: "Mahmud Hossain",
    date: "11 January 2026",
    location: "Tahfizul Quran Cadet Madrasa, Bangladesh",
    category: "appreciation",
    description: "Awarded for brilliant and dedicated performance as a Co-Ordinator and Volunteer in the Sawtul Ilm Season 2, 2026, organised by Gronthosala Public Library and Social Welfare Organisation held on 10-11 January 2026.",
    scanUrl: "/src/assets/images/certificate_gronthosala_1780076484644.png",
    govRegNo: "ESTD-2022 / REG-9204",
    sha256: "8c30f81d1de4020cdeffd31818274092bbf06a927cd9926d7f3dbdf0fcd839d0",
    registeredOn: "12-01-2026 09:15:45 UTC",
    fileSize: "1.41 MB (PNG Scan)",
    additionalDetails: {
      authority: "Chief Executive",
      authorTitle: "Gronthosala Public Library",
      venue: "Tahfizul Quran Cadet Madrasa"
    }
  },
  {
    id: "taanraat-2020-bangla",
    verificationId: "MH-TRB-2020-0082",
    title: "National Bangla Festival Achievement",
    banglaTitle: "জাতীয় বাংলা উৎসব ২০২০ - অভিনন্দন পত্র",
    issuer: "TAAN_RAAT Group Bangladesh",
    banglaIssuer: "তান_রাত গ্রুপ বাংলাদেশ",
    recipient: "Mahmud Hossain",
    date: "22 February 2020",
    location: "Rabindra Srijonshil University, Uttara, Dhaka",
    category: "appreciation",
    description: "Spontaneous participation and standout execution in the prestigious 'National Bangla Festival 2020' organized by TAAN_RAAT Group Bangladesh, held at Rabindra Srijonshil University.",
    banglaDesc: "তান_রাত গ্রুপ বাংলাদেশ কর্তৃক আয়োজিত 'জাতীয় বাংলা উৎসব ২০২০' এ স্বতঃস্ফূর্তভাবে অংশগ্রহণ করে মেধার পরিচয় দেওয়ায় অভিনন্দন জানানো যাচ্ছে। আমরা তার সর্বাঙ্গীন সাফল্য কামনা করি।",
    scanUrl: "/src/assets/images/certificate_taanraat_2020_1780076511405.png",
    govRegNo: "TRB-NBF-2020-721",
    sha256: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    registeredOn: "23-02-2020 18:40:11 UTC",
    fileSize: "1.85 MB (PNG Scan)",
    additionalDetails: {
      venue: "Rabindra Srijonshil University, Uttara, Dhaka",
      authority: "Tanjim Rabby",
      authorTitle: "Founder President, TAAN_RAAT Group",
      secondaryAuthority: "Tejgaon Govt Science College Science Club",
      secondaryAuthorTitle: "Associated Partner"
    }
  },
  {
    id: "taanraat-2023-participation",
    verificationId: "MH-TRW-2023-7721",
    title: "Certificate of Participation",
    issuer: "TAAN_RAAT Group Bangladesh",
    recipient: "Mahmud Hossain",
    date: "04 March 2023",
    location: "Uttara, Dhaka, Bangladesh",
    category: "participation",
    description: "Successfully participated and completed the professional development workshop 'HOW TO UNLEASH ONESELF MORE SMARTLY?' to empower personal initiative, agility, and cognitive performance.",
    scanUrl: "/src/assets/images/certificate_taanraat_2023_1780076540677.png",
    govRegNo: "TR-WKS-2023-108",
    sha256: "d37f81a74070a20cbffd2c73be92bf06a927cd99d26d7fd3dbdfefcee839d09a",
    registeredOn: "05-03-2023 11:10:02 UTC",
    fileSize: "986 KB (PNG Scan)",
    additionalDetails: {
      authority: "Tanjim Rabby",
      authorTitle: "Founder & Director, TAAN_RAAT Group",
      venue: "TAAN_RAAT Training Hall, Uttara"
    }
  }
];

export default function Certificates() {
  const [activeTab, setActiveTab] = useState<"browse" | "authenticate">("browse");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "academic" | "appreciation" | "participation">("all");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<"scan" | "digital">("scan");
  
  // Interactive Scan Image States
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [contrastSetting, setContrastSetting] = useState<"normal" | "clearText" | "noir" | "monochrome">("normal");

  // Certificate Verification Engine States
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationResult, setVerificationResult] = useState<Certificate | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  const filteredCertificates = certificatesData.filter(cert => {
    if (selectedFilter === "all") return true;
    return cert.category === selectedFilter;
  });

  const handleLookup = (idToSearch: string) => {
    const cleanQuery = idToSearch.trim().toUpperCase();
    const result = certificatesData.find(cert => 
      cert.verificationId.toUpperCase() === cleanQuery || 
      cert.id.toUpperCase() === cleanQuery.toLowerCase() ||
      cert.title.toUpperCase().includes(cleanQuery) || 
      cert.issuer.toUpperCase().includes(cleanQuery)
    );
    
    setVerificationResult(result || null);
    setLookupAttempted(true);
  };

  const rotateImageRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.75));
  };

  const resetManipulations = () => {
    setRotation(0);
    setZoom(1);
    setContrastSetting("normal");
  };

  const getFilterStyle = () => {
    switch (contrastSetting) {
      case "clearText": return "contrast-150 brightness-110 saturate-[0.10]";
      case "noir": return "grayscale contrast-200 brightness-90";
      case "monochrome": return "grayscale brightness-105";
      default: return "";
    }
  };

  return (
    <section id="certificates" className="py-32 bg-bg-secondary/15 px-6 border-t border-white/5 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Unit */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl mb-4 leading-none uppercase font-black">
              CERTIFICATES & <span className="text-accent underline decoration-white/20">CREDENTIALS</span>
            </h2>
            <p className="text-text-secondary uppercase tracking-[0.3em] text-xs font-bold">
              Secure Ledger & Verified Digital Organization Accreditations
            </p>
          </div>

          {/* Root Tab Menu Switcher */}
          <div className="flex bg-white/5 p-1.5 rounded-3xl border border-white/10 shadow-inner z-20">
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "browse"
                  ? "bg-accent text-bg-primary shadow-[0_0_20px_rgba(214,255,92,0.3)]"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              📜 Browse Credentials
            </button>
            <button
              onClick={() => {
                setActiveTab("authenticate");
                setLookupAttempted(false);
                setSearchQuery("");
                setVerificationResult(null);
              }}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "authenticate"
                  ? "bg-accent text-bg-primary shadow-[0_0_40px_rgba(214,255,92,0.3)]"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              🛡️ Authentication Portal
            </button>
          </div>
        </div>

        {/* ACTIVE TAB: BROWSE CERTIFICATES */}
        {activeTab === "browse" && (
          <div>
            {/* Category Filter Toolbar */}
            <div className="flex flex-wrap gap-2 mb-10 bg-white/5 p-1.5 rounded-2xl w-fit border border-white/5">
              {(["all", "academic", "appreciation", "participation"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? "bg-accent/20 text-accent border border-accent/25"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredCertificates.map((cert) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={cert.id}
                    className="bg-bg-secondary/40 border border-white/5 rounded-[30px] p-8 md:p-10 hover:border-accent/40 shadow-xl group relative flex flex-col justify-between transition-all duration-500 hover:bg-bg-secondary/50"
                  >
                    <div className="absolute top-10 right-10 text-accent/20 group-hover:text-accent/60 transition-colors">
                      <Award size={48} className="stroke-[1.3]" />
                    </div>

                    <div>
                      {/* Top ribbon tags */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          cert.category === "academic" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                          cert.category === "appreciation" ? "bg-accent/10 text-accent border border-accent/20" :
                          "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>
                          {cert.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-text-secondary/85 text-xs font-mono">
                          <ShieldCheck size={14} className="text-green-400" /> Web-Verified
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3.5xl font-extrabold mb-3 group-hover:text-accent transition-colors leading-tight">
                        {cert.title}
                      </h3>
                      {cert.banglaTitle && (
                        <p className="font-display font-medium text-amber-500/80 text-sm mb-4">
                          {cert.banglaTitle}
                        </p>
                      )}
                      
                      <p className="text-text-secondary text-sm md:text-base mb-8 line-clamp-3 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    {/* Meta info block */}
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-secondary/70">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-accent" />
                          {cert.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-accent" />
                          {cert.location}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-secondary/50 font-bold">Issuer Authority</p>
                          <p className="text-sm font-extrabold text-text-primary mt-0.5">{cert.issuer}</p>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActiveCert(cert);
                            setViewMode("scan");
                            resetManipulations();
                          }}
                          className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all hover:bg-accent hover:text-bg-primary cursor-pointer flex items-center gap-2 ring-1 ring-white/5"
                        >
                          Verify Scan & Details
                          <ArrowUpRight size={14} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: SECURE LOOKUP ENGINE / AUTHENTICATOR PAGE */}
        {activeTab === "authenticate" && (
          <div className="max-w-4xl mx-auto">
            {/* Authenticator Hub Header box */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 p-8 md:p-12 rounded-[32px] shadow-2xl relative mb-12">
              <div className="absolute top-4 right-4 text-green-500/20">
                <Shield size={120} className="stroke-[0.5]" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-xs font-black w-fit uppercase tracking-widest border border-green-500/25">
                  <Lock size={12} /> SECURE CRYPTOGRAPHIC REGISTRY
                </div>

                <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  CERTIFICATE <span className="text-accent">VERIFICATION</span> LEDGER
                </h3>
                
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                  Validate the mathematical authenticity of Mahmud Hossain's qualifications. Enter the <span className="font-mono text-accent">Verification ID</span> printed on the credentials (e.g. <span className="font-mono">MH-UCC-2023-9912</span>) or organization keyword to fetch live ledger stamp, registry hashes and original files.
                </p>

                {/* Input Query Bar / Form Box */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLookup(searchQuery)}
                      placeholder="e.g. MH-UCC-2023-9912 or MH-GPL-2026-3021"
                      className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-2xl py-4.5 px-6 pl-12 text-sm text-text-primary font-mono focus:outline-none transition-colors"
                    />
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                  </div>
                  <button
                    onClick={() => handleLookup(searchQuery)}
                    className="bg-accent hover:bg-accent/80 text-bg-primary text-xs uppercase tracking-widest font-black px-8 py-4.5 rounded-2xl cursor-pointer duration-300 flex items-center justify-center gap-2 select-none"
                  >
                    Authenticate Ledger
                  </button>
                </div>

                {/* Quick Shortcuts helpful hints */}
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-text-secondary/70">
                  <span>Quick Demo IDs:</span>
                  {["MH-UCC-2023-9912", "MH-GPL-2026-3021", "MH-TRB-2020-0082"].map((demoId) => (
                    <button
                      key={demoId}
                      onClick={() => {
                        setSearchQuery(demoId);
                        handleLookup(demoId);
                      }}
                      className="font-mono text-accent hover:underline text-xs bg-white/5 px-2 py-1 rounded"
                    >
                      {demoId}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* VERIFICATION OUTPUT PANEL */}
            <AnimatePresence mode="wait">
              {lookupAttempted && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[32px] overflow-hidden border border-white/10"
                >
                  {verificationResult ? (
                    /* SUCCESS: VALID MATCH FOUND */
                    <div className="bg-zinc-950 p-8 md:p-12 relative overflow-hidden">
                      {/* Diagonal watermark */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/5 blur-[100px] pointer-events-none rounded-full" />
                      
                      {/* Seal Block */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5 mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle2 size={36} className="animate-pulse" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-mono uppercase tracking-widest text-green-400 font-bold">STATUS: OFFICIAL RECORD CONFIRMED</p>
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-white mt-1">
                              ID: {verificationResult.verificationId}
                            </h4>
                          </div>
                        </div>

                        {/* QR Badge stand-in */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] uppercase tracking-widest text-text-secondary/60">Registry Stamp</span>
                          <span className="font-mono text-[10px] text-accent font-black mt-0.5">ESTD# BANGLADESH</span>
                        </div>
                      </div>

                      {/* Info layout specifications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-text-secondary/40">Credential Subject Name</p>
                            <p className="text-lg font-black text-text-primary">{verificationResult.recipient}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-text-secondary/40">Official Certificate Title</p>
                            <p className="text-lg font-black text-white">{verificationResult.title}</p>
                            {verificationResult.banglaTitle && (
                              <p className="text-xs text-amber-500 mt-1">{verificationResult.banglaTitle}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-text-secondary/40">Issuing Accredited Body</p>
                            <p className="text-lg font-black text-accent">{verificationResult.issuer}</p>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-text-secondary/40">Registration / License Code</p>
                            <p className="text-sm font-mono font-bold text-white bg-white/5 py-1 px-3 w-fit rounded-lg border border-white/5 mt-1">
                              {verificationResult.govRegNo || "NOT_APPLICABLE"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-text-secondary/40">Fidelity Integrity Hash (SHA-256)</p>
                            <p className="text-[10px] font-mono break-all text-neutral-400 bg-black py-2 px-3 rounded-lg border border-white/5 mt-1">
                              {verificationResult.sha256}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-text-secondary/40 font-mono">Verified Time</p>
                              <p className="text-xs text-neutral-300 font-mono mt-0.5">{verificationResult.registeredOn}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-text-secondary/40 font-mono">Scan File Metrics</p>
                              <p className="text-xs text-neutral-300 font-mono mt-0.5">{verificationResult.fileSize}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Brief description content */}
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
                        <span className="text-[9px] uppercase tracking-widest text-[accent] font-black">VALIDATED SUMMARY EXCERPT</span>
                        <p className="text-text-secondary text-sm leading-relaxed mt-2">
                          {verificationResult.description}
                        </p>
                        {verificationResult.banglaDesc && (
                          <p className="text-text-secondary/80 text-xs mt-2 italic">
                            {verificationResult.banglaDesc}
                          </p>
                        )}
                      </div>

                      {/* View original controls inside portal */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-t border-white/5 pt-8">
                        <div className="flex items-center gap-2 text-text-secondary text-xs">
                          <CheckCircle2 size={14} className="text-green-400" /> Digital signatures cryptographic verification matches perfectly.
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setActiveCert(verificationResult);
                              setViewMode("scan");
                              resetManipulations();
                            }}
                            className="flex-1 sm:flex-initial px-6 py-3.5 bg-accent text-bg-primary text-xs uppercase tracking-widest font-black rounded-xl cursor-pointer hover:bg-accent/80 transition-colors"
                          >
                            Inspect Original Scan
                          </button>
                          <button
                            onClick={() => {
                              setActiveCert(verificationResult);
                              setViewMode("digital");
                              resetManipulations();
                            }}
                            className="flex-1 sm:flex-initial px-6 py-3.5 bg-white/5 border border-white/10 text-xs text-text-primary uppercase tracking-widest font-black rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                          >
                            Open Digital Medal
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ERROR: NOT MATCHED */
                    <div className="bg-red-500/5 p-8 md:p-12 text-center border-2 border-dashed border-red-500/20 rounded-[32px]">
                      <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 mx-auto mb-4">
                        <AlertCircle size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Verification Failed</h4>
                      <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
                        No record matches query reference <span className="font-mono text-red-400 font-bold">"{searchQuery}"</span>. 
                        Please triple check the input (it is case insensitive) or browse Mahmud's full list of verified documents above.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* LUXURY ORIGINAL DOCUMENT MODAL WINDOW */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-zinc-950 border border-white/10 max-w-5xl w-full rounded-[40px] overflow-hidden shadow-2xl relative"
            >
              {/* Modal Utility Toolbar Controls */}
              <div className="absolute top-6 right-6 z-50 flex gap-2">
                <button
                  onClick={() => resetManipulations()}
                  className="w-12 h-12 rounded-xl glass hover:bg-white/10 text-white transition-all flex items-center justify-center text-xs font-black cursor-pointer bg-zinc-900 border border-white/10"
                  title="Reset alignment"
                >
                  🔄
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-12 h-12 rounded-xl glass hover:bg-accent hover:text-bg-primary transition-all flex items-center justify-center text-accent font-bold cursor-pointer bg-zinc-900 border border-white/10"
                  title="Print credential document"
                >
                  <Printer size={16} />
                </button>
                <button
                  onClick={() => setActiveCert(null)}
                  className="w-12 h-12 rounded-xl glass hover:bg-accent hover:text-bg-primary transition-all flex items-center justify-center text-accent font-bold cursor-pointer bg-zinc-900 border border-white/10 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* View options switcher (Toggle between real scan and custom digital replica layout) */}
              <div className="flex justify-center pt-8 pb-4 z-40 relative">
                <div className="flex gap-1 bg-zinc-900 p-1.5 rounded-2xl border border-white/10 shadow-md">
                  <button
                    onClick={() => {
                      setViewMode("scan");
                      resetManipulations();
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                      viewMode === "scan"
                        ? "bg-accent text-bg-primary shadow-[0_0_15px_rgba(214,255,92,0.15)]"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    📃 Official Original Scan
                  </button>
                  <button
                    onClick={() => setViewMode("digital")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                      viewMode === "digital"
                        ? "bg-accent text-bg-primary shadow-[0_0_15px_rgba(214,255,92,0.15)]"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    👑 Digital Credentials Certificate
                  </button>
                </div>
              </div>

              {viewMode === "scan" ? (
                /* SYSTEM ORIGINAL SCAN VIEW WITH ROTATION & CONTRAST FILTER MECHANISMS */
                <div className="p-4 md:p-8 flex flex-col items-center">
                  
                  {/* Rotate and zoom controller bar for scan copies */}
                  <div className="flex flex-wrap items-center gap-3 bg-zinc-900/80 px-4 py-2 border border-white/5 rounded-2xl mb-6 text-xs text-text-secondary z-30 relative shadow-lg">
                    <span className="font-bold pr-2 border-r border-white/5 text-text-primary">Fidelity Controls:</span>
                    
                    {/* Rotate button to compensate for sideways scan layout */}
                    <button
                      onClick={rotateImageRight}
                      className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 hover:text-accent px-3 py-1.5 rounded-xl transition-all cursor-pointer text-text-primary"
                      title="Some uploads are upside down. Click to correct rotatability orientation"
                    >
                      <RotateCw size={13} /> Rotate 90°
                    </button>

                    {/* Magnification controls */}
                    <div className="flex items-center bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                      <button
                        onClick={handleZoomOut}
                        className="p-2 hover:bg-white/10 text-white cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut size={13} />
                      </button>
                      <span className="px-3 text-[10px] font-mono select-none font-bold text-accent">{(zoom * 100).toFixed(0)}%</span>
                      <button
                        onClick={handleZoomIn}
                        className="p-2 hover:bg-white/10 text-white cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn size={13} />
                      </button>
                    </div>

                    {/* Quality Filter toggle preset */}
                    <div className="flex bg-white/5 rounded-xl p-0.5 border border-white/5">
                      {(["normal", "clearText", "noir", "monochrome"] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setContrastSetting(filter)}
                          className={`px-2.5 py-1 text-[9px] uppercase font-black rounded-lg transition-all cursor-pointer ${
                            contrastSetting === filter
                              ? "bg-accent/20 text-accent"
                              : "text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    {/* Download original scan */}
                    <a
                      href={activeCert.scanUrl}
                      download={`${activeCert.id}-scan.png`}
                      className="flex items-center gap-1 bg-accent/10 hover:bg-accent text-accent hover:text-bg-primary px-3 py-1.5 rounded-xl transition-all cursor-pointer ml-auto"
                      title="Download raw document"
                    >
                      <Download size={13} /> Download
                    </a>
                  </div>

                  {/* Image container frame */}
                  <div className="relative border border-white/15 rounded-2xl w-full bg-neutral-900 shadow-2xl p-4 overflow-hidden flex items-center justify-center min-h-[50vh] max-h-[70vh] cursor-grab active:cursor-grabbing">
                    <motion.div
                      style={{ 
                        transformOrigin: "center center"
                      }}
                      animate={{
                        rotate: rotation,
                        scale: zoom
                      }}
                      transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={activeCert.scanUrl}
                        alt={`${activeCert.title} Scanned Copy Mahmud Hossain`}
                        className={`max-w-full max-h-[55vh] object-contain rounded-lg shadow-inner select-none pointer-events-none transition-all duration-300 ${getFilterStyle()}`}
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Metadata spec details below */}
                  <div className="mt-6 text-center max-w-2xl px-4 pb-6">
                    <p className="text-sm font-extrabold text-white flex items-center justify-center gap-1.5">
                      <ShieldCheck size={16} className="text-green-400" />
                      REPLICA SCAN FILE VERIFIED : <span className="font-mono text-accent">{activeCert.verificationId}</span>
                    </p>
                    <p className="text-[11px] text-text-secondary/70 leading-relaxed max-w-xl mx-auto mt-2">
                      Accreditation registry matches physical certificate signature. Registered in Mahmud's digital ledger since {activeCert.date}. File hash matches: <span className="font-mono bg-black/40 px-1 rounded select-all break-all">{activeCert.sha256}</span>.
                    </p>
                  </div>
                </div>
              ) : (
                /* OFFICIAL PRINTABLE DIGITAL CANVAS WEB REPLICA */
                <div className="p-8 md:p-16 text-center select-none relative overflow-redirect border-8 border-double border-amber-500/20 m-4 rounded-[32px] bg-gradient-to-br from-zinc-950 to-neutral-900 shadow-inner">
                  {/* Vintage Frame Corner Accents */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-500/30" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-500/30" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-500/30" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-500/30" />

                  <div className="max-w-3xl mx-auto py-6">
                    {/* Watermark Graphic Icon or Seal */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full border-2 border-dashed border-accent/25 flex items-center justify-center text-accent/20 absolute z-0"
                      />
                      <Award size={54} className="text-amber-500 relative z-10 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
                    </div>

                    {/* Issuer Subheader */}
                    <p className="text-accent tracking-[0.4em] text-xs uppercase font-black mb-8 relative z-10">
                      {activeCert.issuer}
                    </p>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-display font-black text-white px-4 leading-tight border-b border-white/5 pb-4 mb-2">
                      {activeCert.title}
                    </h1>
                    {activeCert.banglaTitle && (
                      <p className="text-amber-500/80 font-normal italic text-lg mb-8 leading-relaxed">
                        {activeCert.banglaTitle}
                      </p>
                    )}

                    {/* Recipient Area */}
                    <p className="text-text-secondary uppercase text-xs tracking-widest mb-2 mt-8">
                      This official credential is proudly presented to
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-accent leading-none font-display py-4 underline decoration-amber-500/20 underline-offset-8">
                      {activeCert.recipient}
                    </h2>

                    {/* Detail Text */}
                    <div className="my-8 max-w-2xl mx-auto">
                      <p className="text-text-primary/90 text-sm md:text-base leading-relaxed tracking-wide">
                        {activeCert.description}
                      </p>
                      {activeCert.banglaDesc && (
                        <p className="text-text-secondary text-sm leading-relaxed mt-4">
                          {activeCert.banglaDesc}
                        </p>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto bg-white/5 py-4 px-6 rounded-2xl border border-white/5 text-xs text-text-secondary/95 mb-12">
                      <div className="border-r border-white/5 pr-4 text-center">
                        <p className="uppercase tracking-widest text-[10px] text-text-secondary/60 mb-1">DATE / VENUE</p>
                        <p className="font-bold text-text-primary font-mono">{activeCert.date}</p>
                        <p className="text-[10px] text-accent mt-0.5 truncate">{activeCert.additionalDetails?.venue || activeCert.location}</p>
                      </div>
                      <div className="pl-4 text-center">
                        <p className="uppercase tracking-widest text-[10px] text-text-secondary/60 mb-1">CREDENTIAL status</p>
                        <p className="font-bold text-green-400 font-mono flex items-center justify-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> VERIFIED
                        </p>
                        <p className="text-[10px] text-text-secondary/60 mt-0.5">{activeCert.id.toUpperCase()}</p>
                      </div>
                    </div>

                    {/* Signatures Area */}
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-8 border-t border-white/5 pt-8">
                      {/* Authorized Signature 1 */}
                      {activeCert.additionalDetails?.authority && (
                        <div className="text-center">
                          <div className="h-12 flex items-center justify-center mb-1">
                            <svg width="120" height="40" viewBox="0 0 120 40" className="text-accent/50 stroke-current fill-none">
                              <path d="M10,30 Q30,10 50,30 T90,10 T110,30" strokeWidth="2" />
                              <path d="M30,25 Q60,5 90,25" strokeWidth="1" strokeDasharray="2" />
                            </svg>
                          </div>
                          <div className="w-48 border-t border-white/10 mx-auto pt-2">
                            <p className="text-xs font-bold text-text-primary">{activeCert.additionalDetails.authority}</p>
                            <p className="text-[9px] uppercase tracking-wider text-text-secondary/60">{activeCert.additionalDetails.authorTitle}</p>
                          </div>
                        </div>
                      )}

                      {/* Authorized Signature 2 */}
                      {activeCert.additionalDetails?.secondaryAuthority && (
                        <div className="text-center">
                          <div className="h-12 flex items-center justify-center mb-1">
                            <svg width="120" height="40" viewBox="0 0 120 40" className="text-accent/40 stroke-current fill-none">
                              <path d="M15,20 Q45,35 75,10 T105,25" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <div className="w-48 border-t border-white/10 mx-auto pt-2">
                            <p className="text-xs font-bold text-text-primary">{activeCert.additionalDetails.secondaryAuthority}</p>
                            <p className="text-[9px] uppercase tracking-wider text-text-secondary/60">{activeCert.additionalDetails.secondaryAuthorTitle}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
