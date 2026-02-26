import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashLoaderProps {
    onComplete?: () => void;
    minimumDuration?: number;
}

// Stable random-ish particle data (seeded by index, no Math.random so no re-render flicker)
const particleData = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: 2 + (i % 5) * 1.1,
    left: 8 + ((i * 6.7) % 84),
    top: 10 + ((i * 9.3) % 75),
    duration: 2 + (i % 5) * 0.7,
    delay: (i * 0.3) % 2.8,
    driftX: (i % 2 === 0 ? -1 : 1) * (10 + (i % 4) * 8),
    riseY: -20 - (i % 6) * 10,
}));

const orbitalDots = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    angle: (i * 36) * (Math.PI / 180),
    radius: 100 + (i % 3) * 6,
    size: 1.5 + (i % 3) * 0.8,
    duration: 3.5 + (i % 4) * 1.2,
    delay: i * 0.2,
}));

// Read theme from localStorage to match ThemeContext behavior
function getInitialTheme(): boolean {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    return saved === "dark";
}

const SplashLoader = ({ onComplete, minimumDuration = 2400 }: SplashLoaderProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isDark] = useState(getInitialTheme); // Read once at mount from localStorage
    const [progress, setProgress] = useState(0);

    // Progress animation
    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            setProgress(Math.min((elapsed / minimumDuration) * 100, 100));
        }, 25);
        return () => clearInterval(interval);
    }, [minimumDuration]);

    // Dismiss timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete?.(), 700);
        }, minimumDuration);
        return () => clearTimeout(timer);
    }, [minimumDuration, onComplete]);

    // Theme-aware color palette
    const c = useMemo(() => {
        if (isDark) {
            return {
                bg: "linear-gradient(145deg, #0a0a0a 0%, #111111 30%, #0d0d0d 100%)",
                gold: "#D4AF37",
                goldSoft: "rgba(212,175,55,0.12)",
                goldMid: "rgba(212,175,55,0.3)",
                goldStrong: "rgba(212,175,55,0.5)",
                textPrimary: "#D4AF37",
                textSecondary: "rgba(255,255,255,0.35)",
                logoFilter: "invert(1) drop-shadow(0 0 20px rgba(212,175,55,0.3))",
                logoGlowA: "invert(1) drop-shadow(0 0 15px rgba(212,175,55,0.2))",
                logoGlowB: "invert(1) drop-shadow(0 0 30px rgba(212,175,55,0.5))",
                logoGlowC: "invert(1) drop-shadow(0 0 15px rgba(212,175,55,0.2))",
                ring: "rgba(212,175,55,0.07)",
                ringBorder: "#D4AF37",
                ringBorderSoft: "rgba(212,175,55,0.25)",
                progressTrack: "rgba(255,255,255,0.05)",
                progressGrad: "linear-gradient(90deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)",
                particle: "#D4AF37",
                shimmer: "rgba(255,255,255,0.5)",
            };
        } else {
            return {
                bg: "linear-gradient(145deg, #faf8f5 0%, #f0ece4 30%, #f7f3ed 100%)",
                gold: "#8B7025",
                goldSoft: "rgba(139,112,37,0.08)",
                goldMid: "rgba(139,112,37,0.2)",
                goldStrong: "rgba(139,112,37,0.35)",
                textPrimary: "#5a4a1a",
                textSecondary: "rgba(0,0,0,0.3)",
                logoFilter: "drop-shadow(0 0 15px rgba(139,112,37,0.15))",
                logoGlowA: "drop-shadow(0 0 10px rgba(139,112,37,0.1))",
                logoGlowB: "drop-shadow(0 0 22px rgba(139,112,37,0.25))",
                logoGlowC: "drop-shadow(0 0 10px rgba(139,112,37,0.1))",
                ring: "rgba(139,112,37,0.05)",
                ringBorder: "#8B7025",
                ringBorderSoft: "rgba(139,112,37,0.15)",
                progressTrack: "rgba(0,0,0,0.05)",
                progressGrad: "linear-gradient(90deg, #8B7025 0%, #D4AF37 50%, #8B7025 100%)",
                particle: "#c4a032",
                shimmer: "rgba(139,112,37,0.4)",
            };
        }
    }, [isDark]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: c.bg,
                        overflow: "hidden",
                    }}
                >
                    {/* ═══ Floating particles ═══ */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                        {particleData.map((p) => (
                            <motion.div
                                key={p.id}
                                style={{
                                    position: "absolute",
                                    width: p.size,
                                    height: p.size,
                                    borderRadius: "50%",
                                    background: `radial-gradient(circle, ${c.particle} 0%, transparent 70%)`,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    x: [0, p.driftX],
                                    y: [0, p.riseY],
                                    scale: [0.3, 1.4, 0.3],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* ═══ Decorative corner accents ═══ */}
                    <motion.div
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "10%",
                            width: 60,
                            height: 60,
                            borderTop: `1px solid ${c.goldMid}`,
                            borderLeft: `1px solid ${c.goldMid}`,
                            opacity: 0,
                        }}
                        animate={{ opacity: [0, 0.5, 0.3] }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                    />
                    <motion.div
                        style={{
                            position: "absolute",
                            bottom: "10%",
                            right: "10%",
                            width: 60,
                            height: 60,
                            borderBottom: `1px solid ${c.goldMid}`,
                            borderRight: `1px solid ${c.goldMid}`,
                            opacity: 0,
                        }}
                        animate={{ opacity: [0, 0.5, 0.3] }}
                        transition={{ delay: 1, duration: 1.5 }}
                    />

                    {/* ═══ Central logo container ═══ */}
                    <motion.div
                        style={{
                            position: "relative",
                            width: 230,
                            height: 230,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Expanding ring pulses */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    border: `1px solid ${c.ring}`,
                                }}
                                animate={{
                                    scale: [1, 1.8 + i * 0.25],
                                    opacity: [0.6, 0],
                                }}
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    delay: i * 0.9,
                                    ease: "easeOut",
                                }}
                            />
                        ))}

                        {/* Orbiting dots */}
                        {orbitalDots.map((dot) => (
                            <motion.div
                                key={dot.id}
                                style={{
                                    position: "absolute",
                                    width: dot.size,
                                    height: dot.size,
                                    borderRadius: "50%",
                                    background: c.gold,
                                    left: "50%",
                                    top: "50%",
                                    marginLeft: -dot.size / 2,
                                    marginTop: -dot.size / 2,
                                }}
                                animate={{
                                    x: [
                                        Math.cos(dot.angle) * dot.radius,
                                        Math.cos(dot.angle + Math.PI) * dot.radius,
                                        Math.cos(dot.angle + Math.PI * 2) * dot.radius,
                                    ],
                                    y: [
                                        Math.sin(dot.angle) * dot.radius,
                                        Math.sin(dot.angle + Math.PI) * dot.radius,
                                        Math.sin(dot.angle + Math.PI * 2) * dot.radius,
                                    ],
                                    opacity: [0.15, 0.5, 0.15],
                                }}
                                transition={{
                                    duration: dot.duration,
                                    repeat: Infinity,
                                    delay: dot.delay,
                                    ease: "linear",
                                }}
                            />
                        ))}

                        {/* Primary rotating ring */}
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: 8,
                                borderRadius: "50%",
                                border: "1.5px solid transparent",
                                borderTopColor: c.ringBorder,
                                borderRightColor: c.ringBorderSoft,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Secondary counter-rotating ring */}
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: 22,
                                borderRadius: "50%",
                                border: "1px solid transparent",
                                borderBottomColor: `${c.gold}60`,
                                borderLeftColor: `${c.gold}15`,
                            }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner slow ring */}
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: 38,
                                borderRadius: "50%",
                                border: "0.5px solid transparent",
                                borderTopColor: `${c.gold}30`,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Pulsing glow */}
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: "20%",
                                borderRadius: "50%",
                                background: `radial-gradient(circle, ${c.goldSoft} 0%, transparent 70%)`,
                                filter: "blur(12px)",
                            }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.85, 1.15, 0.85],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Logo */}
                        <motion.img
                            src="/images/Parshav_exports_Logo.svg"
                            alt="Parshav Exports"
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: "contain",
                                position: "relative",
                                zIndex: 2,
                                filter: c.logoFilter,
                            }}
                            animate={{
                                filter: [c.logoGlowA, c.logoGlowB, c.logoGlowC],
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* ═══ Brand name — letter-by-letter ═══ */}
                    <motion.div
                        style={{ marginTop: "1.5rem", overflow: "hidden", position: "relative", zIndex: 1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <div
                            style={{
                                fontFamily: '"Playfair Display", serif',
                                fontSize: "1.35rem",
                                fontWeight: 600,
                                color: c.textPrimary,
                                letterSpacing: "0.35em",
                                textTransform: "uppercase",
                                display: "flex",
                                gap: "0.02em",
                            }}
                        >
                            {"PARSHAV EXPORTS".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 18, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        delay: 0.5 + i * 0.05,
                                        duration: 0.5,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    style={{
                                        display: "inline-block",
                                        minWidth: char === " " ? "0.35em" : undefined,
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* ═══ Decorative divider ═══ */}
                    <motion.div
                        style={{
                            marginTop: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            position: "relative",
                            zIndex: 1,
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <div style={{ width: 30, height: 1, background: c.goldMid }} />
                        <motion.div
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                border: `1px solid ${c.gold}`,
                                background: "transparent",
                            }}
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <div style={{ width: 30, height: 1, background: c.goldMid }} />
                    </motion.div>

                    {/* ═══ Progress bar ═══ */}
                    <motion.div
                        style={{
                            marginTop: "1.5rem",
                            width: 200,
                            height: 2,
                            borderRadius: 2,
                            background: c.progressTrack,
                            overflow: "hidden",
                            position: "relative",
                            zIndex: 1,
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <motion.div
                            style={{
                                height: "100%",
                                borderRadius: 2,
                                background: c.progressGrad,
                                backgroundSize: "200% 100%",
                                width: `${progress}%`,
                                transition: "width 0.03s linear",
                            }}
                            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Shine */}
                        <motion.div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "30%",
                                height: "100%",
                                background: `linear-gradient(90deg, transparent, ${c.shimmer}, transparent)`,
                            }}
                            animate={{ x: ["-30%", "400%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* ═══ Tagline ═══ */}
                    <motion.p
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "0.65rem",
                            color: c.textSecondary,
                            marginTop: "1.25rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            position: "relative",
                            zIndex: 1,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.5, 0.8] }}
                        transition={{ delay: 1.5, duration: 2 }}
                    >
                        Exquisite Silver Jewelry
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashLoader;
