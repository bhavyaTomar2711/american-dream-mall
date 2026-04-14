"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIDEO_URL =
  "https://res.cloudinary.com/dwo1snivu/video/upload/v1776164047/vid_2_p9xm5q.mp4";

const RESTAURANTS = [
  {
    name: "Carpaccio",
    tag: "Italian Fine Dining",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/Tagelli_Pasta__La_Mejor_Receta_F%C3%A1cil_y_R%C3%A1pida_pkgngh.jpg",
  },
  {
    name: "Mr. Beast Burger",
    tag: "Smash Burgers & Shakes",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/download_3_idzhl9.jpg",
  },
  {
    name: "American Dream Seafood",
    tag: "Fresh Catch Daily",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/Fresh_Seafood_Dish_royalty_free_stock_images_qlbzeb.jpg",
  },
  {
    name: "Little Sheep Hot Pot",
    tag: "Mongolian Hot Pot",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/Beef_and_Vegetable_Kabobs_with_Lemon_Herb_Marinade_fz0iqd.jpg",
  },
  {
    name: "Mozzarella Bar",
    tag: "Artisan Pizza & Pasta",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/usa_vkbqxv.jpg",
  },
  {
    name: "Marcus Live",
    tag: "Modern American Grill",
    src: "https://res.cloudinary.com/dwo1snivu/image/upload/v1776164039/FoodPhotography_FoodieGram_InstaFood_FoodStyling_FoodPics_FoodLover_Foodstagram_Yummy_Delicious_FoodPorn_HomeMadeFood_FoodArt_FoodBlogger_Tasty_FoodGasm_CulinaryPhotography_PlatingGoals_EatGoodFee_eb8kka.jpg",
  },
];

const TICKER = [...RESTAURANTS, ...RESTAURANTS, ...RESTAURANTS];

function FoodCard({ r }: { r: (typeof RESTAURANTS)[number] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        flexShrink: 0,
        width: "clamp(240px, 20vw, 300px)",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          aspectRatio: "3 / 4",
          cursor: "pointer",
        }}
      >
        <img
          src={r.src}
          alt={r.name}
          loading="lazy"
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
          }}
        />

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Text overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px",
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.95)",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {r.name}
          </h3>

          <div
            style={{
              marginTop: "14px",
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.20)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.80)",
              }}
            >
              Learn More
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DiningSection() {
  return (
    <section
      id="dining"
      style={{ background: "#F5F5F7", position: "relative" }}
    >
      {/* ═══════════════════════════════════════════
          HERO VIDEO BANNER
      ═══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(420px, 60vh, 680px)",
          overflow: "hidden",
        }}
      >
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(24px, 5vw, 80px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.50)" }} />
            <span
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.48em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.50)",
              }}
            >
              Dining &amp; Lifestyle
            </span>
            <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.50)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.95)",
              margin: 0,
              maxWidth: "700px",
            }}
          >
            Great Eats
            <br />
            For All
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "480px",
              margin: "24px 0 0",
              letterSpacing: "0.01em",
            }}
          >
            Taste buds delighted here. Whatever the occasion, you&rsquo;ll find
            dozens of delicious options — from the finest cuisine to simple and
            quick bites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            style={{ marginTop: "36px" }}
          >
            <motion.button
              whileHover={{ filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 36px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Explore Dining
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          AUTO-SLIDING RESTAURANT MARQUEE
      ═══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          background: "#F5F5F7",
          padding: "clamp(56px, 7vh, 96px) 0 clamp(72px, 9vh, 112px)",
          overflow: "hidden",
        }}
      >
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "clamp(60px, 10vw, 160px)",
            background: "linear-gradient(to right, #F5F5F7, transparent)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "clamp(60px, 10vw, 160px)",
            background: "linear-gradient(to left, #F5F5F7, transparent)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 2vw, 24px)",
            width: "max-content",
          }}
        >
          {TICKER.map((r, i) => (
            <FoodCard key={`${r.name}-${i}`} r={r} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
