import { useRef, useEffect, useState } from "react";

import { svgPaths } from "@/data/logoPaths";

interface AnimatedLogoBgProps {
    variant?: "light" | "dark";
    align?: "center" | "right";
}

const AnimatedLogoBg = ({ variant = "light", align = "center" }: AnimatedLogoBgProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showFill, setShowFill] = useState(false);
    const strokeColor = variant === "dark" ? "#1a1a1a" : "white";
    const fillColor = variant === "dark" ? "#1a1a1a" : "white";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    // Show fill after all strokes are drawn
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setShowFill(true), 4500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const alignClasses = align === "right"
        ? "justify-center md:justify-end md:pr-16"
        : "justify-center";

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 flex items-center ${alignClasses} pointer-events-none overflow-hidden`}
        >
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 723 862"
                className="w-[300px] h-[358px] md:w-[420px] md:h-[500px] opacity-[0.08]"
            >
                <g transform="translate(0.000000,862.000000) scale(0.100000,-0.100000)">
                    {/* Stroke drawing animation - all paths */}
                    {svgPaths.map((path, i) => (
                        <path
                            key={`stroke-${i}`}
                            d={path.d}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="15"
                            style={{
                                strokeDasharray: path.dashLen,
                                strokeDashoffset: isVisible ? 0 : path.dashLen,
                                transition: `stroke-dashoffset ${1.5 + path.dashLen / 2500}s ease-in-out ${path.delay}s`,
                            }}
                        />
                    ))}

                    {/* Fill layer — fades in after drawing completes */}
                    {svgPaths.map((path, i) => (
                        <path
                            key={`fill-${i}`}
                            d={path.d}
                            fill={fillColor}
                            stroke="none"
                            style={{
                                opacity: showFill ? 0.5 : 0,
                                transition: `opacity 1.5s ease-in-out ${i * 0.08}s`,
                            }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default AnimatedLogoBg;
