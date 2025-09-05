"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Rocket, Zap, Smartphone, Database } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Building responsive, accessible, and performant websites using modern technologies like React, Next.js, and TypeScript."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces with a focus on user experience and accessibility."
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Developing cross-platform mobile applications using React Native for both iOS and Android."
    },
    {
      icon: Database,
      title: "Backend Services",
      description: "Building robust and scalable server-side applications with Node.js, Express, and databases."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing websites and applications for speed, efficiency, and search engine visibility."
    },
    {
      icon: Rocket,
      title: "Deployment & DevOps",
      description: "Managing deployment pipelines, cloud infrastructure, and CI/CD processes with Docker and AWS."
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