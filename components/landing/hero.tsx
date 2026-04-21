"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PrayerClock } from "./prayer-clock";
const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Waktu%20Sholat";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] bg-[#0A192F] overflow-hidden pt-20 sm:pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span className="absolute -top-6 -left-6 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.935 473.935" fill="none" className="text-emerald-400 opacity-50" width="32" height="32">
                <circle cx="236.967" cy="236.967" r="236.967" fill="currentColor"/>
                <g>
                  <path d="M384.794,246.816c0,2.185-1.77,3.948-3.94,3.948h-75.932c-2.178,0-3.94-1.762-3.94-3.948l0,0 c0-2.17,1.762-3.94,3.94-3.94h75.932C383.024,242.879,384.794,244.646,384.794,246.816L384.794,246.816z" fill="white" opacity=".3"/>
                  <path d="M308.731,267.699c-1.695,0-3.076-0.516-3.076-1.152v-22.222c0-0.636,1.381-1.149,3.076-1.149l0,0 c1.688,0,3.061,0.513,3.061,1.149v22.222C311.792,267.186,310.419,267.699,308.731,267.699L308.731,267.699z" fill="white" opacity=".3"/>
                  <path d="M377.352,267.699c-1.695,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.373-1.149,3.068-1.149l0,0 c1.688,0,3.061,0.513,3.061,1.149v22.222C380.416,267.186,379.043,267.699,377.352,267.699L377.352,267.699z" fill="white" opacity=".3"/>
                  <path d="M336.473,267.699c-1.695,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.373-1.149,3.068-1.149l0,0 c1.688,0,3.061,0.513,3.061,1.149v22.222C339.534,267.186,338.16,267.699,336.473,267.699L336.473,267.699z" fill="white" opacity=".3"/>
                  <path d="M322.157,267.699c-1.688,0-3.061-0.516-3.061-1.152v-22.222c0-0.636,1.373-1.149,3.061-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C325.225,267.186,323.852,267.699,322.157,267.699L322.157,267.699z" fill="white" opacity=".3"/>
                  <path d="M350.19,267.699c-1.695,0-3.061-0.516-3.061-1.152v-22.222c0-0.636,1.366-1.149,3.061-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C353.258,267.186,351.885,267.699,350.19,267.699L350.19,267.699z" fill="white" opacity=".3"/>
                  <path d="M363.631,267.699c-1.695,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.373-1.149,3.068-1.149l0,0 c1.695,0,3.061,0.513,3.061,1.149v22.222C366.691,267.186,365.326,267.699,363.631,267.699L363.631,267.699z" fill="white" opacity=".3"/>
                  <path d="M378.953,243.463h-73.002c0-18.226,16.34-36.213,36.497-36.213 C362.613,207.25,378.953,225.237,378.953,243.463z" fill="white" opacity=".3"/>
                  <path d="M172.141,246.816c0,2.185-1.77,3.948-3.94,3.948H92.269c-2.178,0-3.94-1.762-3.94-3.948l0,0 c0-2.17,1.762-3.94,3.94-3.94h75.932C170.371,242.879,172.141,244.646,172.141,246.816L172.141,246.816z" fill="white" opacity=".3"/>
                  <path d="M96.07,267.699c-1.688,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.381-1.149,3.068-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C99.139,267.186,97.765,267.699,96.07,267.699L96.07,267.699z" fill="white" opacity=".3"/>
                  <path d="M164.691,267.699c-1.688,0-3.061-0.516-3.061-1.152v-22.222c0-0.636,1.373-1.149,3.061-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C167.763,267.186,166.39,267.699,164.691,267.699L164.691,267.699z" fill="white" opacity=".3"/>
                  <path d="M123.812,267.699c-1.695,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.373-1.149,3.068-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C126.88,267.186,125.507,267.699,123.812,267.699L123.812,267.699z" fill="white" opacity=".3"/>
                  <path d="M109.5,267.699c-1.688,0-3.061-0.516-3.061-1.152v-22.222c0-0.636,1.373-1.149,3.061-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C112.572,267.186,111.198,267.699,109.5,267.699L109.5,267.699z" fill="white" opacity=".3"/>
                  <path d="M137.537,267.699c-1.695,0-3.061-0.516-3.061-1.152v-22.222c0-0.636,1.366-1.149,3.061-1.149l0,0 c1.695,0,3.068,0.513,3.068,1.149v22.222C140.605,267.186,139.232,267.699,137.537,267.699L137.537,267.699z" fill="white" opacity=".3"/>
                  <path d="M150.974,267.699c-1.695,0-3.068-0.516-3.068-1.152v-22.222c0-0.636,1.373-1.149,3.068-1.149l0,0 c1.688,0,3.061,0.513,3.061,1.149v22.222C154.038,267.186,152.665,267.699,150.974,267.699L150.974,267.699z" fill="white" opacity=".3"/>
                  <path d="M166.3,243.463H93.29c 0-18.226,16.34-36.213,36.505-36.213S166.3,225.237,166.3,243.463z" fill="white" opacity=".3"/>
                </g>
                <path d="M190.154,264.152H94.701c-10.818,0-19.622,8.808-19.622,19.622v91.446 c0,1.624,1.317,2.937,2.945,2.937h128.815c1.624,0,2.945-1.317,2.945-2.937v-91.446C209.783,272.96,200.979,264.152,190.154,264.152 z" fill="currentColor" opacity=".35"/>
                <g>
                  <path d="M303.257,146.528c0,3.371-2.732,6.099-6.095,6.099H179.703c-3.368,0-6.095-2.728-6.095-6.099l0,0 c0-3.356,2.728-6.092,6.095-6.092h117.458C300.522,140.441,303.257,143.172,303.257,146.528L303.257,146.528z" fill="currentColor" opacity=".45"/>
                  <path d="M185.581,178.831c-2.608,0-4.745-0.797-4.745-1.781v-34.376c0-0.988,2.133-1.785,4.745-1.785l0,0 c2.623,0,4.752,0.797,4.752,1.785v34.38C190.33,178.034,188.204,178.831,185.581,178.831L185.581,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M291.74,178.831c-2.616,0-4.745-0.797-4.745-1.781v-34.376c0-0.988,2.125-1.785,4.745-1.785l0,0 c2.623,0,4.745,0.797,4.745,1.785v34.38C296.481,178.034,294.363,178.831,291.74,178.831L291.74,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M228.5,178.831c-2.623,0-4.752-0.797-4.752-1.781v-34.376c0-0.988,2.125-1.785,4.752-1.785l0,0 c2.615,0,4.745,0.797,4.745,1.785v34.38C233.244,178.034,231.115,178.831,228.5,178.831L228.5,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M206.356,178.831c-2.616,0-4.737-0.797-4.737-1.781v-34.376c0-0.988,2.118-1.785,4.737-1.785l0,0 c2.623,0,4.752,0.797,4.752,1.785v34.38C211.108,178.034,208.979,178.831,206.356,178.831L206.356,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M249.723,178.831c-2.615,0-4.737-0.797-4.737-1.781v-34.376c0-0.988,2.118-1.785,4.737-1.785l0,0 c2.623,0,4.752,0.797,4.752,1.785v34.38C254.475,178.034,252.346,178.831,249.723,178.831L249.723,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M270.516,178.831c-2.623,0-4.752-0.797-4.752-1.781v-34.376c0-0.988,2.125-1.785,4.752-1.785l0,0 c2.616,0,4.737,0.797,4.737,1.785v34.38C275.25,178.034,273.132,178.831,270.516,178.831L270.516,178.831z" fill="currentColor" opacity=".45"/>
                  <path d="M294.232,141.342H181.29c0-28.198,25.28-56.022,56.464-56.022 C268.945,85.32,294.232,113.144,294.232,141.342z" fill="currentColor" opacity=".45"/>
                  <path d="M246.112,65.597c-8.61,0-15.581-6.971-15.581-15.581c0-7.674,5.545-14.039,12.849-15.334 c-1.036-0.153-2.077-0.251-3.143-0.251c-11.854,0-21.455,9.598-21.455,21.452s9.601,21.455,21.455,21.455 c11.854,0,21.455-9.601,21.455-21.455c0-1.066-0.101-2.11-0.254-3.136C260.144,60.048,253.787,65.597,246.112,65.597z" fill="currentColor" opacity=".45"/>
                  <path d="M245.282,93.002c0,2.623-15.053,2.623-15.053,0l2.784-17.167c0-2.616,2.125-4.745,4.745-4.745l0,0 c2.623,0,4.745,2.125,4.745,4.745L245.282,93.002z" fill="currentColor" opacity=".45"/>
                </g>
                <path d="M378.837,264.152h-95.446c-10.825,0-19.629,8.808-19.629,19.622v91.446 c0,1.624,1.317,2.937,2.945,2.937h128.815c1.624,0,2.945-1.317,2.945-2.937v-91.446C398.467,272.96,389.662,264.152,378.837,264.152 z" fill="currentColor" opacity=".35"/>
              </svg>
            </span>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6">
              v2.0 Sudah Tersedia
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Jadwal Sholat Digital
              <span className="text-emerald-400"> untuk TV Masjid</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu
              HP mengelola banyak TV, otomatis update setiap hari tanpa
              ribet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Buka Demo
                </a>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </a>
              </Button>
            </div>

            <p className="text-sm text-slate-500 mb-4 sm:mb-0">
              Hubungi kami untuk pemasangan. Bayar sekali, pakai selamanya.
            </p>

            <div className="flex justify-center sm:hidden">
              <div className="bg-[#0A192F] p-3 rounded-xl border border-slate-700 shadow-xl">
                <PrayerClock className="w-28 h-28" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden sm:block"
          >
            <div className="relative z-10 overflow-hidden">
              <PlaceholderImage
                width={1200}
                height={750}
                label="Hero: Mockup TV 65 Inch Angle"
                note="PNG transparan. TV miring 15deg. Layar isi UI Beranda: header putih 'MASJID AL-IKHLAS', 7 card, jam 18:04, Maghrib 18:08 aktif. Ada glow emerald di belakang. Ukuran 1200x750 biar ringan"
                className="rounded-2xl max-w-full"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 z-20">
              <div className="bg-[#0A192F] p-4 rounded-xl border border-slate-700 shadow-xl">
                <PrayerClock className="w-32 h-32" />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative sm:hidden -mt-5"
          >
            <div className="relative z-10 overflow-hidden">
              <PlaceholderImage
                width={800}
                height={500}
                label="Hero: Mockup TV 65 Inch Angle"
                note="PNG transparan. TV miring 15deg. Layar isi UI Beranda: header putih 'MASJID AL-IKHLAS', 7 card, jam 18:04, Maghrib 18:08 aktif. Ada glow emerald di belakang."
                className="rounded-2xl max-w-full"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}