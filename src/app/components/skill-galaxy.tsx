"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, Skill } from "@/app/data/skills";
import { projects } from "@/app/data/projects";
import { useLanguage } from "@/app/providers/language-provider";
import { ArrowUpRight, X, Quotes } from "@phosphor-icons/react";
import Image from "next/image";

export function SkillGalaxy() {
  const { language } = useLanguage();
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const selectedSkill = skills.find((s) => s.id === selectedSkillId);
  const relatedProjects = selectedSkill
    ? projects.filter((p) => selectedSkill.relatedProjectIds.includes(p.id))
    : [];

  // Group skills by category for the editorial layout
  const categories = ["Language", "Frontend", "Backend", "Tool"];

  return (
    <section id="skills" className="bg-paper border-b-rule-thick border-primary pb-16 pt-8">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="headline-md">Technical Classifications</h2>
          <span className="border border-primary px-2 py-0.5 text-[10px] label-caps tracking-widest">Inventory List</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-rule-thin border-primary">
          {categories.map((cat, catIdx) => (
            <div key={cat} className={catIdx < 3 ? "border-r border-b lg:border-b-0 hairline-r hairline-b border-primary" : "border-b lg:border-b-0 hairline-b border-primary"}>
              <div className="bg-primary text-primary-foreground px-4 py-2 label-caps text-[11px] font-bold tracking-widest border-b hairline-b border-primary">
                {cat.toUpperCase()}
              </div>
              <div className="p-0 flex flex-col divide-y hairline-y divide-primary/10">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkillId(skill.id)}
                      className="group flex items-center gap-4 p-4 hover:bg-primary hover:text-primary-foreground transition-all text-left"
                    >
                      <div className="w-8 h-8 flex-shrink-0 grayscale group-hover:grayscale-0 group-hover:brightness-200 transition-all">
                         <img
                          src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm uppercase tracking-wide truncate">{skill.name}</div>
                        <div className="text-[9px] label-caps opacity-60 group-hover:opacity-100">{skill.level}</div>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Detail Modal - Newspaper Style */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkillId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-paper border-rule-thick border-primary shadow-[16px_16px_0px_#1a1c1c] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-primary text-primary-foreground p-6 flex justify-between items-start">
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-paper p-3 border-rule-thin border-primary grayscale">
                    <img
                      src={`https://skillicons.dev/icons?i=${selectedSkill.icon}&theme=light`}
                      alt={selectedSkill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="headline-md uppercase leading-none mb-2">{selectedSkill.name}</h3>
                    <div className="label-caps text-[10px] tracking-widest font-bold border border-white/20 px-2 py-0.5 inline-block">
                      {selectedSkill.level} • {selectedSkill.category}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedSkillId(null)} className="hover:rotate-90 transition-transform p-1">
                  <X size={24} weight="bold" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex gap-4 mb-8">
                  <Quotes size={32} weight="fill" className="text-primary opacity-20 flex-shrink-0" />
                  <p className="headline-sm italic leading-relaxed">
                    {language === "id" ? selectedSkill.description.id : selectedSkill.description.en}
                  </p>
                </div>

                {relatedProjects.length > 0 && (
                  <div>
                    <h4 className="label-caps text-[10px] font-bold text-on-surface-variant mb-4 border-b hairline-b border-primary/10 pb-2">
                      {language === "id" ? "ARSIP PROYEK TERKAIT" : "RELATED PROJECT ARCHIVES"}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {relatedProjects.map((project) => (
                        <a
                          key={project.id}
                          href="#projects"
                          onClick={() => setSelectedSkillId(null)}
                          className="flex items-center gap-4 p-3 border hairline border-primary/10 hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all border hairline border-primary/10">
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm uppercase">{project.title}</div>
                            <div className="text-[10px] opacity-60 truncate max-w-[200px] md:max-w-none">
                              {language === "id" ? project.shortDescription.id : project.shortDescription.en}
                            </div>
                          </div>
                          <ArrowUpRight size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-primary/5 px-8 py-4 border-t hairline-t border-primary/10 text-center">
                <p className="label-caps text-[9px] font-bold opacity-40">TECHNICAL CLASSIFICATION RECORD NO. {Math.floor(Math.random() * 10000)}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
