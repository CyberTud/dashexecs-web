import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { Button } from '../components/ui/Button'

const BOOK_A_CALL_URL = 'https://calendly.com/tudor-caloian/30min'

const solutions = {
  'ceo-dashboard': {
    title: 'CEO Dashboard',
    subtitle: 'Track quarterly performance at a glance',
    description: 'The CEO Dashboard provides executives with a comprehensive view of AI initiative performance across the organization. Visual comparisons of actual vs. ambition metrics help leaders quickly identify which initiatives are on track and which need attention.',
    image: '/screenshot-ceo-dashboard.png',
    features: [
      'Quarterly performance tracking with visual donut charts',
      'Actual vs. Ambition comparisons for every metric',
      'Percentage-based progress indicators',
      'Color-coded status (green for exceeding, red for behind)',
    ],
    benefits: [
      'Make data-driven decisions faster',
      'Identify underperforming initiatives early',
      'Communicate AI ROI to stakeholders',
      'Align teams around shared goals',
    ],
  },
  'marketplace': {
    title: 'Use Cases Marketplace',
    subtitle: 'Discover and deploy AI solutions',
    description: 'The Use Cases Marketplace is your central hub for discovering, evaluating, and deploying AI solutions tailored to your business needs. Browse through categories, search by tags, and find the right AI use case for your organization.',
    image: '/screenshot-marketplace.png',
    features: [
      'Searchable catalog of AI use cases',
      'Filter by category and tags',
      'Detailed descriptions and implementation guides',
      'Technology stack information',
      'Business impact assessments',
      'One-click deployment to your environment',
    ],
    benefits: [
      'Accelerate AI adoption across the organization',
      'Reduce time spent evaluating solutions',
      'Standardize AI implementation practices',
      'Share successful use cases across teams',
    ],
  },
  'kpi-management': {
    title: 'KPI Management',
    subtitle: 'Manage and visualize your KPIs',
    description: 'KPI Management empowers business leaders to input, track, and visualize their key performance indicators on a quarterly basis. Half-donut charts provide instant visual feedback on progress against ambition.',
    image: '/screenshot-kpi-management.png',
    features: [
      'Quarterly KPI input for business leaders',
      'Visual half-donut progress charts',
      'Ambition vs. Actual tracking',
      'Filter by area, entity, and business leader',
      'Edit and update KPIs in real-time',
      'Historical data comparison',
    ],
    benefits: [
      'Empower business leaders to own their metrics',
      'Visualize progress at a glance',
      'Identify gaps between ambition and reality',
      'Drive accountability across the organization',
    ],
  },
  'financial-tracking': {
    title: 'Financial Tracking',
    subtitle: 'Track ROI with detailed metrics',
    description: 'Financial Tracking provides granular control over the financial metrics that matter most. Input quarterly data for Direct Margin, Revenue Uplifted, Capex, Opex, and more—with separate fields for Program Manager ambitions and Financial Controller actuals.',
    image: '/screenshot-usecase-detail.png',
    features: [
      'Comprehensive financial metrics (Direct Margin, Revenue, Capex, Opex)',
      'Quarterly breakdown (Q1-Q4) with totals',
      'Ambition values from Program Managers',
      'Actual values verified by Financial Controllers',
      'Capex Savings, Opex Savings, Cost Savings tracking',
      'ROI (%), Time to Value, Efficiency Gain metrics',
    ],
    benefits: [
      'Full transparency into AI financial impact',
      'Separate ambition and actual tracking',
      'Built-in verification workflow',
      'Comprehensive ROI measurement',
    ],
  },
}

const SolutionPage = () => {
  const { solutionId } = useParams<{ solutionId: string }>()
  const solution = solutionId ? solutions[solutionId as keyof typeof solutions] : null

  if (!solution) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#1a1a1a]">Solution not found</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/#solutions"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1a1a1a] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Solutions
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] mb-4">
                {solution.title}
              </h1>
              <p className="text-xl text-blue-600 font-medium mb-6">
                {solution.subtitle}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {solution.description}
              </p>
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer">
                <Button variant="primary" size="lg" className="flex items-center gap-2">
                  Book a Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="border border-gray-200 shadow-lg overflow-hidden">
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 border border-gray-200"
                >
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-600 pl-4 py-2"
                >
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to implement {solution.title}?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how this solution can be customized for your organization.
            </p>
            <a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg" className="flex items-center gap-2 mx-auto">
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

export default SolutionPage

