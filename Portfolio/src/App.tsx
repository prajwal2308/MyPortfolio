import React, { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code2, GraduationCap, FileText, Mail, Github, Linkedin, ArrowRight, Terminal, Database, Cloud, Cpu } from 'lucide-react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const [cursorText, setCursorText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);


  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const texts = [
      "Graduate Student @ Rutgers",
      "Ex-Software Developer @ CSG",
      "Cloud & AI Enthusiast",
      "Teaching Assistant"
    ];
    let currentIndex = 0;
    let currentChar = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentText = texts[currentIndex];

      if (!isDeleting) {
        setCursorText(currentText.substring(0, currentChar + 1));
        currentChar++;

        if (currentChar === currentText.length) {
          isDeleting = true;
          setTimeout(typeText, 2000);
          return;
        }
      } else {
        setCursorText(currentText.substring(0, currentChar - 1));
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
        }
      }

      const speed = isDeleting ? 100 : 150;
      setTimeout(typeText, speed);
    };

    typeText();
  }, []);

  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.5 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection('home');
    if (aboutInView) setActiveSection('about');
    if (skillsInView) setActiveSection('skills');
    if (projectsInView) setActiveSection('projects');
  }, [homeInView, aboutInView, skillsInView, projectsInView]);

  const navItems = [
    { id: 'home', icon: Brain },
    { id: 'about', icon: GraduationCap },
    { id: 'skills', icon: Code2 },
    { id: 'projects', icon: Terminal }
  ];

  const particlesOptions = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#3b82f6"
      },
      links: {
        enable: true,
        color: "#3b82f6",
        opacity: 0.2
      },
      move: {
        enable: true,
        speed: 1
      },
      size: {
        value: 2
      },
      opacity: {
        value: 0.3
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <Particles
        className="absolute inset-0"
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Animated cursor gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          y: backgroundY,
        }}
      />

      {/* Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <ul className="flex flex-col gap-8">
          {navItems.map(({ id, icon: Icon }) => (
            <motion.li
              key={id}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <a
                href={`#${id}`}
                className={`block p-3 rounded-full transition-all duration-300 ${activeSection === id
                  ? 'text-blue-500 bg-gray-800/50 shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-blue-400'
                  }`}
              >
                <Icon size={24} />
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-8 relative z-20">
        {/* Hero Section */}
        <section
          ref={homeRef}
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/20"
            >
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQEQNWJ22gh1aQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710830330118?e=1750291200&v=beta&t=sGeXQsCgbrW74S8JyA8RuHbpy5_yUrTqp6IvPuJbiKg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Passionate About Building. Obsessed with Learning.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-2xl text-blue-400 h-12 mb-12"
            >
              {cursorText}
              <span className="animate-pulse">|</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-6 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:prajwal.srinivas238@gmail.com"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 rounded-full text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <Mail size={20} />
                Contact Me
                <ArrowRight className="ml-2" />
              </motion.a>
              <motion.div className="flex gap-6 items-center">
                {[
                  { icon: Github, href: 'https://github.com/prajwal2308' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/prajwalsrinivas238/' },
                ].map(({ icon: Icon, href }) => (
                  <motion.a
                    key={href}
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      color: "#3b82f6",
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    href={href}
                    className="text-gray-400 hover:text-blue-500 transition-all duration-300 p-2 rounded-full"
                  >
                    <Icon size={28} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          id="about"
          className="min-h-screen flex items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8"

          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="space-y-6 text-lg">

                <p className="text-gray-300 leading-relaxed">
                  I'm a graduate student in Computer Science at Rutgers University, with a background as a Software Developer at CSG and a Teaching Assistant. I enjoy working with back-end systems, cloud platforms, and AI applications.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My passion lies in building scalable backend services, developing intelligent systems with Python and NLP, and mentoring students to grow in web development and data-driven technologies.
                </p>
                <h2>Education</h2>
                <ul>
                  <li><strong>Rutgers University</strong> — M.S. in Computer Science (Expected June 2026)</li>
                  <li><strong>MVJ College of Engineering</strong> — B.E. in Computer Science (May 2023)</li>
                </ul>


              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Brain, label: "AI & ML Focussed" },
                  { icon: Cloud, label: "Cloud Computing" },
                  { icon: Database, label: "Software Development" },
                  { icon: Cpu, label: "Educator" }
                ].map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl"
                  >
                    <Icon className="text-blue-500" size={24} />
                    <span className="text-gray-300">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            {/* <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
              >
                <img
                  src="https://www.michaelpage.com.au/sites/michaelpage.com.au/files/2022-01/Software%20Developer.jpg"
                  alt="Cloud"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
              </motion.div>
            </motion.div> */}
          </motion.div>
        </section>

        {/* Skills Section */}
        <section
          ref={skillsRef}
          id="skills"
          className="min-h-screen flex items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Back-End",
                  skills: ["Python", "JavaScript", "Java", "JDBC", "MySQL", "C/C++ (basics)"],
                  color: "from-red-500 to-purple-500",
                },
                {
                  title: "Front-End",
                  skills: ["Flask", "TypeScript", "Django", "HTML5", "CSS", "WordPress", "PHP"],
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Cloud, API and Tools",
                  skills: ["Azure DevOps", "AWS", "Postman", "Docker", "REST API", "Git"],
                  color: "from-green-500 to-pink-500",
                },


              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <h3 className={`text-2xl font-semibold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h3>
                  <ul className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-300 flex items-center gap-3"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          id="projects"
          className="min-h-screen flex items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[

                {
                  title: "Static Website Hosting on S3",
                  description: "Deployed a secure and publicly accessible static website using AWS S3. Configured ACL, bucket policy, and endpoints.",
                  image: "https://miro.medium.com/v2/resize:fit:1400/1*jmWg9VVpAWVJmPjwsk1aAA.png"
                },
                {
                  title: "Amazon Lex Chatbot",
                  description: "Conversational chatbot built using Amazon Lex, integrated with AWS Lambda for secure, NLP-based interaction flows.",
                  image: "data:image/jpeg;base64,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"
                },
                {
                  title: "Fire Extinguisher Bot",
                  description: "AI bot using BFS, UCS, and A* algorithms to simulate fire suppression on a 40x40 grid. Achieved 90% success rate in varied scenarios.",
                  image: "data:image/png;base64,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"
                },
                {
                  title: "Applicant Helper System",
                  description: "NLP + Flask app to match resumes with job descriptions, improving parsing accuracy by 75%. Includes skill comparison and job scraping.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXNSt-k611R2qetnqw0symKBDl6Kw-ObIy1Q&s"
                },

                {
                  title: "Movie Rating Parade",
                  description: "Web app using Python + Selenium to scrape ratings from IMDB, Rotten Tomatoes, and Google. Uses SERP API for accurate retrieval.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbd7GWLNO5BlIG3RaRRSQrlgOjSMXfzaGu_Q&s"
                },
                {
                  title: "Software Engineering Simulation – EA (Forage)",
                  description: "Implemented game feature proposals, created OOP class structures, and fixed bugs in a game project simulating real-world SDLC.",
                  image: "https://cdn-connections.villanova.edu/wp-content/uploads/sites/162/2023/09/20210922Forage900x420.jpg"
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-90" />
                  <div className="absolute bottom-0 p-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300">
                      {project.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-6 py-2 bg-blue-600 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => window.location.href = "https://drive.google.com/file/d/1RB8DFun4EEP8oVH0fBShCFKGmpYMo9xO/view?usp=sharing"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;
