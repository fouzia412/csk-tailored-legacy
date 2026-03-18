import { Award, Users, Scissors, Briefcase } from "lucide-react";

const featuresLeft = [
  {
    icon: Award,
    title: "Since 1998",
    description:
      "25+ years of textile expertise in Hyderabad's premium fabric market",
  },
  {
    icon: Users,
    title: "Groomwear Experts",
    description: "Specialized in wedding sherwani and formal occasion fabrics",
  },
];

const featuresRight = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description: "Expert guidance for bespoke suits and traditional groomwear",
  },
  {
    icon: Briefcase,
    title: "Executive Fabrics",
    description: "Premium suiting for professionals who value quality",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-16 md:py-20 h-screen bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight">
            Why Choose CSK Textiles
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Trusted by Hyderabad's discerning men for over two decades
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-12">
            {featuresLeft.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <h3 className="text-3xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {index !== featuresLeft.length - 1 && (
                    <div className="border-b border-border/40" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-[4/4.5] overflow-hidden shadow-xl">
              <img
                src="/images/aboutPreview.jpg"
                alt="CSK Textiles"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-12">
            {featuresRight.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <h3 className="text-3xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {index !== featuresRight.length - 1 && (
                    <div className="border-b border-border/40" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
