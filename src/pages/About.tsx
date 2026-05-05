import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, Scissors, Gem, Shirt, Briefcase, Quote } from "lucide-react";
import adImag from "@/assets/gallery/L7P00229.jpg";
const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ADD THIS FOR THE TIMELINE BOSS:
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  // Parallax effects for hero
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const offerings = [
    {
      title: "Executive Suiting & Shirting",
      description:
        "Sourced from the world’s most revered mills, our collection features ultra-fine Italian wools, long-staple Egyptian cotton, and lightweight linen blends. Designed for the discerning professional, these fabrics offer an impeccable drape, natural breathability, and buttery-soft comfort from the boardroom to evening engagements.",
      icon: Star,
    },
    {
      title: "Ceremonial & Heritage Wear",
      description:
        "Make a profound statement with our opulent ceremonial collections. Featuring pure raw silks, hand-loomed brocades, and structured majestic Sherwanis, we honor rich Indian craftsmanship while providing a regal, modern fit for your most unforgettable milestones.",
      icon: Shirt,
    },
    {
      title: "Bespoke Tailoring & Accessories",
      description:
        "A collaborative journey between wearer and artisan. We transform your chosen fabrics into master-crafted bespoke garments flawlessly mapped to your physical architecture, and elevate your final ensemble with curated pure silk ties, bespoke pocket squares, and handcrafted cufflinks.",
      icon: Scissors,
    },
  ];

  const editorialJourney = [
    {
      year: "1991",
      title: "The Vision Begins",
      description:
        "Driven by a profound respect for authentic weaves, Chimanlal Suresh Kumar establishes CSK Textiles in the historic heart of the Rikabgunj market. The goal was simple yet ambitious: to introduce a meticulous, uncompromising standard of luxury textiles to the gentlemen of Hyderabad, honoring the city's rich Nawabi sartorial heritage while offering modern refinement.",
      image: "/images/a1.png",
    },
    {
      year: "1998",
      title: "The Master's Guild",
      description:
        "To ensure our fabrics were treated with the reverence they deserved, we established our dedicated bespoke workshop. We brought together third-generation master craftsmen, preserving the dying art of hand-stitching. From the precise cut of the shear to the final press of the iron, we ensured every lapel roll and buttonhole met an exacting, world-class standard.",
      image: "/images/a2.png",
    },
    {
      year: "2005",
      title: "A Groom's Sanctuary",
      description:
        "Recognizing a distinct void in high-end ceremonial wear, we expanded our curation into bespoke wedding and groomwear. Through sheer word-of-mouth excellence, CSK Textiles quickly became the city's preferred destination for families seeking unparalleled elegance, often outfitting three generations of gentlemen for a single royal celebration.",
      image: "/images/a3.png",
    },
    {
      year: "2012",
      title: "Global Sourcing",
      description:
        "Refusing to settle for the ordinary, our quest for absolute perfection led us across the globe. We forged direct, personal relationships with the historic, centuries-old mills of Biella, Italy, and Yorkshire, England, securing exclusive access to the world's most coveted worsted wools, rare silks, and specialty cashmere blends.",
      image: "/images/a4.png",
    },
    {
      year: "2015",
      title: "The Executive Standard",
      description:
        "Answering the call of Hyderabad's rapidly evolving corporate landscape, we launched our curated executive suiting line. By pairing imported, high-performance breathable fabrics with sharp, modern tailoring, we began outfitting the city's top business leaders, tech pioneers, and influential executives for the global boardroom.",
      image: "/images/a5.png",
    },
    {
      year: "2021",
      title: "The Modern Atelier",
      description:
        "We reimagined our original Rikabgunj showroom, transforming it into a state-of-the-art experiential studio. Featuring private fitting lounges, ambient lighting tailored to show true fabric colors, and a vast, tactile fabric library, the space beautifully balances the warmth of our rich heritage with the pristine sophistication of contemporary luxury.",
      image: "/images/a6.png",
    },
    {
      year: "Today",
      title: "A Timeless Legacy",
      description:
        "With 35 years of sartorial mastery behind us, our commitment to the craft remains entirely unshaken. We continue to serve a multi-generational community of discerning gentlemen who value supreme quality, transparent heritage, and the enduring, transformative art of dressing flawlessly.",
      image: "/images/a7.png",
    },
  ];

  const craftsmanshipProcess = [
    {
      step: "01",
      title: "Vision & Selection",
      description:
        "True bespoke begins with a conversation to understand your lifestyle and stylistic preferences. Guided by our master clothiers, you will then navigate our curated library of the world's finest textiles to select the perfect fabric weight, ply, and drape.",
    },
    {
      step: "02",
      title: "Architecture & Drafting",
      description:
        "Far beyond standard sizing, over 30 distinct measurements are meticulously recorded to analyze your natural stance. From this geometric profile, a unique paper pattern is drafted exclusively from scratch, ensuring the garment’s drape aligns flawlessly with your body mechanics.",
    },
    {
      step: "03",
      title: "Fitting & The Final Polish",
      description:
        "The initial skeleton of your suit is prepared for a baste fitting, allowing for highly precise structural contouring. Finally, our master finishers complete the garment with exquisite hand-stitched detailing and genuine horn buttons, delivering a true sartorial masterpiece.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 selection:bg-yellow-600/20 selection:text-zinc-900 overflow-x-hidden font-sans"
      ref={containerRef}
    >
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* --- LUXURY HERO SECTION --- */}
        <section className="relative py-28 md:py-40 w-full flex items-center justify-center overflow-hidden bg-zinc-950">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="/images/aboutB.png"
              alt="Luxury Tailoring"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto flex flex-col items-center"
            >
              <span className="text-yellow-500/80 uppercase tracking-[0.4em] text-xs md:text-sm font-semibold mb-6">
                Established 1991
              </span>
              <h1 className="text-2xl md:text-6xl  font-serif text-white mb-8 leading-[1.1] tracking-tight">
                The Art of <br />
                <span className="italic font-light text-yellow-500">
                  Excellence
                </span>
              </h1>
              <p className="text-sm md:text-lg text-zinc-300 font-light max-w-xl mx-auto uppercase tracking-[0.2em] leading-relaxed">
                A quarter-century of uncompromising quality and sartorial
                mastery.
              </p>
            </motion.div>
          </div>

          {/* Premium Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 hidden md:flex"
          >
            <div className="w-[1px] h-16 bg-zinc-700 relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-yellow-500"
              />
            </div>
          </motion.div>
        </section>

        {/* --- NEW SECTION: CEO / FOUNDER INFO --- */}
        <section className="py-10 md:py-20 bg-white overflow-hidden relative">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
            >
              {/* Image Column with Editorial Frame */}
              <div className="w-full lg:w-5/12 relative flex justify-center lg:justify-start">
                {/* Elegant Offset Frame */}
                <div className="absolute inset-0 md:-inset-6 border border-zinc-200 rounded-sm -z-10 transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 max-w-md mx-auto lg:mx-0 w-full aspect-[4/5]" />

                <div className="aspect-[4/5] max-w-md w-full mx-auto lg:mx-0 overflow-hidden relative group shadow-2xl  rounded-3xl">
                  <div className="absolute inset-0   " />
                  <img
                    src="/images/CSK_CEO.jpeg"
                    alt="Director / CEO"
                    className="w-full h-full object-cover object-bottom hover:scale-105 transition-transform duration-1000 ease-out rounded-3xl"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                {/* Flipped quote icon for opening quotation */}
                <Quote className="w-10 h-10 md:w-14 md:h-14 text-amber-400 mb-3 transform rotate-180" />

                <h3 className="text-2xl md:text-4xl font-serif text-zinc-900 mb-6 leading-[1.2] italic tracking-tight">
                  "Our garments are not merely tailored they are architected. We
                  do not just dress men we frame their legacy."
                </h3>

                {/* Bio with Drop Cap */}
                <div className="space-y-3 text-zinc-600 font-light leading-relaxed mb-6 md:text-lg">
                  <p>
                    <span className="font-serif text-[36px] line-height-[0]  float-left md:-mt-2 -mt-[10px]  leading-none   text-zinc-900">
                      U
                    </span>
                    nder the visionary leadership of our founder, CSK Textiles
                    has grown from a humble textile trader in the historic
                    Rikabgunj market to Hyderabad’s premier destination for
                    bespoke luxury.
                  </p>
                  <p>
                    With an unrelenting eye for detail and a deep understanding
                    of global textile sourcing, the leadership has ensured that
                    every yard of fabric that enters our atelier represents the
                    absolute pinnacle of quality.
                  </p>
                </div>

                {/* Signature Block */}
                <div className="border-t border-amber-400 pt-4 inline-block w-full max-w-md">
                  <h4 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900 tracking-wide">
                    Chimanlal Suresh Kumar
                  </h4>
                  <p className="text-xs md:text-sm text-yellow-600 uppercase tracking-[0.2em] mt-2 font-semibold">
                    Founder & Managing Director
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- PREMIUM TIMELINE SECTION --- */}
        <section
          ref={timelineRef}
          className="py-20 md:py-32 bg-[#0E1831] text-white relative"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                The Heritage
              </span>
              <h2 className="text-4xl md:text-6xl font-serif">
                A Journey Through{" "}
                <span className="italic font-light">Time</span>
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Central Golden Line (Desktop) / Left Line (Mobile) */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 md:-translate-x-1/2 z-0">
                {/* NOW USING timelineProgress BOSS */}
                <motion.div
                  style={{ scaleY: timelineProgress, transformOrigin: "top" }}
                  className="w-full h-full bg-yellow-500/80"
                />
              </div>

              {editorialJourney.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative z-10 mb-16 md:mb-24 last:mb-0 group"
                  >
                    {/* Timeline Node - Interactive Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute left-4 md:left-[49.2%] w-4 h-4 rounded-full bg-zinc-950 border-2 border-yellow-500 -translate-x-1/2 mt-8 md:mt-0 transition-transform duration-500 group-hover:scale-150 group-hover:bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                    />

                    <div
                      className={`flex flex-col md:flex-row items-center justify-between w-full pl-16 md:pl-0 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Image Container */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-[45%] mb-8 md:mb-0 flex justify-center"
                      >
                        <div className="w-full max-w-[400px] aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-sm relative">
                          <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
                          />
                        </div>
                      </motion.div>

                      {/* Content Container */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-[45%] flex flex-col justify-center"
                      >
                        <span className="text-yellow-500 font-serif text-5xl md:text-6xl mb-4 block opacity-90">
                          {step.year}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif mb-4">
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- CRAFTSMANSHIP SECTION --- */}
        <section className="py-10 md:py-20 bg-[#F2EFE9] border-y border-zinc-200">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-10 items-start max-w-7xl mx-auto">
              <div className="lg:w-1/3 sticky top-32">
                <h2 className="text-2xl md:text-5xl font-serif text-zinc-900 leading-tight mb-6">
                  The Master's <br className="hidden md:block" />
                  <span className="italic font-light text-zinc-500">Craft</span>
                </h2>
                <p className="text-zinc-600 font-light leading-relaxed">
                  A bespoke garment is an intimate collaboration between the
                  wearer and the artisan. Discover the meticulous, multi-stage
                  process behind our custom tailoring.
                </p>
              </div>
              <div className="lg:w-2/3 grid md:grid-cols-3 gap-8">
                {craftsmanshipProcess.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                    className="flex flex-col h-full"
                  >
                    {/* Step + Title wrapper */}
                    <div className="flex items-center gap-3 md:flex-col md:items-start">
                      <span className="text-zinc-300 font-serif text-3xl md:text-4xl">
                        {item.step}
                      </span>

                      <h4 className="text-lg md:text-xl font-semibold">
                        {item.title}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm leading-relaxed mt-3 flex-grow">
                      {item.description}
                    </p>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-zinc-300 mt-6 md:mt-8" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- THE ETHOS SECTION (Fixed Image Sizing Boss!) --- */}
        <section className="py-10 md:py-20 relative bg-[#FAFAFA] overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center justify-center max-w-7xl mx-auto"
            >
              {/* Image Container - Constrained Width */}
              <div className="w-full lg:w-5/12 order-2 lg:order-1 flex justify-center">
                <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/3]">
                  {/* Decorative Background Element */}
                  <div className="absolute -inset-4 bg-white border border-zinc-200 rounded-sm -z-10 transform translate-x-3 translate-y-3" />
                  <img
                    src="/images/about-1.png"
                    alt="Fine Fabrics"
                    className="w-full h-full object-cover rounded-sm shadow-xl "
                  />
                </div>
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-7/12 order-1 lg:order-2">
                <span className="text-yellow-600 uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
                  Our Philosophy
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 mb-8 leading-[1.1]">
                  Where Heritage Meets <br />
                  <span className="italic font-light text-zinc-500">
                    Contemporary Style.
                  </span>
                </h2>
                <div className="space-y-6 text-base md:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl">
                  <p>
                    CSK Textiles is more than a showroom; it is a repository of
                    Hyderabad's rich sartorial heritage. Founded by Chimanlal
                    Suresh Kumar, we have dedicated over two decades to the
                    relentless pursuit of the perfect fabric.
                  </p>
                  <p>
                    Nestled in the bustling heart of Rikabgunj, we offer a
                    sanctuary for the discerning gentleman. Our collection is a
                    carefully curated dialogue between tradition and innovation,
                    featuring exclusive imports from the world's most
                    prestigious mills.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- WHAT WE OFFER / THE COLLECTIONS --- */}
        <section className="py-10 md:py-20 bg-[#FAFAFA]">
          <div className="container mx-auto px-6 lg:px-12 text-center mb-10">
            <span className="text-yellow-600 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              The Collections
            </span>
            <h2 className="text-4xl md:text-6xl font-serif">
              Curated{" "}
              <span className="italic font-light text-zinc-500">
                Selections
              </span>
            </h2>
          </div>

          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {offerings.map((offering, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group bg-white p-10 border border-zinc-100 hover:border-yellow-200 transition-colors duration-500 rounded-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center text-center cursor-default"
                >
                  <div className="mb-8 w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center text-zinc-800 group-hover:bg-zinc-900 group-hover:text-yellow-500 transition-all duration-500">
                    <offering.icon strokeWidth={1.5} className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif mb-4 text-zinc-900">
                    {offering.title}
                  </h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed">
                    {offering.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- LUXURY VALUES BANNER --- */}
        <section className="h-[55vh] md:h-[60vh] relative flex items-center overflow-hidden bg-zinc-900">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={adImag}
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              alt="Heritage"
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-zinc-950/40 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-2xl max-w-4xl mx-auto"
            >
              {/* Title */}
              <h2 className="text-white text-2xl md:text-5xl lg:text-6xl font-serif mb-8 md:mb-14 italic font-light tracking-tight">
                Redefining Elegance
              </h2>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 md:gap-12">
                {[
                  { label: "Quality", value: "Premium" },
                  { label: "Expertise", value: "Masters" },
                  { label: "Legacy", value: "35+ Years" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`
              text-center px-2 md:px-4
              ${i === 2 ? "col-span-2 md:col-span-1" : ""}
            `}
                  >
                    {/* Label */}
                    <div className="text-yellow-500/80 uppercase tracking-[0.25em] mb-2 text-[10px] md:text-xs font-semibold">
                      {stat.label}
                    </div>

                    {/* Value */}
                    <div className="text-white text-lg md:text-3xl font-serif">
                      {stat.value}
                    </div>

                    {/* Mobile divider (only for top 2 items) */}
                    {i < 2 && (
                      <div className="mt-4 h-[1px] bg-white/10 md:hidden" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
