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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(services).map(([key, service]: [string, { title: string; desc: string }], index) => (
            <div 
              key={key} 
              className={`relative group p-8 bg-paper border hairline border-primary/20 shadow-sm transition-transform hover:scale-[1.02] cursor-default
                ${index === 0 ? '-rotate-1' : index === 1 ? 'rotate-1' : '-rotate-1'}
              `}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
              }}
            >
              {/* Torn edge effect simulation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-primary/5 to-transparent" />
              
              <div className="border-2 border-primary/10 p-6 flex flex-col h-full bg-white/40 dark:bg-black/20 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <span className="label-caps text-[9px] opacity-40">Column: {key.toUpperCase()}</span>
                  <span className="label-caps text-[8px] border border-primary/20 px-2 py-0.5">PRESS_CUTOUT</span>
                </div>
                
                <h3 className="headline-sm mb-4 uppercase leading-none tracking-tight group-hover:italic transition-all">
                  {service.title}
                </h3>
                
                <p className="body-md text-on-surface-variant mb-8 line-clamp-4 italic font-serif">
                  &quot;{service.desc}&quot;
                </p>
                
                <div className="mt-auto pt-6 border-t hairline-t border-primary/10 flex justify-between items-center">
                  <span className="label-caps text-[10px] font-bold tracking-widest text-primary underline underline-offset-4">READ MORE</span>
                  <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-[10px] font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Pin/Clip simulation */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary/10 rounded-full border hairline border-primary/20 flex items-center justify-center">
                <div className="w-1 h-1 bg-primary rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
