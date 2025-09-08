"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Rocket, Zap, Smartphone, Database } from "lucide-react"
import { SectionTitle } from "@/app/components/section-title"

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Web Application Development",
      description: "Building full-stack web applications using Laravel, PHP, and modern frontend technologies like HTML, CSS, and JavaScript."
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Designing and managing MySQL databases with CRUD operations for data-driven applications."
    },
    {
      icon: Palette,
      title: "Frontend Development",
      description: "Creating responsive and user-friendly interfaces using HTML, CSS, JavaScript, and modern frameworks."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Developing websites that look and function perfectly on all devices, from mobile phones to desktop computers."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing web applications for speed, efficiency, and search engine visibility to improve user experience."
    },
    {
      icon: Rocket,
      title: "Project Deployment",
      description: "Deploying web applications to hosting platforms with proper configuration and optimization."
    }
  ]

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="My Services" 
          subtitle="I offer a range of services to help businesses establish and enhance their digital presence"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-border">
                  <CardHeader>
                    <motion.div 
                      className="bg-primary/10 p-3 rounded-full w-fit group-hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                    </motion.div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground/80 transition-colors">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}