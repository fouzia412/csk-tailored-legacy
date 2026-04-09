import { motion } from "framer-motion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const TermsPage = () => {
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
                Terms &{" "}
                <span className="italic text-yellow-600">Conditions</span>
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
            Welcome to CSK Textiles. By accessing or using our website and
            services, you agree to comply with and be bound by the following
            comprehensive terms and conditions of use. These terms govern your
            interaction with our platform, including browsing, purchasing
            fabrics, and engaging with our bespoke tailoring services.
          </p>

          <div className="space-y-8">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">01.</span>{" "}
                Use of Website
              </h2>
              <p>
                You agree to use this website solely for lawful purposes and in
                a manner that does not infringe upon the rights of others. Any
                attempt to disrupt the website, gain unauthorized access, or
                misuse its content is strictly prohibited.
              </p>
              <p className="mt-3">
                You must not reproduce, duplicate, copy, sell, or exploit any
                portion of the website without express written consent. We
                reserve the right to restrict or terminate access if misuse is
                detected.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">02.</span>{" "}
                Product Information & Accuracy
              </h2>
              <p>
                We ensure that all fabric descriptions, specifications, and
                pricing are presented with precision. However, slight variations
                in color, texture, or weave may occur due to lighting conditions
                and screen differences.
              </p>
              <p className="mt-3">
                Fabric compositions, GSM, and finishes are subject to batch
                variations inherent in textile production. We encourage
                customers to request samples where available before placing bulk
                or bespoke orders.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">03.</span>{" "}
                Bespoke Orders & Payments
              </h2>
              <p>
                All bespoke tailoring and customized fabric orders require
                accurate measurements and confirmed specifications from the
                customer. Once production has commenced, modifications may not
                be possible.
              </p>
              <p className="mt-3">
                Advance payments may be required for custom orders. Delays
                caused by incorrect measurements or customer changes will not be
                our responsibility. Refunds are only applicable in cases of
                confirmed defects or non-fulfillment.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">04.</span>{" "}
                Intellectual Property Rights
              </h2>
              <p>
                All designs, fabric patterns, brand elements, and digital assets
                on this website are proprietary to CSK Textiles and protected
                under applicable intellectual property laws.
              </p>
              <p className="mt-3">
                Unauthorized use, replication, or distribution of our designs or
                content for commercial or personal purposes is strictly
                prohibited and may result in legal action.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">05.</span>{" "}
                Limitation of Liability
              </h2>
              <p>
                While we strive to provide high-quality fabrics and services,
                CSK Textiles shall not be held liable for any indirect,
                incidental, or consequential damages arising from the use of our
                products or platform.
              </p>
              <p className="mt-3">
                Our liability, in any case, shall be limited strictly to the
                value of the purchased product. We are not responsible for
                misuse, improper fabric care, or third-party tailoring outcomes.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">06.</span>{" "}
                Modifications to Terms
              </h2>
              <p>
                We reserve the right to update or revise these terms at any time
                to reflect changes in our business practices, legal
                requirements, or service offerings.
              </p>
              <p className="mt-3">
                Continued use of the website after such updates constitutes your
                acceptance of the revised terms. We encourage users to review
                this page periodically.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 7 NEW */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">07.</span>{" "}
                Fabric Care & Handling Disclaimer
              </h2>
              <p>
                All fabrics require proper care depending on their composition.
                We recommend following professional dry-cleaning or specific
                care instructions provided with each fabric.
              </p>
              <p className="mt-3">
                CSK Textiles is not responsible for damage caused due to
                improper washing, ironing, dyeing, or handling after delivery.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 8 NEW */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">08.</span>{" "}
                Shipping & Delivery
              </h2>
              <p>
                Delivery timelines are estimated and may vary depending on
                location, order type, and external logistics factors. Custom
                orders may require additional processing time.
              </p>
              <p className="mt-3">
                We are not liable for delays caused by courier services, natural
                events, or unforeseen circumstances beyond our control.
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

            {/* 9 NEW */}
            <section>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-4">
                <span className="text-yellow-500 font-light italic">09.</span>{" "}
                Governing Law
              </h2>
              <p>
                These terms shall be governed and interpreted in accordance with
                the laws of India. Any disputes arising shall be subject to the
                jurisdiction of local courts.
              </p>
              <p className="mt-3">
                By using our services, you agree to submit to the exclusive
                jurisdiction of these courts for resolution of disputes.
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

export default TermsPage;
