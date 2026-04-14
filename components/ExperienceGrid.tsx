"use client";

import { motion } from "framer-motion";

const IMAGES = {
  large:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776112403/can_i_make_202604140151_qst4fp.jpg",
  medium:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776112403/freepik_make-the-exact-smae-image_2777344525_tstorr.png",
  portrait1:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776112403/can_u_make_202604140200_p44je8.jpg",
  portrait2:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776112403/ultra_realistic_large_202604140202_pyoob9.jpg",
  wheel:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776189089/mkae_it_more_202604142321_zdskqu.jpg",
  waterpark:
    "https://res.cloudinary.com/dwo1snivu/image/upload/v1776188306/this_is_dreamwork_202604142306_l6ecw3.jpg",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* Consistent color grading across every image in the grid */
const GRADING = "saturate(0.92) brightness(0.98) contrast(1.02)";

type Card = {
  src: string;
  aspect: string;
  title: string;
  subtitle: string;
  labelSide: "left" | "right";
};

function ImageCard({
  card,
  delay = 0,
}: {
  card: Card;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={{
        position: "relative",
        paddingBottom: "28px",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: card.aspect,
          borderRadius: "26px",
        }}
      >
      {/* Image wrapper — clips + scales on hover, shadow stays fixed */}
      <motion.div
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "26px",
          overflow: "hidden",
          boxShadow:
            "0 24px 56px -24px rgba(0,0,0,0.14), 0 6px 18px -6px rgba(0,0,0,0.06)",
          cursor: "pointer",
        }}
      >
        <img
          src={card.src}
          alt={card.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: GRADING,
            display: "block",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          draggable={false}
          loading="lazy"
        />
      </motion.div>

      </div>

      {/* Floating white label — overlaps the image slightly */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          ...(card.labelSide === "left"
            ? { left: "22px" }
            : { right: "22px" }),
          background: "#FFFFFF",
          borderRadius: "14px",
          padding: "13px 18px",
          boxShadow:
            "0 12px 28px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
          minWidth: "190px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#1D1D1F",
            letterSpacing: "-0.005em",
            lineHeight: 1.2,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(0,0,0,0.45)",
            letterSpacing: "0.005em",
            marginTop: "4px",
            lineHeight: 1.35,
          }}
        >
          {card.subtitle}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceGrid() {
  const leftTop: Card = {
    src: IMAGES.large,           /* mall exterior with ferris wheel */
    aspect: "4 / 3",
    title: "The Destination",
    subtitle: "A city within a city.",
    labelSide: "left",
  };
  const leftBottom: Card = {
    src: IMAGES.portrait2,       /* stage / event arena interior */
    aspect: "4 / 5",
    title: "The Arena",
    subtitle: "Concerts, conventions, spectacle.",
    labelSide: "right",
  };
  const rightTop: Card = {
    src: IMAGES.portrait1,       /* luxury pool & spa */
    aspect: "4 / 5",
    title: "The Retreat",
    subtitle: "Hospitality & wellness on site.",
    labelSide: "left",
  };
  const rightBottom: Card = {
    src: IMAGES.medium,          /* indoor ski resort */
    aspect: "4 / 3",
    title: "Big SNOW",
    subtitle: "Year-round indoor alpine resort.",
    labelSide: "right",
  };
  const rightExtra: Card = {
    src: IMAGES.wheel,
    aspect: "1 / 1",
    title: "The Giant Wheel",
    subtitle: "Iconic views of the Meadowlands.",
    labelSide: "left",
  };
  const fullWidth: Card = {
    src: IMAGES.waterpark,
    aspect: "16 / 9",
    title: "DreamWorks Water Park",
    subtitle: "North America's largest indoor water park.",
    labelSide: "left",
  };

  return (
    <section
      id="experience"
      style={{
        background: "#F5F5F7",
        padding:
          "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 80px) clamp(80px, 12vh, 140px)",
      }}
    >
      <div style={{ maxWidth: "1480px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          className="exp-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "clamp(32px, 5vw, 80px)",
            marginBottom: "clamp(40px, 5vh, 72px)",
            flexWrap: "wrap",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ maxWidth: "760px" }}
          >
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.38)",
                margin: "0 0 22px",
              }}
            >
              03 — The Experience
            </p>
            <h2
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#1D1D1F",
                margin: 0,
              }}
            >
              A city of
              <br />
              experiences.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "rgba(0,0,0,0.45)",
              maxWidth: "340px",
              margin: 0,
              flexShrink: 0,
            }}
          >
            Four anchors. One destination. A curated mix of retail, culture,
            thrill and spectacle — all engineered to keep visitors for hours.
          </motion.p>
        </div>

        {/* ── Asymmetric magazine grid ── */}
        <div
          className="exp-grid"
          style={{
            display: "flex",
            gap: "clamp(24px, 2.4vw, 40px)",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(28px, 3vw, 44px)",
              minWidth: 0,
            }}
          >
            <ImageCard card={leftTop} delay={0} />
            <ImageCard card={leftBottom} delay={0.18} />
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(28px, 3vw, 44px)",
              minWidth: 0,
            }}
          >
            <ImageCard card={rightTop} delay={0.1} />
            <ImageCard card={rightBottom} delay={0.26} />
          </div>
        </div>

        {/* ── Bottom row: wheel + waterpark side by side ── */}
        <div
          className="exp-grid-bottom"
          style={{
            display: "flex",
            gap: "clamp(28px, 3vw, 44px)",
            marginTop: "clamp(28px, 3vw, 44px)",
          }}
        >
          <div style={{ flex: "1", minWidth: 0 }}>
            <ImageCard card={rightExtra} delay={0.12} />
          </div>
          <div style={{ flex: "1.8", minWidth: 0 }}>
            <ImageCard card={fullWidth} delay={0.18} />
          </div>
        </div>
      </div>
    </section>
  );
}
