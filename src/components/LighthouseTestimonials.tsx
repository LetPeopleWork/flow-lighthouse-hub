import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Lighthouse transformed how we understand and optimize our team's workflow. The insights are invaluable.",
        author: "Sarah Johnson",
        role: "Engineering Manager",
        company: "TechCorp"
    },
    {
        quote: "The real-time flow metrics helped us identify bottlenecks we never knew existed. Productivity up 40%.",
        author: "Michael Chen",
        role: "Product Director",
        company: "InnovateLab"
    },
    {
        quote: "Finally, data-driven decisions instead of gut feelings. Our forecasting accuracy improved dramatically.",
        author: "Emma Rodriguez",
        role: "Agile Coach",
        company: "FlowTech Solutions"
    },
    {
        quote: "The Swiss quality and privacy standards give us confidence in using Lighthouse for sensitive projects.",
        author: "Hans Mueller",
        role: "CTO",
        company: "SecureFlow AG"
    },
    {
        quote: "Open source core with premium enterprise features - exactly what we needed for our scaling organization.",
        author: "Lisa Wang",
        role: "VP Engineering",
        company: "GrowthTech"
    }
];

const TestimonialCard = ({
    testimonial
}: {
    testimonial: Testimonial;
}) => (
    <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardContent className="p-8">
            <blockquote className="text-lg text-muted-foreground mb-6 italic text-center">
                "{testimonial.quote}"
            </blockquote>
            <div className="text-center">
                <div className="font-semibold text-foreground">
                    {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                </div>
            </div>
        </CardContent>
    </Card>
);

const NavigationButton = ({
    onClick,
    direction
}: {
    onClick: () => void;
    direction: 'prev' | 'next';
}) => (
    <button
        onClick={onClick}
        className={`absolute ${direction === 'prev' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors`}
    >
        {direction === 'prev' ? (
            <ChevronLeft className="text-primary h-5 w-5" />
        ) : (
            <ChevronRight className="text-primary h-5 w-5" />
        )}
    </button>
);

const LighthouseTestimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const title = "See What Lighthouse Users Are Saying";

    return (
        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-12">
                    {title}
                </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <TestimonialCard testimonial={testimonials[currentTestimonial]} />

                <NavigationButton
                    onClick={prevTestimonial}
                    direction="prev"
                />
                <NavigationButton
                    onClick={nextTestimonial}
                    direction="next"
                />

                {/* Dots indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                    {testimonials.map((testimonial, testimonialIndex) => (
                        <button
                            key={`dot-${testimonial.author}`}
                            onClick={() => setCurrentTestimonial(testimonialIndex)}
                            className={`w-2 h-2 rounded-full transition-colors ${testimonialIndex === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LighthouseTestimonials;
