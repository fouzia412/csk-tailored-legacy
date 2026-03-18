import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CategoryGrid = ({ categories }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerTextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        leftRef.current,
        {
          y: () => {
            const overflow = leftRef.current.scrollHeight - window.innerHeight;
            return overflow > 0 ? -(overflow + 100) : 0;
          },
          ease: "none",
        },
        0,
      );

      tl.fromTo(
        rightRef.current,
        {
          y: () => {
            const overflow = rightRef.current.scrollHeight - window.innerHeight;
            return overflow > 0 ? -(overflow + 100) : 0;
          },
        },
        {
          y: 0,
          ease: "none",
        },
        0,
      );

      tl.fromTo(centerTextRef.current, { y: 0 }, { y: 200, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, [categories]);

  const left = categories.slice(0, 3);
  const right = categories.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-7xl h-full flex items-start justify-between px-6 pt-10">
        <div ref={leftRef} className="space-y-10 w-72">
          {left.map((c) => (
            <div key={c.id}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border-border">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2 flex items-center justify-between">
                      {c.name}
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            ref={centerTextRef}
            className="flex flex-col items-center justify-center text-center px-8 pointer-events-auto"
          >
            <h2 className="text-5xl font-bold mb-6 tracking-tight text-foreground">
              Our Strengths
            </h2>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Why customers choose us. Technology depth and unmatched
              flexibility.
            </p>
          </div>
        </div>

        <div ref={rightRef} className="space-y-10 w-72 pb-10">
          {right.map((c) => (
            <div key={c.id}>
              <Link to={c.link} className="group block">
                <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border-border">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2 flex items-center justify-between">
                      {c.name}
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
