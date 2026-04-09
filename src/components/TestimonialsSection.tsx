import { TestimonialSlider } from "@/components/ui/testimonial-slider";

interface TestimonialsSectionProps {
  testimonials?: any; // Kept to satisfy parent component imports if any
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return <TestimonialSlider />;
};

export default TestimonialsSection;
