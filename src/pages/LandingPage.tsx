import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navigation from '../components/Navigation'
import { Button } from '../components/ui/Button'

const LandingPage = () => {

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
              Track ROI of AI in Your Organization
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Customized for your frameworks. Measure and monitor the return on investment of every AI use case across your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/dvm">
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Book a Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </motion.div>
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
              Start tracking the ROI of AI in your organization today with DashExecs.
            </p>
            <a href="/dvm">
              <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                Book a Call
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

