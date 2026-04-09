import { motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-foreground selection:bg-primary/20 overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Simple Elegant Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="editorial-caps mb-4 block text-primary/70">
                Legal
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                Privacy <span className="italic text-yellow-600">Policy</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl mx-auto glass-card rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-elegant bg-white"
          >
            <div className="space-y-10 text-muted-foreground font-light leading-relaxed">
              <p className="text-lg md:text-xl italic text-foreground/80">
                At CSK Textiles, we hold your privacy in the highest regard.
                This policy explains how we collect, use, store, and safeguard
                your personal information when you interact with our platform,
                including browsing our fabric collections and placing bespoke
                orders.
              </p>

              <div className="space-y-8">
                {/* 1 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      01.
                    </span>{" "}
                    Information Collection
                  </h2>
                  <p>
                    We may collect personal details such as your name, phone
                    number, email address, shipping address, and tailoring
                    measurements when you place an order or interact with our
                    services.
                  </p>
                  <p className="mt-3">
                    Additionally, we automatically collect technical data such
                    as IP address, browser type, device information, and
                    browsing behavior to enhance performance and user
                    experience.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 2 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      02.
                    </span>{" "}
                    Use of Information
                  </h2>
                  <p>
                    Your information is used to process orders, manage
                    deliveries, provide customer support, and personalize your
                    experience across our textile collections and tailoring
                    services.
                  </p>
                  <p className="mt-3">
                    We may also use your contact details to send order updates,
                    promotional offers, and new arrivals. You can opt out of
                    marketing communications at any time.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 3 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      03.
                    </span>{" "}
                    Cookies & Tracking Technologies
                  </h2>
                  <p>
                    We use cookies and similar tracking technologies to remember
                    your preferences, maintain session security, and analyze how
                    users interact with our website.
                  </p>
                  <p className="mt-3">
                    These tools help us improve performance, recommend relevant
                    fabrics, and optimize the overall browsing experience. You
                    may disable cookies via your browser settings if preferred.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 4 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      04.
                    </span>{" "}
                    Data Security
                  </h2>
                  <p>
                    We implement industry-standard security measures, including
                    encryption and secure servers, to protect your personal
                    information from unauthorized access, misuse, or disclosure.
                  </p>
                  <p className="mt-3">
                    While we take all reasonable precautions, no digital system
                    is completely secure. We encourage users to maintain
                    confidentiality of their account details and notify us of
                    any suspicious activity.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 5 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      05.
                    </span>{" "}
                    Third-Party Services
                  </h2>
                  <p>
                    We may share necessary data with trusted third-party
                    services such as payment gateways, logistics providers, and
                    analytics platforms to facilitate transactions and improve
                    services.
                  </p>
                  <p className="mt-3">
                    These third parties operate under their own privacy
                    policies. We ensure they follow reasonable data protection
                    practices but are not responsible for their independent
                    policies.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 6 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      06.
                    </span>{" "}
                    Data Retention
                  </h2>
                  <p>
                    We retain your personal data only for as long as necessary
                    to fulfill orders, comply with legal obligations, and
                    maintain business records.
                  </p>
                  <p className="mt-3">
                    Once data is no longer required, it is securely deleted or
                    anonymized to prevent unauthorized access or misuse.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 7 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      07.
                    </span>{" "}
                    Your Rights
                  </h2>
                  <p>
                    You have the right to access, update, or request deletion of
                    your personal information at any time by contacting us.
                  </p>
                  <p className="mt-3">
                    You may also opt out of promotional communications and
                    request clarification on how your data is used.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 8 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      08.
                    </span>{" "}
                    Children's Privacy
                  </h2>
                  <p>
                    Our services are not intended for individuals under the age
                    of 18. We do not knowingly collect personal data from
                    minors.
                  </p>
                  <p className="mt-3">
                    If such data is identified, we will take immediate steps to
                    delete it from our systems.
                  </p>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                {/* 9 */}
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                    <span className="text-yellow-500 font-light italic">
                      09.
                    </span>{" "}
                    Policy Updates
                  </h2>
                  <p>
                    We may revise this Privacy Policy from time to time to
                    reflect changes in our practices or legal requirements.
                  </p>
                  <p className="mt-3">
                    Continued use of our platform after updates signifies your
                    acceptance of the revised policy. We recommend reviewing
                    this page periodically.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
