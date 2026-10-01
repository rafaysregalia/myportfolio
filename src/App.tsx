import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

/** HELPER: OBFUSCATED WHATSAPP HANDLER (OPTION A) **/
const openWhatsAppChat = () => {
  const countryCode = "92";
  const mobileNumber = "3493017113";
  const message = encodeURIComponent("Hi Rafay, I am interested in working with you!");
  
  window.location.assign(`https://wa.me/${countryCode}${mobileNumber}?text=${message}`);
};

/** COMPONENTS **/

// 1. Magnet Effect Component
const Magnet = ({ children, padding = 150, strength = 3 }: { children: React.ReactNode; padding?: number; strength?: number }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    if (Math.abs(distanceX) < padding && Math.abs(distanceY) < padding) {
      const clampedY = Math.min(distanceY / strength, 6);
      setPosition({ x: distanceX / strength, y: clampedY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x !== 0 ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

// 2. FadeIn Wrapper
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
}

const FadeIn = ({ children, delay = 0, y = 30, x = 0, duration = 0.7 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "50px" }}
    transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

// 3. Contact Button (Option A: Obfuscated Click)
const ContactButton = () => (
  <motion.button 
    onClick={openWhatsAppChat}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-flex items-center justify-center rounded-full font-medium uppercase tracking-[0.2em] text-white text-xs sm:text-sm md:text-base px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-all cursor-pointer shrink-0 select-none relative z-30 pointer-events-auto"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px'
    }}>
    Contact Me
  </motion.button>
);

/** SECTIONS **/

const Navbar = () => (
  <nav className="flex justify-between items-center px-6 md:px-12 pt-6 md:pt-8 uppercase font-medium tracking-wider text-[#D7E2EA] text-sm md:text-lg lg:text-[1.4rem] w-full z-20">
    <FadeIn y={-20}><a href="#about" className="hover:opacity-70 transition-all">About</a></FadeIn>
    <FadeIn y={-20} delay={0.1}><a href="#services" className="hover:opacity-70 transition-all">Price</a></FadeIn>
    <FadeIn y={-20} delay={0.2}><a href="#projects" className="hover:opacity-70 transition-all">Projects</a></FadeIn>
    <FadeIn y={-20} delay={0.3}>
      <button 
        onClick={openWhatsAppChat} 
        className="hover:opacity-70 transition-all text-[#D7E2EA] uppercase tracking-wider font-medium cursor-pointer"
      >
        Contact
      </button>
    </FadeIn>
  </nav>
);

const Hero = () => (
  <section className="h-screen w-full flex flex-col justify-between relative overflow-hidden bg-[#0C0C0C]">
    <Navbar />
    
    <div className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
      {/* 1. ULTRA-EXPANDED EDGE-TO-EDGE HEADLINE (Adjusted for mobile to stay completely below the navbar) */}
      <div className="absolute top-3 sm:top-1 md:-top-6 lg:-top-8 w-full flex justify-center items-center z-0 select-none pointer-events-none px-2 sm:px-4">
        <FadeIn delay={0.15} y={-10}>
          <h1 
            className="hero-heading font-black uppercase leading-none whitespace-nowrap text-center text-[9vw] sm:text-[10.5vw] md:text-[11.5vw] lg:text-[12vw] tracking-[0.03em] sm:tracking-[0.08em] md:tracking-[0.14em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            style={{ textIndent: '0.04em' }}
          >
            Hi, i&apos;m rafay
          </h1>
        </FadeIn>
      </div>

      {/* 2. 3D AVATAR (Layer z-10: anchored with bottom buffer, chin protected) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[320px] md:w-[420px] lg:w-[490px] bottom-3 sm:bottom-5 md:bottom-8 pointer-events-none">
        <FadeIn delay={0.35} y={30}>
          <Magnet padding={200} strength={3.6}>
            <img 
               src="/avatar.png" 
               alt="Rafay 3D Portrait" 
               className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] select-none object-contain" 
            />
          </Magnet>
        </FadeIn>
      </div>
    </div>

    {/* Hero Footer */}
    <div className="flex justify-between items-end px-5 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-12 w-full relative z-30 pointer-events-auto gap-4">
      <FadeIn delay={0.35} y={20}>
        <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[220px] md:max-w-[300px]" style={{ fontSize: 'clamp(0.7rem, 1.3vw, 1.35rem)' }}>
          a 3d creator driven by crafting striking and unforgettable projects
        </p>
      </FadeIn>
      <FadeIn delay={0.5} y={20}>
        <ContactButton />
      </FadeIn>
    </div>
  </section>
);

const Marquee = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = (window.scrollY - rect.top + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gifs = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const row1 = [...gifs.slice(0, 11), ...gifs.slice(0, 11)];
  const row2 = [...gifs.slice(11), ...gifs.slice(11)];

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] w-full">
      <div className="flex gap-3 whitespace-nowrap" style={{ transform: `translateX(${scrollOffset - 200}px)`, willChange: 'transform' }}>
        {row1.map((src, i) => (
          <img key={i} src={src} loading="lazy" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" alt="" />
        ))}
      </div>
      <div className="flex gap-3 whitespace-nowrap" style={{ transform: `translateX(${-(scrollOffset - 200)}px)`, willChange: 'transform' }}>
        {row2.map((src, i) => (
          <img key={i} src={src} loading="lazy" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" alt="" />
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const text = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.2"] });

  return (
    <section id="about" className="min-h-screen w-full relative px-5 sm:px-8 md:px-12 py-20 flex flex-col items-center justify-center bg-[#0C0C0C]">
      <div className="absolute top-[4%] left-[2%] md:left-[4%] w-[120px] md:w-[210px] z-0 opacity-80 pointer-events-none">
        <FadeIn x={-80} duration={0.9} delay={0.1}><img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" /></FadeIn>
      </div>
      <div className="absolute top-[4%] right-[2%] md:right-[4%] w-[120px] md:w-[210px] z-0 opacity-80 pointer-events-none">
        <FadeIn x={80} duration={0.9} delay={0.15}><img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" /></FadeIn>
      </div>
      <div className="absolute bottom-[8%] left-[6%] md:left-[10%] w-[100px] md:w-[180px] z-0 opacity-80 pointer-events-none">
        <FadeIn x={-80} duration={0.9} delay={0.25}><img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" /></FadeIn>
      </div>
      <div className="absolute bottom-[8%] right-[6%] md:right-[10%] w-[130px] md:w-[220px] z-0 opacity-80 pointer-events-none">
        <FadeIn x={80} duration={0.9} delay={0.3}><img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" /></FadeIn>
      </div>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10 w-full max-w-4xl mx-auto">
        <FadeIn y={40}><h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>About me</h2></FadeIn>
        
        <p ref={containerRef} className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px] flex flex-wrap justify-center" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
          {text.split("").map((char, i) => {
            const step = 1 / text.length;
            const start = i * step;
            const end = start + step;
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            return <motion.span key={i} style={{ opacity }}>{char === " " ? "\u00A0" : char}</motion.span>;
          })}
        </p>

        <div className="mt-4 sm:mt-8 relative z-20">
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { id: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
    { id: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
    { id: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
    { id: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
    { id: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." },
  ];

  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 md:px-16 py-20 sm:py-24 md:py-32 text-[#0C0C0C] w-full">
      <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Services</h2>
      <div className="max-w-6xl mx-auto flex flex-col w-full">
        {services.map((s, i) => (
          <FadeIn key={s.id} delay={i * 0.1}>
            <div className="flex items-start border-t border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 gap-6 sm:gap-10 md:gap-16">
              <span className="font-black leading-none shrink-0" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>{s.id}</span>
              <div className="flex flex-col gap-2 pt-2 md:pt-4">
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{s.name}</h3>
                <p className="font-light opacity-60 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  imgs: string[];
}

const ProjectCard = ({ project, index, total, progress }: { project: ProjectItem; index: number; total: number; progress: MotionValue<number> }) => {
  const targetScale = 1 - ((total - 1 - index) * 0.04);
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div className="h-screen sticky top-16 md:top-24 flex items-center justify-center">
      <motion.div 
        style={{ scale, top: `${index * 20}px` }}
        className="w-full max-w-5xl h-[78vh] bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[36px] sm:rounded-[48px] p-6 md:p-8 flex flex-col shadow-2xl shadow-black/80 overflow-hidden relative"
      >
        <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-4 sm:gap-6">
              <span className="font-black text-5xl md:text-7xl leading-none text-[#D7E2EA]">{project.id}</span>
              <div>
                <p className="uppercase text-[10px] sm:text-xs tracking-widest text-[#D7E2EA]/50 mb-1">{project.type}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA]">{project.name}</h3>
              </div>
           </div>
           <button className="hidden sm:flex items-center gap-2 border-2 border-[#D7E2EA] rounded-full px-6 py-2.5 uppercase tracking-widest text-xs font-medium hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-all cursor-pointer">
              Live Project <ArrowUpRight size={16} />
           </button>
        </div>

        <div className="flex-1 grid grid-cols-10 gap-3 sm:gap-4 overflow-hidden">
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 h-full">
            <img src={project.imgs[0]} className="w-full h-1/2 object-cover rounded-[24px]" alt="" />
            <img src={project.imgs[1]} className="w-full h-1/2 object-cover rounded-[24px]" alt="" />
          </div>
          <div className="col-span-6 h-full">
            <img src={project.imgs[2]} className="w-full h-full object-cover rounded-[24px]" alt="" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const projects: ProjectItem[] = [
    { id: "01", name: "Nextlevel Studio", type: "Client", imgs: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"] },
    { id: "02", name: "Aura Brand Identity", type: "Personal", imgs: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"] },
    { id: "03", name: "Solaris Digital", type: "Client", imgs: ["https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85", "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"] },
  ];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" ref={containerRef} className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-6 sm:px-10 md:px-16 pb-32 w-full relative">
      <div className="py-20 md:py-32">
        <h2 className="hero-heading font-black uppercase text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Project</h2>
      </div>
      
      <div className="relative w-full">
        {projects.map((p, i) => (
          <ProjectCard 
            key={p.id} 
            project={p} 
            index={i} 
            total={projects.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
};

/** APP ENTRY POINT **/

export default function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen w-full text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
        
        .hero-heading {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background-color: #0C0C0C; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="w-full flex flex-col items-center">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        
        {/* Footer */}
        <footer id="contact" className="w-full px-6 md:px-12 py-24 bg-[#0C0C0C] flex flex-col items-center gap-10">
          <h2 className="hero-heading font-black uppercase text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>Let's Connect</h2>
          
          {/* Main Obfuscated Contact Button */}
          <ContactButton />

          <div className="flex gap-6 sm:gap-8 mt-4">
            {/* WhatsApp Icon */}
            <button 
              onClick={openWhatsAppChat}
              className="p-4 rounded-full border border-[#D7E2EA]/20 hover:border-[#25D366] hover:text-[#25D366] transition-all hover:scale-110 flex items-center justify-center text-[#D7E2EA] cursor-pointer" 
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z"/>
              </svg>
            </button>

            {/* GitHub */}
            <a href="#" className="p-4 rounded-full border border-[#D7E2EA]/20 hover:border-[#B600A8] transition-all hover:scale-110 flex items-center justify-center text-[#D7E2EA]" aria-label="GitHub">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* Twitter / X */}
            <a href="#" className="p-4 rounded-full border border-[#D7E2EA]/20 hover:border-[#B600A8] transition-all hover:scale-110 flex items-center justify-center text-[#D7E2EA]" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Mail */}
            <a 
              href="mailto:rafaysregalia@gmail.com" 
              className="p-4 rounded-full border border-[#D7E2EA]/20 hover:border-[#B600A8] transition-all hover:scale-110 flex items-center justify-center text-[#D7E2EA]" 
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="opacity-40 uppercase tracking-[0.3em] text-xs mt-10">© 2024 Rafay • All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}
