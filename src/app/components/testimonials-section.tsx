"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "Working with Alex was a game-changer for our project. His technical expertise and attention to detail delivered results beyond our expectations. The website he built for us has significantly increased our conversion rates.",
      avatar: "https://placehold.co/80x80/202020/FFFFFF?text=SJ"
    },
    {
      name: "Michael Chen",
      role: "Product Manager, InnovateCo",
      content: "Alex's ability to understand our business needs and translate them into a seamless digital experience was impressive. His communication throughout the project was clear and consistent. Highly recommended!",
      avatar: "https://placehold.co/80x80/202020/FFFFFF?text=MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthLabs",
      content: "The e-commerce platform Alex developed for us has been instrumental in scaling our online business. His focus on performance and user experience has directly contributed to our success metrics.",
      avatar: "https://placehold.co/80x80/202020/FFFFFF?text=ER"
    }
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2 mb-3">
                    <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      {testimonial.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}