tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#60A5FA",
                secondary: "#38BDF8",
                card: "rgba(15, 23, 42, 0.65)",
                stroke: "rgba(255,255,255,0.08)"
            },
            boxShadow: {
                glow: "0 0 80px rgba(56, 189, 248, 0.15)",
                soft: "0 10px 30px rgba(0,0,0,0.25)"
            },
            keyframes: {
                floaty: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" }
                },
                pulseGlow: {
                    "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
                    "50%": { opacity: 0.8, transform: "scale(1.05)" }
                },
                slideUp: {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" }
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" }
                }
            },
            animation: {
                floaty: "floaty 5s ease-in-out infinite",
                pulseGlow: "pulseGlow 6s ease-in-out infinite",
                slideUp: "slideUp 0.7s ease forwards",
                shimmer: "shimmer 2.5s linear infinite"
            },
            backdropBlur: {
                xs: "2px"
            }
        }
    }
};