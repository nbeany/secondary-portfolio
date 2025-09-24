"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, Center } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Menu,
  X,
  Sun,
  Moon,
  User,
  Camera,
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import type * as THREE from "three"

// 3D Floating Cube Component
function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.8} emissive="#4c1d95" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  )
}

// 3D Skill Orb Component
function SkillOrb({
  position,
  color,
  size = 0.5,
}: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005
        meshRef.current.rotation.y += 0.01
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// 3D Skills Background Component
function Skills3DBackground() {
  return (
    <>
      <SkillOrb position={[-3, 2, -2]} color="#61dafb" size={0.3} />
      <SkillOrb position={[3, -1, -1]} color="#f7df1e" size={0.4} />
      <SkillOrb position={[-2, -2, 0]} color="#3178c6" size={0.35} />
      <SkillOrb position={[2, 2, -3]} color="#68d391" size={0.3} />
      <SkillOrb position={[0, -3, -2]} color="#ff6b6b" size={0.25} />
      <SkillOrb position={[-4, 0, -1]} color="#4ecdc4" size={0.4} />
      <SkillOrb position={[4, 0, -2]} color="#ffd93d" size={0.3} />
    </>
  )
}

// 3D Text Component
function Hero3DText() {
  return (
    <Center>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        {"DEVELOPER"}
        <meshStandardMaterial color="#a855f7" emissive="#4c1d95" emissiveIntensity={0.3} />
      </Text3D>
    </Center>
  )
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-primary font-mono">AN</div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div className="text-xl font-bold text-primary font-mono" whileHover={{ scale: 1.05 }}>
            AN
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 w-full h-full opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.4} />
            <FloatingCube />
            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
          </Suspense>
        </Canvas>
      </div>

      <motion.div className="relative z-10 text-center max-w-4xl mx-auto px-4" style={{ y }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.p
              className="text-lg text-muted-foreground font-mono tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold font-mono tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground">Abreham</span> <span className="text-primary">Nigus</span>
            </motion.h1>
          </div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-mono">Full-Stack Developer</h2>
            <p className="text-xl text-primary font-mono">& Data Engineer</p>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Building scalable web applications and data-driven solutions with modern technologies. Passionate about
            clean code and innovative problem-solving.
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-primary font-medium">Available for opportunities</span>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { icon: Github, href: "https://github.com/nbeany", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/abreham-nigus-377850332", label: "LinkedIn" },
              { icon: Mail, href: "mailto:abrehamnigus1996@gmail.com", label: "Email" },
              { icon: Phone, href: "tel:+251908288112", label: "Phone" },
              { icon: ExternalLink, href: "https://t.me/nbeany", label: "Telegram" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-background/10 hover:bg-primary hover:text-primary-foreground border border-primary/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              size="lg"
              className="font-mono px-8 py-3 bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              asChild
            >
              <a href="#projects" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Projects
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-mono px-8 py-3 bg-transparent hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <a href="#contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Get In Touch
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-mono">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all duration-500 shadow-2xl hover:shadow-primary/10">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                      <Camera className="h-10 w-10 text-primary/60" />
                    </div>
                    <p className="text-muted-foreground font-mono text-sm font-medium">Professional Photo</p>
                    <p className="text-xs text-muted-foreground/70 mt-2 max-w-48">
                      Upload your headshot here for a complete portfolio
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                {/* Floating accent elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute top-10 -right-2 w-4 h-4 bg-primary/30 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Experience", value: "2+ Years" },
                { label: "Projects", value: "10+" },
                { label: "Technologies", value: "15+" },
                { label: "Focus", value: "Full-Stack & Data" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-gradient-to-br from-accent/50 to-accent rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl font-bold text-primary mb-2 font-mono">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-mono font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Download Resume button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
            
            </motion.div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 animate-glow h-full">
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground font-mono">Addis Ababa, Ethiopia</span>
                </div>

                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-pretty font-mono">
                    Full-Stack Developer with expertise in MERN stack and big data processing.
                  </p>
                  <p className="text-lg leading-relaxed text-pretty font-mono">
                    Currently studying Software Engineering at Addis Ababa Institute of Technology.
                  </p>
                  <p className="text-lg leading-relaxed text-pretty font-mono">
                    Passionate about building scalable data-driven solutions with modern technologies.
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                    <Button size="lg" className="animate-glow font-mono" asChild>
                <a href="/resume.pdf" target="_blank" className="flex items-center gap-2" rel="noreferrer">
                  <Download className="h-5 w-5" />
                  Download Resume
                </a>
              </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "Big Data & Data Engineering Intern",
      company: "Information Network Security Administration (INSA)",
      period: "2025",
      location: "Addis Ababa, Ethiopia",
      description: [
        "Built big data infrastructure and data engineering workflows",
        "Worked with Apache Kafka, Spark, HDFS, and PostgreSQL",
        "Designed ETL pipelines for large-scale data processing",
        "Gained experience in distributed systems and scalable solutions",
      ],
      technologies: ["Apache Kafka", "Apache Spark", "HDFS", "PostgreSQL", "ETL", "Big Data"],
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2025",
      location: "Remote",
      description: [
        "Built responsive websites using React.js, Node.js, and Express.js",
        "Created scalable solutions with clean architecture",
        "Collaborated with clients for tailored web solutions",
        "Integrated APIs and databases for dynamic applications",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "JavaScript", "API Integration"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-mono">Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-lg transition-all duration-300 animate-glow h-full">
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-primary mb-2 font-mono leading-tight">{exp.title}</h3>
                      <p className="text-lg font-semibold text-foreground font-mono">{exp.company}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-muted-foreground font-medium font-mono text-sm">{exp.period}</p>
                      <p className="text-sm text-muted-foreground font-mono">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed text-sm font-mono">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-mono px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
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

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: "Big Data Fraud Detection System",
      description: "Scalable pipeline analyzing transaction patterns with real-time fraud detection.",
      technologies: ["Apache Spark", "Hadoop", "Python", "Machine Learning"],
      year: "2025",
      category: "Data Engineering",
      image: "/big-data-fraud-detection-dashboard-with-charts-and.jpg",
    },
    {
      title: "Amazon Clone",
      description: "Full e-commerce platform with React frontend, Express backend, and payment integration.",
      technologies: ["React", "Express", "Firebase", "Chapa"],
      year: "2025",
      category: "Full-Stack",
      image: "/amazon-ecommerce-website-homepage-with-products-an.jpg",
    },
    {
      title: "Bitcoin Real-Time Dashboard",
      description: "Interactive dashboard monitoring Bitcoin prices with trend analysis and predictions.",
      technologies: ["React", "Node.js", "D3.js", "WebSocket API"],
      year: "2024",
      category: "Data Analytics",
      image: "/bitcoin-cryptocurrency-dashboard-with-price-charts.jpg",
    },
    {
      title: "Netflix Clone",
      description: "Entertainment platform with movie listings, trailers, and TMDB API integration.",
      technologies: ["React", "TMDB API", "Firebase", "CSS"],
      year: "2025",
      category: "Full-Stack",
      image: "/netflix-streaming-platform-homepage-with-movie-pos.jpg",
    },
    {
      title: "Apple Website Clone",
      description: "Pixel-perfect recreation with responsive design and smooth animations.",
      technologies: ["React", "Node.js", "MySQL", "CSS"],
      year: "2024",
      category: "Frontend",
      image: "/apple-website-homepage-with-sleek-product-showcase.jpg",
    },
    {
      title: "Boss Electronics Website",
      description: "Corporate website showcasing products with modern design and interactions.",
      technologies: ["React", "CSS", "JavaScript"],
      year: "2025",
      category: "Frontend",
      image: "/electronics-company-website-with-product-catalog-a.jpg",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-mono">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Showcasing full-stack development, data engineering, and modern web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 animate-glow group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge
                    variant="outline"
                    className="absolute top-3 left-3 text-xs font-mono bg-background/90 backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                  <span className="absolute top-3 right-3 text-sm text-background font-mono bg-primary/90 px-2 py-1 rounded backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200 font-mono">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-pretty text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 bg-transparent hover:scale-105 hover:shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills Section with 3D Elements and Progress Bars
function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "JavaScript", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML/CSS", level: 96 },
      ],
    },
    {
      title: "Backend & Languages",
      skills: [
        { name: "Node.js", level: 87 },
        { name: "Python", level: 85 },
        { name: "Express.js", level: 89 },
        { name: "PostgreSQL", level: 82 },
        { name: "MySQL", level: 80 },
      ],
    },
    {
      title: "Big Data & Data Engineering",
      skills: [
        { name: "Apache Spark", level: 78 },
        { name: "Apache Kafka", level: 75 },
        { name: "Hadoop (HDFS)", level: 72 },
        { name: "ETL Pipelines", level: 85 },
        { name: "Power BI", level: 88 },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git & GitHub", level: 93 },
        { name: "Docker", level: 76 },
        { name: "Firebase", level: 84 },
        { name: "AWS", level: 70 },
        { name: "Webpack/Vite", level: 82 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Skills3DBackground />
            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-mono">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
            Proficiency levels across different technology stacks and tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full animate-glow backdrop-blur-sm bg-background/80 border-primary/20">
                <CardContent>
                  <h3 className="text-xl font-bold mb-8 text-primary font-mono flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    {category.title}
                  </h3>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium font-mono text-foreground">{skill.name}</span>
                          <motion.span
                            className="text-sm font-bold text-primary font-mono"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: skillIndex * 0.1 + 0.5 }}
                            viewport={{ once: true }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full shadow-sm"
                            initial={{ width: 0, opacity: 0.7 }}
                            whileInView={{
                              width: `${skill.level}%`,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 2,
                              delay: skillIndex * 0.15,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                              boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                              scale: 1.02,
                            }}
                          />
                          {/* Animated shimmer effect */}
                          <motion.div
                            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "400%" }}
                            transition={{
                              duration: 2,
                              delay: skillIndex * 0.15 + 1,
                              ease: "easeInOut",
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["React", "Node.js", "Python", "TypeScript", "Apache Spark", "PostgreSQL", "Docker", "AWS"].map(
              (tech, index) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm font-mono bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you can integrate with your email service
    // For now, we'll just simulate the submission
    console.log("Form submitted:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)

    // You can add success notification here
    alert("Message sent successfully!")
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-mono">Let's Work Together</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-mono">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 animate-glow">
              <CardContent>
                <h3 className="text-2xl font-bold mb-6 font-mono text-primary">Send Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium font-mono text-foreground">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-sm"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium font-mono text-foreground">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium font-mono text-foreground">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-sm"
                      placeholder="Project discussion, collaboration, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium font-mono text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-sm resize-none"
                      placeholder="Tell me about your project, requirements, timeline, and any specific technologies you'd like to use..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full animate-glow font-mono" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 animate-glow h-full">
              <CardContent>
                <h3 className="text-2xl font-bold mb-6 font-mono text-primary">Contact Info</h3>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "abrehamnigus1996@gmail.com",
                      href: "mailto:abrehamnigus1996@gmail.com",
                    },
                    { icon: Phone, label: "Phone", value: "+251908288112", href: "tel:+251908288112" },
                    { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <motion.div
                      key={label}
                      className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-mono font-medium">{label}</p>
                        {href ? (
                          <a href={href} className="font-medium hover:text-primary transition-colors font-mono">
                            {value}
                          </a>
                        ) : (
                          <p className="font-medium font-mono">{value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-6">
                  

                  

                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                      Available for freelance projects, full-time opportunities, and collaborations. Response time:
                      Usually within 24 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          <motion.div className="text-2xl font-bold text-primary font-mono" whileHover={{ scale: 1.05 }}>
            AN
          </motion.div>

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground font-mono text-sm">© 2025 Abreham Nigus. All rights reserved.</p>
            <p className="text-muted-foreground/70 font-mono text-xs">Built with React, Next.js & Three.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
