'use client';

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
export default function HomePage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [language, setLanguage] = useState("en");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [view, setView] = useState("intro");

  const content = {
    en: {
      title: "Hey Syria",
      subtitle: "Discover stories steeped in history",
      enter: "Enter Experience",
      back: "Back to Map",
      gallery: "Gallery",
      video: "Video",
      drone: "Drone Footage",
      droneText: "Explore aerial perspectives and immersive visual journeys.",
      vr: "VR Experience",
      vrButton: "Enter VR Experience",
      locationLabel: "Damascus, Syria",
    },
    ar: {
      title: "هاي سوريا",
      subtitle: "اكتشف حكاياتٍ متجذرة في التاريخ",
      enter: "ادخل التجربة",
      back: "العودة إلى الخريطة",
      gallery: "الصور",
      video: "الفيديو",
      drone: "مشاهد الدرون",
      droneText: "استكشف المشاهد الجوية والرحلات البصرية الغامرة.",
      vr: "تجربة الواقع الافتراضي",
      vrButton: "ادخل تجربة الواقع الافتراضي",
      locationLabel: "دمشق، سوريا",
    },
  };

  const places = [
    {
      id: 1,
      name: "Umayyad Mosque – Damascus",
      coords: [36.3064, 33.5138],
      descriptionEn:
        "One of the most iconic landmarks in Syria, captured through still images, video and aerial perspectives.",
      descriptionAr:
        "أحد أبرز المعالم في سوريا، نقدمه من خلال الصور والفيديو والمشاهد الجوية.",
      images: ["/umayyad-1.jpg", "/umayyad-2.jpg", "/umayyad-3.jpg"],
      video: "/drone.mp4",
      drone: "/drone.mp4",
      vrPlaceholder: "/vr-placeholder.jpg",
    },
  ];

  useEffect(() => {
    if (view !== "map") return;
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [38.5, 35.0],
      zoom: 5.5,
    });

    mapRef.current = map;

    places.forEach((place) => {
      const markerEl = document.createElement("div");
      markerEl.style.width = "18px";
      markerEl.style.height = "18px";
      markerEl.style.borderRadius = "9999px";
      markerEl.style.background = "#f5f5f5";
      markerEl.style.border = "2px solid #111";
      markerEl.style.boxShadow = "0 0 0 6px rgba(255,255,255,0.12)";
      markerEl.style.cursor = "pointer";

      new mapboxgl.Marker(markerEl)
        .setLngLat(place.coords)
        .addTo(map);

      markerEl.addEventListener("click", () => {
        setSelectedPlace(place);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [view]);

  const t = content[language];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {view === "intro" && (
        <section
          style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/drone.mp4" type="video/mp4" />
          </video>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.75))",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              display: "flex",
              gap: 8,
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setLanguage("en")}
              style={langBtn(language === "en")}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              style={langBtn(language === "ar")}
            >
              عربي
            </button>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "24px",
            }}
          >
            <div style={{ maxWidth: 800 }}>
              <h1
                style={{
                  fontSize: "clamp(42px, 9vw, 96px)",
                  marginBottom: 16,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                {t.title}
              </h1>
              <p
                style={{
                  fontSize: "clamp(18px, 3vw, 28px)",
                  opacity: 0.9,
                  marginBottom: 28,
                }}
              >
                {t.subtitle}
              </p>
              <button
                onClick={() => setView("map")}
                style={{
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t.enter}
              </button>
            </div>
          </div>
        </section>
      )}

      {view === "map" && (
        <section style={{ position: "relative", height: "100vh" }}>
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              right: 18,
              zIndex: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                padding: "10px 14px",
                borderRadius: 999,
                backdropFilter: "blur(8px)",
                fontWeight: 700,
              }}
            >
              {t.title}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setLanguage("en")}
                style={langBtn(language === "en")}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                style={langBtn(language === "ar")}
              >
                عربي
              </button>
            </div>
          </div>

          <div
            ref={mapContainer}
            style={{ width: "100%", height: "100%" }}
          />

          {selectedPlace && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.88)",
                overflowY: "auto",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "24px",
                }}
              >
                <button
                  onClick={() => setSelectedPlace(null)}
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                    padding: "10px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    marginBottom: 24,
                  }}
                >
                  {t.back}
                </button>

                <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", margin: 0 }}>
                  {selectedPlace.name}
                </h2>
                <p style={{ opacity: 0.75, marginTop: 10, marginBottom: 18 }}>
                  {t.locationLabel}
                </p>
                <p
                  style={{
                    maxWidth: 820,
                    fontSize: 18,
                    lineHeight: 1.7,
                    opacity: 0.92,
                    marginBottom: 28,
                  }}
                >
                  {language === "ar"
                    ? selectedPlace.descriptionAr
                    : selectedPlace.descriptionEn}
                </p>

                <SectionTitle>{t.gallery}</SectionTitle>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 16,
                    marginBottom: 36,
                  }}
                >
                  {selectedPlace.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={selectedPlace.name}
                      style={{
                        width: "100%",
                        height: 260,
                        objectFit: "cover",
                        borderRadius: 18,
                        background: "#111",
                      }}
                    />
                  ))}
                </div>

                <SectionTitle>{t.video}</SectionTitle>
                <video
                  controls
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    marginBottom: 36,
                    background: "#111",
                  }}
                >
                  <source src={selectedPlace.video} type="video/mp4" />
                </video>

                <SectionTitle>{t.drone}</SectionTitle>
                <p style={{ opacity: 0.75, marginBottom: 14 }}>
                  {t.droneText}
                </p>
                <video
                  controls
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    marginBottom: 36,
                    background: "#111",
                  }}
                >
                  <source src={selectedPlace.drone} type="video/mp4" />
                </video>

                <SectionTitle>{t.vr}</SectionTitle>
                <img
                  src={selectedPlace.vrPlaceholder}
                  alt="VR"
                  style={{
                    width: "100%",
                    maxHeight: 420,
                    objectFit: "cover",
                    borderRadius: 20,
                    background: "#111",
                    marginBottom: 16,
                  }}
                />
                <button
                  style={{
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    padding: "14px 22px",
                    borderRadius: 999,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginBottom: 50,
                  }}
                >
                  {t.vrButton}
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        fontSize: 24,
        marginBottom: 14,
        marginTop: 0,
      }}
    >
      {children}
    </h3>
  );
}

function langBtn(active) {
  return {
    background: active ? "#fff" : "rgba(0,0,0,0.45)",
    color: active ? "#000" : "#fff",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "10px 14px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    backdropFilter: "blur(8px)",
  };
}
