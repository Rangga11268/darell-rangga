"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Rocket, Zap, Smartphone, Database } from "lucide-react"

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
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I offer a range of services to help businesses establish and enhance their digital presence
          </p>
        </motion.div>

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
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}