import { PageHero } from "@/components/layout/PageHero";
import { LandMapPlaceholder } from "@/components/maps/LandMapPlaceholder";
import { Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Contact VOR"
        description="Reach our teams across Terrain, Home & Construct, Finance, and Corporate operations."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          {[
            { icon: MapPin, label: "Head office", value: "Cadastral Zone AO, Plot 758, Central Business District, Abuja, Federal Capital Territory" }, 
            { icon: Phone, label: "Phone", value: "+234 (0) 903 550 5663" },
            { icon: Mail, label: "Email", value: "vorsyd@gmail.com" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <Icon className="h-5 w-5 text-vor-gold shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-sm font-medium text-vor-navy">{label}</p>
                <p className="text-vor-slate">{value}</p>
              </div>
            </div>
          ))}
          <div>
            <div className="rounded-xl overflow-hidden mt-4 border border-vor-border">
              <LandMapPlaceholder />
            </div>
          </div>
        </div>
        <form className="bg-white rounded-xl border border-vor-border p-8 shadow-card space-y-4">
          <h2 className="font-display text-xl font-semibold text-vor-navy">Send a message</h2>
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
          />
          <select className="w-full rounded-md border border-vor-border px-3 py-2 text-sm">
            <option value="">Division of interest</option>
            <option>VOR Terrain</option>
            <option>VOR Home & Construct</option>
            <option>VOR Finance</option>
            <option>Corporate / General</option>
          </select>
          <textarea
            rows={4}
            placeholder="Your message"
            className="w-full rounded-md border border-vor-border px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-vor-navy text-white py-2.5 text-sm font-semibold hover:bg-vor-navy-light"
          >
            Submit enquiry
          </button>
        </form>
      </div>
    </>
  );
}
