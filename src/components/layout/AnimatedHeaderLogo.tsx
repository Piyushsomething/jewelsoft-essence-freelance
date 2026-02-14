import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface PathData {
    d: string;
    dashLen?: number;
    delay?: number;
}

const AnimatedHeaderLogo = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showFill, setShowFill] = useState(false);
    const [paths, setPaths] = useState<PathData[]>([]);

    const strokeColor = theme === "dark" ? "#ffffff" : "#000000";
    const fillColor = theme === "dark" ? "#ffffff" : "#000000";

    // Extract paths from Parshav_exports_Logo.svg and calculate their lengths
    useEffect(() => {
        const extractPaths = async () => {
            try {
                const response = await fetch("/images/Parshav_exports_Logo.svg");
                const svgText = await response.text();
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const pathElements = svgDoc.querySelectorAll("path");

                const extractedPaths: PathData[] = [];
                let delayCounter = 0;
                
                pathElements.forEach((pathEl) => {
                    const d = pathEl.getAttribute("d");
                    if (d) {
                        // Approximate dash length based on command count
                        const dashLen = Math.max(500, d.split(/[MmLlHhVvCcSsQqTtAaZz]/).length * 50);
                        extractedPaths.push({ 
                            d, 
                            dashLen,
                            delay: delayCounter * 0.1
                        });
                        delayCounter++;
                    }
                });

                setPaths(extractedPaths);
            } catch (error) {
                console.error("Failed to load SVG:", error);
            }
        };

        extractPaths();
    }, []);

    // Calculate actual path lengths after SVG renders
    useEffect(() => {
        if (svgRef.current && isVisible && paths.length > 0) {
            const strokePaths = svgRef.current.querySelectorAll("[data-path-index]");
            const updatedPaths = [...paths];
            
            strokePaths.forEach((pathEl: any, index: number) => {
                try {
                    const length = pathEl.getTotalLength?.() || 0;
                    if (length > 0 && updatedPaths[index]) {
                        updatedPaths[index].dashLen = length;
                    }
                } catch (e) {
                    // Continue with approximated length
                }
            });
            
            setPaths(updatedPaths);
        }
    }, [svgRef.current, isVisible]);

    useEffect(() => {
        const hasMeasuredRef = { current: false } as { current: boolean };

        const measureAndStart = () => {
            if (!svgRef.current || paths.length === 0 || hasMeasuredRef.current) return;

            const strokePaths = svgRef.current.querySelectorAll("path[data-path-index]");
            const updatedPaths = [...paths];

            strokePaths.forEach((pathEl: any, index: number) => {
                try {
                    const length = pathEl.getTotalLength?.() || 0;
                    if (length > 0 && updatedPaths[index]) {
                        updatedPaths[index].dashLen = length;
                    }
                } catch (e) {
                    // ignore
                }
            });

            setPaths(updatedPaths);
            hasMeasuredRef.current = true;
            // start animation after lengths are set
            setIsVisible(true);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    // ensure we measure path lengths first so animation timing uses real lengths
                    measureAndStart();
                }
            },
            { threshold: 0.15 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible, paths.length]);

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
                ref={svgRef}
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
                            data-path-index={i}
                            d={pathData.d}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth="15"
                            style={{
                                strokeDasharray: pathData.dashLen || 8000,
                                strokeDashoffset: isVisible ? 0 : (pathData.dashLen || 8000),
                                transition: `stroke-dashoffset ${1.5 + (pathData.dashLen || 8000) / 2500}s ease-in-out ${pathData.delay || 0}s`,
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
