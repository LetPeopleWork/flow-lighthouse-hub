import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company?: string;
    authorUrl?: string;
    companyUrl?: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Lighthouse transformed how we understand and optimize our team's workflow. The insights are invaluable.",
        author: "Agnieszka Reginek",
        role: "Professional Kanban Trainer | Scrum Master",
        company: "",
        authorUrl: "https://www.linkedin.com/in/agnieszka-reginek/",
        companyUrl: ""
    },
    {
        quote: "The real-time flow metrics helped us identify bottlenecks we never knew existed. Productivity up 40%.",
        author: "Michael Chen",
        role: "Product Director",
        company: "InnovateLab",
        authorUrl: "https://linkedin.com/in/michael-chen",
        companyUrl: "https://innovatelab.com"
    },
    {
        quote: "Finally, data-driven decisions instead of gut feelings. Our forecasting accuracy improved dramatically.",
        author: "Emma Rodriguez",
        role: "Agile Coach",
        company: "FlowTech Solutions",
        authorUrl: "https://linkedin.com/in/emma-rodriguez"
    },
    {
        quote: "The Swiss quality and privacy standards give us confidence in using Lighthouse for sensitive projects.",
        author: "Hans Mueller",
        role: "CTO",
        company: "SecureFlow AG",
        companyUrl: "https://secureflow.ch"
    },
    {
        quote: "Open source core with premium enterprise features - exactly what we needed for our scaling organization.",
        author: "Lisa Wang",
        role: "VP Engineering",
        authorUrl: "https://linkedin.com/in/lisa-wang"
    }
];

const LinkedInIcon = () => (
    <svg 
        className="h-4 w-4" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const TestimonialCard = ({
    testimonial
}: {
    testimonial: Testimonial;
}) => (
    <Card className="border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
        <CardContent className="p-8">
            <blockquote className="text-lg text-card-foreground mb-6 italic text-center font-medium">
                "{testimonial.quote}"
            </blockquote>
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="font-semibold text-card-foreground">
                        {testimonial.authorUrl ? (
                            <a 
                                href={testimonial.authorUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors flex items-center gap-1"
                            >
                                {testimonial.author}
                                <LinkedInIcon />
                            </a>
                        ) : (
                            testimonial.author
                        )}
                    </span>
                </div>
                <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && (
                        <>
                            {" at "}
                            {testimonial.companyUrl ? (
                                <a 
                                    href={testimonial.companyUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                                >
                                    {testimonial.company}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            ) : (
                                testimonial.company
                            )}
                        </>
                    )}
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
        className={`absolute ${direction === 'prev' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full p-2 hover:bg-background hover:shadow-md transition-all duration-200`}
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
