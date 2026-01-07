import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, DollarSign, Users, Shield, Zap, TrendingUp } from 'lucide-react'
import Navigation from '../components/Navigation'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'

const LandingPage = () => {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Use Case Management',
      description: 'Discover and manage AI use cases across your organization. Track implementation status, complexity, and business impact.',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Financial Tracking',
      description: 'Monitor financial metrics including revenue, costs, savings, and ROI. Track ambition vs actual performance across quarters.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'KPI Dashboard',
      description: 'Input and track KPIs by area and entity. Visualize progress with interactive charts and real-time updates.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'CEO Dashboard',
      description: 'Get a high-level view of your AI portfolio performance. Monitor quarterly revenue, AI KPIs, and business metrics.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Program Governance',
      description: 'Organize use cases by programs, areas, and entities. Track who builds and who benefits from each AI initiative.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Analytics',
      description: 'Visualize data with interactive charts and graphs. Make data-driven decisions with comprehensive reporting.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-6">
              AI Governance Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Take control of your entire AI portfolio. One workspace to register, govern and monitor every AI or GenAI use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/dvm">
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#features">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage and govern your AI initiatives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} delay={index * 0.1} className="p-6">
                <div className="flex flex-col items-start">
                  <div className="text-[#2563EB] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Start managing your AI portfolio today with DashExecs.
            </p>
            <a href="/dvm">
              <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

