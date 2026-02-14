import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface PathData {
    d: string;
}

const AnimatedHeaderLogo = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showFill, setShowFill] = useState(false);
    const [paths, setPaths] = useState<PathData[]>([]);

    const strokeColor = theme === "dark" ? "#ffffff" : "#000000";
    const fillColor = theme === "dark" ? "#ffffff" : "#000000";

    // Extract paths from Parshav_exports_Logo.svg
    useEffect(() => {
        const extractPaths = async () => {
            try {
                const response = await fetch("/images/Parshav_exports_Logo.svg");
                const svgText = await response.text();
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const pathElements = svgDoc.querySelectorAll("path");

                const extractedPaths: PathData[] = [];
                pathElements.forEach((pathEl) => {
                    const d = pathEl.getAttribute("d");
                    if (d) {
                        extractedPaths.push({ d });
                    }
                });

                setPaths(extractedPaths);
            } catch (error) {
                console.error("Failed to load SVG:", error);
            }
        };

        extractPaths();
    }, []);

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

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center shrink-0 h-20 pb-2"
        >
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="843"
                height="679"
                viewBox="0 0 843.000000 679.000000"
                preserveAspectRatio="xMidYMid meet"
                className="h-full w-auto"
            >
                <g
                    transform="translate(0.000000,679.000000) scale(0.100000,-0.100000)"
                    fill={fillColor}
                    stroke="none"
                >
                    {/* Stroke drawing animation */}
                    {paths.map((pathData, i) => (
                        <path
                            key={`stroke-${i}`}
                            d={pathData.d}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="12"
                            style={{
                                strokeDasharray: 8000,
                                strokeDashoffset: isVisible ? 0 : 8000,
                                transition: `stroke-dashoffset ${1.8 + i * 0.06}s ease-in-out ${i * 0.03}s`,
                            }}
                        />
                    ))}

                    {/* Fill layer */}
                    {paths.map((pathData, i) => (
                        <path
                            key={`fill-${i}`}
                            d={pathData.d}
                            fill={fillColor}
                            stroke="none"
                            style={{
                                opacity: showFill ? 1 : 0,
                                transition: `opacity 1.5s ease-in-out ${i * 0.08}s`,
                            }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default AnimatedHeaderLogo;
