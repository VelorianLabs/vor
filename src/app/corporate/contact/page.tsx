import { PageHero } from "@/components/layout/PageHero";
import { Mail, MapPin, Phone, Clock, Building2, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Contact VOR" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Contact VOR"
        description="Reach our teams across Terrain, Home & Construct, Finance, and Corporate operations."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-gold/10 text-vor-gold mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-vor-navy mb-2">Head Office</h3>
            <p className="text-sm text-vor-slate leading-relaxed">
              Cadastral Zone AO, Plot 758<br />
              Central Business District<br />
              Abuja, FCT
            </p>
          </div>

          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-trust/10 text-vor-trust mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-vor-navy mb-2">Phone</h3>
            <p className="text-sm text-vor-slate leading-relaxed">
              +234 (0) 903 550 5663<br />
              Mon-Fri: 8am - 6pm<br />
              Sat: 9am - 2pm
            </p>
          </div>

          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-navy/10 text-vor-navy mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-vor-navy mb-2">Email</h3>
            <p className="text-sm text-vor-slate leading-relaxed">
              vorsyd@gmail.com<br />
              support@vor.ng<br />
              info@vor.ng
            </p>
          </div>

          <div className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-vor-gold/10 text-vor-gold mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-vor-navy mb-2">Office Hours</h3>
            <p className="text-sm text-vor-slate leading-relaxed">
              Monday - Friday: 8am - 6pm<br />
              Saturday: 9am - 2pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Division Contacts */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-semibold text-vor-navy">Division Contacts</h2>
            
            {[
              {
                icon: MapPin,
                title: "VOR Terrain",
                description: "Land verification, marketplace, and investment zones",
                contacts: ["terrain@vor.ng", "+234 (0) 903 550 5663"]
              },
              {
                icon: Building2,
                title: "VOR Home & Construct",
                description: "Residential properties, construction projects, and development",
                contacts: ["homes@vor.ng", "+234 (0) 903 550 5664"]
              },
              {
                icon: Shield,
                title: "VOR Finance",
                description: "Investment funding, loans, and financial services",
                contacts: ["finance@vor.ng", "+234 (0) 903 550 5665"]
              },
              {
                icon: Users,
                title: "Corporate & Legal",
                description: "Governance, compliance, partnerships, and investor relations",
                contacts: ["corporate@vor.ng", "+234 (0) 903 550 5666"]
              }
            ].map(({ icon: Icon, title, description, contacts }) => (
              <div key={title} className="bg-white rounded-xl border border-vor-border p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vor-cream">
                    <Icon className="h-5 w-5 text-vor-navy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-vor-navy">{title}</h3>
                    <p className="text-sm text-vor-slate mt-1">{description}</p>
                    <div className="mt-3 space-y-1">
                      {contacts.map((contact) => (
                        <p key={contact} className="text-sm text-vor-trust font-medium">{contact}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-vor-navy mb-2">Send a Message</h2>
              <p className="text-sm text-vor-slate">Fill out the form below and our team will respond within 24 hours.</p>
            </div>

            <form className="bg-white rounded-xl border border-vor-border p-8 shadow-card space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-vor-navy mb-1.5">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-vor-navy mb-1.5">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+234 (0) 800 000 0000"
                  className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="division" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Division of Interest *
                </label>
                <select
                  id="division"
                  required
                  className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                >
                  <option value="">Select a division</option>
                  <option value="terrain">VOR Terrain</option>
                  <option value="home-construct">VOR Home & Construct</option>
                  <option value="finance">VOR Finance</option>
                  <option value="corporate">Corporate / General</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  required
                  className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-vor-navy mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Please provide details about your enquiry..."
                  required
                  className="w-full rounded-md border border-vor-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vor-trust focus:border-transparent resize-none"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Submit Enquiry
              </Button>

              <p className="text-xs text-vor-slate text-center">
                By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-vor-navy mb-6">Find Us</h2>
          <div className="rounded-xl overflow-hidden border border-vor-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9529122600987!2d7.4819338!3d9.0526004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b7e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sNational%20Bureau%20of%20Statistics%2C%20Abuja!5e0!3m2!1sen!2sng!4v1717680000000!5m2!1sen!2sng"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VOR Head Office Location"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="https://maps.app.goo.gl/Dx7do8sb35s9EG5u7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vor-trust font-medium hover:underline flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              Open in Google Maps
            </a>
            <a
              href="https://www.google.com/maps/search/national+bureau+of+statistics+abuja/@9.0526004,7.4819338,20.5z?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-vor-trust font-medium hover:underline flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
