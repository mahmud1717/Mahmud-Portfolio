import { motion } from "motion/react";
import { Camera, Instagram, Facebook, Twitter, ArrowDown, ExternalLink, Mail, Github, Menu, X } from "lucide-react";
import { useState, useEffect, useRef, FormEvent } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Graphic Design", "Volunteering", "Photography", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-accent font-display font-black text-2xl tracking-tighter cursor-pointer"
          >
            MH.
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                whileHover={{ y: -2 }}
                className="text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(true)}
            className="px-6 py-2 bg-accent text-bg-primary font-bold rounded-full text-xs uppercase tracking-widest glow-box flex items-center gap-2"
          >
            <Menu size={16} />
            Menu
          </motion.button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-bg-primary flex flex-col p-10"
      >
        <div className="flex justify-between items-center mb-20">
          <div className="text-accent font-display font-black text-2xl tracking-tighter">MH.</div>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={() => setIsMenuOpen(false)}
            className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent"
          >
            <X size={32} />
          </motion.button>
        </div>

        <div className="flex flex-col gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-accent transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div className="space-y-4">
            <p className="text-text-secondary uppercase tracking-widest text-xs font-bold">Socials</p>
            <div className="flex gap-6">
              <Instagram className="hover:text-accent cursor-pointer" />
              <Facebook className="hover:text-accent cursor-pointer" />
              <Twitter className="hover:text-accent cursor-pointer" />
            </div>
          </div>
          <p className="text-text-secondary text-xs uppercase tracking-widest">© 2026 Mahmud Hossain</p>
        </div>
      </motion.div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-bg-secondary rounded-[40px] p-8 md:p-16 overflow-hidden min-h-[70vh] flex flex-col md:flex-row items-center gap-12"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full" />
          </div>

          {/* Content Left */}
          <div className="flex-1 z-10 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 justify-center md:justify-start mb-6"
            >
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Portfolio</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-[120px] leading-[0.9] mb-8 glow-text">
              MAHMUD <br /> <span className="text-accent">HOSSAIN</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(214, 255, 92, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('graphic-design')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-accent text-bg-primary font-black rounded-2xl uppercase tracking-widest"
              >
                Explore Work
              </motion.button>
              
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/mahmudhossain17?igsh=MW80NHZqaDJhd3Rxcg==" },
                  { Icon: Facebook, href: "https://www.facebook.com/mahmudhossain17" },
                  { Icon: Twitter, href: "https://x.com/MahmudH90826919" }
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: "#D6FF5C" }}
                    className="p-3 bg-white/5 rounded-xl transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Image Right */}
          <div className="flex-1 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-accent/20 blur-3xl group-hover:bg-accent/30 transition-all duration-700 rounded-full" />
              <img
                src="https://lh3.googleusercontent.com/d/1UPHhhK5egra-vzKlwP1TnVxJ2XTtlAib"
                alt="Mahmud Hossain"
                className="relative z-10 w-full max-w-md mx-auto rounded-[30px] shadow-2xl transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Rotating Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 w-40 h-40 z-20 hidden lg:block"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="fill-accent font-display text-[10px] uppercase tracking-[0.2em] font-bold">
                    <textPath xlinkHref="#circlePath">
                      • MY GEAR • MY GEAR • MY GEAR • MY GEAR •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="text-accent" size={24} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h2 className="text-8xl md:text-[160px] opacity-5 absolute -top-20 -left-10 select-none">ABOUT</h2>
          <h2 className="text-6xl md:text-8xl mb-8 leading-none">
            ABOUT <span className="text-accent">ME</span>
          </h2>
          <div className="w-24 h-1 bg-accent mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-xl text-text-primary leading-relaxed font-medium">
            I am a Civil Engineering undergraduate at East West University with a strong interest in infrastructure design and sustainable construction.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Alongside my academic studies, I have developed skills in editing, demonstrating strong attention to detail and precision across various projects. I also have a passion for gaming, which has enhanced my problem-solving ability and strategic thinking. I am eager to apply my technical knowledge and creativity to real-world engineering challenges.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <h4 className="text-accent text-2xl mb-2">6+</h4>
              <p className="text-xs uppercase tracking-widest text-text-secondary">Years Experience</p>
            </div>
            <div>
              <h4 className="text-accent text-2xl mb-2">60+</h4>
              <p className="text-xs uppercase tracking-widest text-text-secondary">Projects Completed</p>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 10 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-4 text-accent font-bold uppercase tracking-widest pt-8"
          >
            Learn More <ExternalLink size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const GraphicDesign = () => {
  const projects = [
    { title: "Poster Design 1", category: "Poster Design", img: "https://i.ibb.co.com/prh01N3y/IMG-3976.png" },
    { title: "Poster Design 2", category: "Poster Design", img: "https://i.ibb.co.com/3Y5JZbPj/IMG-9558-JPG.jpg" },
    { title: "Shab-e-Barat", category: "Poster Design", img: "https://i.ibb.co.com/bMdJVvb0/saab-e-barat.png" },
    { title: "Poster Design 4", category: "Poster Design", img: "https://i.ibb.co.com/yBNbC7HF/Indipendance-day.png" },
  ];

  return (
    <section id="graphic-design" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl mb-4 leading-none">GRAPHIC <br /> <span className="text-accent">DESIGN</span></h2>
            <p className="text-text-secondary uppercase tracking-widest text-sm">Some poster design for clients</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => document.getElementById('photography')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block px-8 py-3 border border-accent/30 rounded-full text-xs uppercase tracking-widest hover:bg-accent hover:text-bg-primary transition-all"
          >
            View All Projects
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative aspect-[4/3] overflow-hidden rounded-[30px] bg-bg-secondary"
            >
              <motion.img
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                src={project.img}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{project.category}</span>
                <h3 className="text-3xl mb-4">{project.title}</h3>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-bg-primary"
                >
                  <ExternalLink size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Volunteering = () => {
  const volunteerImages = [
    "https://i.ibb.co.com/Xf49dstm/Whats-App-Image-2026-04-04-at-8-53-20-PM.jpg",
    "https://i.ibb.co.com/204jSZh0/Whats-App-Image-2026-04-04-at-8-53-21-PM.jpg",
    "https://lh3.googleusercontent.com/d/1LcrKo4f8i8XZLR2De1UlAgTamlf3Ltzm",
    "https://i.ibb.co.com/7JJ27rCS/Whats-App-Image-2026-04-04-at-8-53-19-PM.jpg"
  ];

  return (
    <section id="volunteering" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-6xl md:text-9xl text-center glow-text leading-none">VOLUNTEERING <br /> <span className="text-accent">WORK</span></h2>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {volunteerImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-[30px] group"
            >
              <motion.img
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                src={img}
                alt={`Volunteering ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-6xl mb-6">MAKING A <span className="text-accent">DIFFERENCE</span></h3>
            <p className="text-text-primary/80 mb-10 text-lg">Dedicated to community service and social impact. From local infrastructure projects to educational initiatives, I believe in giving back and building a better future together.</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-4 border-2 border-accent text-accent font-black rounded-full uppercase tracking-[0.3em] text-sm"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Photography = () => {
  const photographyImages = [
    "https://i.ibb.co.com/mrhhf4GL/Whats-App-Image-2026-04-04-at-8-58-51-PM-1.jpg",
    "https://i.ibb.co.com/XZqKy1Ph/Whats-App-Image-2026-04-04-at-8-58-50-PM.jpg",
    "https://i.ibb.co.com/cc4qXpgV/Whats-App-Image-2026-04-04-at-8-58-50-PM-1.jpg",
    "https://i.ibb.co.com/PGSXRtc3/499216112-1298380032139887-6755269200630169346-n.jpg",
    "https://i.ibb.co.com/1fzrGx7S/495573745-1290699299574627-7861676513733401354-n.jpg",
    "https://i.ibb.co.com/DH76bCpg/492519852-1277459814231909-7136068599191600906-n.jpg",
    "https://i.ibb.co.com/p6LhwsmF/489354404-1259737642670793-1234330924210144378-n.jpg",
    "https://i.ibb.co.com/tP8w7dG1/495933438-1290699392907951-5838317935176045169-n.jpg"
  ];

  return (
    <section id="photography" className="py-32 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl mb-4 leading-none uppercase">
              PHOTO<span className="text-accent">GRAPHY</span>
            </h2>
            <p className="text-text-secondary uppercase tracking-[0.3em] text-xs font-bold">Capturing moments through my lens</p>
          </div>
          <div className="w-full md:w-auto h-[1px] bg-white/10 flex-1 mx-8 hidden md:block" />
          <p className="text-text-secondary max-w-xs text-sm leading-relaxed">
            A collection of visual stories, from street photography to cinematic landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographyImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-3xl group ${
                i === 0 || i === 4 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <motion.img
                initial={{ filter: "grayscale(100%)" }}
                whileInView={{ filter: "grayscale(0%)" }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                src={img}
                alt={`Photography ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square md:aspect-auto min-h-[300px] transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-accent text-xs font-bold uppercase tracking-widest">View Shot</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mh7688474@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-bg-secondary rounded-[50px] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full -mr-48 -mt-48" />
          
          <div className="grid md:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl mb-8 leading-none">LET'S <br /> <span className="text-accent">COLLABORATE</span></h2>
              <p className="text-text-secondary text-lg mb-12 max-w-md">
                Have a project in mind or just want to say hi? Feel free to reach out and let's create something amazing together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-secondary mb-1">Email Me</p>
                    <p className="text-xl font-medium">mh7688474@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Facebook size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-secondary mb-1">Follow Me</p>
                    <p className="text-xl font-medium">@mahmudhossain17</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary ml-2">Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary ml-2">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary ml-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 font-black rounded-2xl uppercase tracking-[0.2em] glow-box transition-all ${
                  status === "loading" ? "bg-accent/50 cursor-not-allowed" : "bg-accent text-bg-primary"
                }`}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </motion.button>

              {status === "success" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-center font-bold"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center font-bold"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-text-secondary text-sm">
          <p>© 2026 MAHMUD HOSSAIN. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-bg-primary selection:bg-accent selection:text-bg-primary">
      <Navbar />
      <Hero />
      <About />
      <GraphicDesign />
      <Volunteering />
      <Photography />
      <Contact />
    </div>
  );
}
