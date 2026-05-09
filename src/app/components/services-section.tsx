"use client";

import { useLanguage } from "@/app/providers/language-provider";

export function ServicesSection() {
  const { t } = useLanguage();
  const services = t.services.items;

  return (
    <section id="services" className="bg-paper border-b-rule-thick border-primary pb-8 pt-4">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="lg:col-span-12 flex items-center gap-4 mb-6">
          <h2 className="headline-md">Editorial Columns</h2>
          <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest">Services Offered</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {Object.entries(services).map(([key, service]: [string, { title: string; desc: string }], index) => (
            <div 
              key={key} 
              className={`lg:col-span-4 ${index < 2 ? 'lg:border-r lg:hairline-r' : ''} border-primary pr-0 lg:pr-gutter last:pr-0`}
            >
              <h3 className="headline-sm mb-4 uppercase tracking-wide">{service.title}</h3>
              <p className="body-md text-on-surface-variant mb-4">{service.desc}</p>
              <div className="mt-6 flex items-center gap-2">
                 <span className="w-8 h-px bg-primary opacity-20" />
                 <span className="label-caps text-[9px] opacity-40">Department: {key.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
