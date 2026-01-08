import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Server } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ReactECharts from 'echarts-for-react'
import Navigation from '../components/Navigation'
import { Button } from '../components/ui/Button'

const BOOK_A_CALL_URL = 'https://calendly.com/tudor-caloian/30min'

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false)
  const chartRefs = useRef<{ [key: string]: ReactECharts | null }>({})

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Function to hide tooltip for a specific chart
  const hideChartTooltip = (chartKey: string) => {
    if (chartRefs.current[chartKey]?.getEchartsInstance()) {
      chartRefs.current[chartKey].getEchartsInstance().dispatchAction({
        type: 'hideTip'
      })
    }
  }
  // Sample quarterly data - Actual vs Ambition Revenue
  const quarterlyData = [
    {
      quarter: 'Q1',
      actualRevenue: 8.5,
      ambitionRevenue: 15.0,
    },
    {
      quarter: 'Q2',
      actualRevenue: 13.2,
      ambitionRevenue: 14.5,
    },
    {
      quarter: 'Q3',
      actualRevenue: 16.8,
      ambitionRevenue: 17.0,
    },
    {
      quarter: 'Q4',
      actualRevenue: 20.5,
      ambitionRevenue: 18.0,
    },
  ]

  // Create chart data for each quarter (Actual vs Ambition)
  const getQuarterChartData = (data: typeof quarterlyData[0]) => {
    const remainingValue = Math.max(0, data.ambitionRevenue - data.actualRevenue)
    
    return [
      {
        value: data.actualRevenue,
        name: 'Actual Revenue',
      },
      {
        value: remainingValue,
        name: 'Remaining to Ambition',
      },
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-4 sm:mb-6">
              Track ROI of AI in Your Organization
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-10">
              Customized for your frameworks. Measure and monitor the return on investment of every AI use case across your organization.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="lg" className="flex items-center gap-2">
                    Book a Call
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right Side - Quarterly Circles with Total */}
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-1 w-full sm:w-auto">
              {quarterlyData.map((data) => {
                const chartData = getQuarterChartData(data)
                const percentage = ((data.actualRevenue / data.ambitionRevenue) * 100).toFixed(1)
                
                return (
                  <div key={data.quarter} className="flex flex-col items-center">
                    <div 
                      className="relative w-64 h-64 sm:w-28 sm:h-28 lg:w-32 lg:h-32 chart-container" 
                      data-chart-key={data.quarter}
                      onTouchEnd={() => {
                        if (isMobile) {
                          hideChartTooltip(data.quarter)
                        }
                      }}
                    >
                      <ReactECharts
                        ref={(e) => {
                          if (e) {
                            chartRefs.current[data.quarter] = e
                          }
                        }}
                        option={{
                          tooltip: {
                            trigger: 'item',
                            backgroundColor: '#fff',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            borderRadius: 0,
                            textStyle: {
                              color: '#1a1a1a',
                            },
                            hideDelay: isMobile ? 0 : 100,
                            triggerOn: isMobile ? 'mousemove|click' : 'mousemove',
                            formatter: (params: any) => {
                              if (params.name === 'Actual Revenue') {
                                return `
                                  <div style="padding: 8px;">
                                    <div style="font-weight: bold; margin-bottom: 4px;">${data.quarter} Revenue</div>
                                    <div>Actual: $${data.actualRevenue}M</div>
                                    <div>Ambition: $${data.ambitionRevenue}M</div>
                                    <div style="color: ${data.actualRevenue >= data.ambitionRevenue ? '#10b981' : '#ef4444'}; margin-top: 4px;">
                                      ${data.actualRevenue >= data.ambitionRevenue ? '+' : ''}${(data.actualRevenue - data.ambitionRevenue).toFixed(2)}M
                                    </div>
                                  </div>
                                `
                              } else if (params.name === 'Remaining to Ambition') {
                                return `
                                  <div style="padding: 8px;">
                                    <div style="font-weight: bold; margin-bottom: 4px;">${data.quarter} Revenue</div>
                                    <div>Remaining: $${(data.ambitionRevenue - data.actualRevenue).toFixed(2)}M</div>
                                    <div>Ambition: $${data.ambitionRevenue}M</div>
                                    <div>Actual: $${data.actualRevenue}M</div>
                                  </div>
                                `
                              }
                              return ''
                            },
                          },
                          series: [
                            {
                              name: `${data.quarter} Revenue`,
                              type: 'pie',
                              radius: ['40%', '70%'],
                              avoidLabelOverlap: false,
                              itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2,
                              },
                              label: {
                                show: true,
                                position: 'center',
                                fontSize: isMobile ? 32 : 20,
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                formatter: data.quarter,
                              },
                              emphasis: {
                                label: {
                                  show: true,
                                  fontSize: isMobile ? 32 : 20,
                                  fontWeight: 'bold',
                                  formatter: data.quarter,
                                },
                              },
                              labelLine: {
                                show: false,
                              },
                              data: [
                                {
                                  value: chartData[0].value,
                                  name: chartData[0].name,
                                  itemStyle: {
                                    color: '#3b82f6',
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                  },
                                },
                                {
                                  value: chartData[1].value,
                                  name: chartData[1].name,
                                  itemStyle: {
                                    color: '#e5e7eb',
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                  },
                                },
                              ],
                            },
                          ],
                        }}
                        style={{ height: '100%', width: '100%' }}
                      />
                    </div>
                    <div className="mt-1 text-center">
                      <div className="text-sm sm:text-xs text-gray-600">
                        ${data.actualRevenue}M / ${data.ambitionRevenue}M
                      </div>
                      <div className={`text-sm sm:text-xs font-semibold ${data.actualRevenue >= data.ambitionRevenue ? 'text-green-600' : 'text-red-600'}`}>
                        {percentage}% of Ambition
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {/* Total Circle */}
              {(() => {
                const totalActual = quarterlyData.reduce((sum, q) => sum + q.actualRevenue, 0)
                const totalAmbition = quarterlyData.reduce((sum, q) => sum + q.ambitionRevenue, 0)
                const totalPercentage = ((totalActual / totalAmbition) * 100).toFixed(1)
                const totalChartData = [
                  {
                    value: totalActual,
                    name: 'Actual Revenue',
                  },
                  {
                    value: Math.max(0, totalAmbition - totalActual),
                    name: 'Remaining to Ambition',
                  },
                ]
                
                return (
                  <div key="total" className="flex flex-col items-center sm:col-span-1 sm:ml-2">
                    <div 
                      className="relative w-64 h-64 sm:w-28 sm:h-28 lg:w-32 lg:h-32 chart-container" 
                      data-chart-key="total"
                      onTouchEnd={() => {
                        if (isMobile) {
                          hideChartTooltip('total')
                        }
                      }}
                    >
                      <ReactECharts
                        ref={(e) => {
                          if (e) {
                            chartRefs.current['total'] = e
                          }
                        }}
                        option={{
                          tooltip: {
                            trigger: 'item',
                            backgroundColor: '#fff',
                            borderColor: '#e5e7eb',
                            borderWidth: 1,
                            borderRadius: 0,
                            textStyle: {
                              color: '#1a1a1a',
                            },
                            hideDelay: isMobile ? 0 : 100,
                            triggerOn: isMobile ? 'mousemove|click' : 'mousemove',
                            formatter: (params: any) => {
                              if (params.name === 'Actual Revenue') {
                                return `
                                  <div style="padding: 8px;">
                                    <div style="font-weight: bold; margin-bottom: 4px;">Total Revenue</div>
                                    <div>Actual: $${totalActual.toFixed(1)}M</div>
                                    <div>Ambition: $${totalAmbition.toFixed(1)}M</div>
                                    <div style="color: ${totalActual >= totalAmbition ? '#10b981' : '#ef4444'}; margin-top: 4px;">
                                      ${totalActual >= totalAmbition ? '+' : ''}${(totalActual - totalAmbition).toFixed(2)}M
                                    </div>
                                  </div>
                                `
                              } else if (params.name === 'Remaining to Ambition') {
                                return `
                                  <div style="padding: 8px;">
                                    <div style="font-weight: bold; margin-bottom: 4px;">Total Revenue</div>
                                    <div>Remaining: $${(totalAmbition - totalActual).toFixed(2)}M</div>
                                    <div>Ambition: $${totalAmbition.toFixed(1)}M</div>
                                    <div>Actual: $${totalActual.toFixed(1)}M</div>
                                  </div>
                                `
                              }
                              return ''
                            },
                          },
                          series: [
                            {
                              name: 'Total Revenue',
                              type: 'pie',
                              radius: ['40%', '70%'],
                              avoidLabelOverlap: false,
                              itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2,
                              },
                              label: {
                                show: true,
                                position: 'center',
                                fontSize: isMobile ? 24 : 16,
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                formatter: 'Total',
                              },
                              emphasis: {
                                label: {
                                  show: true,
                                  fontSize: isMobile ? 24 : 16,
                                  fontWeight: 'bold',
                                  formatter: 'Total',
                                },
                              },
                              labelLine: {
                                show: false,
                              },
                              data: [
                                {
                                  value: totalChartData[0].value,
                                  name: totalChartData[0].name,
                                  itemStyle: {
                                    color: '#6b21a8',
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                  },
                                },
                                {
                                  value: totalChartData[1].value,
                                  name: totalChartData[1].name,
                                  itemStyle: {
                                    color: '#e5e7eb',
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2,
                                  },
                                },
                              ],
                            },
                          ],
                        }}
                        style={{ height: '100%', width: '100%' }}
                      />
                    </div>
                    <div className="mt-1 text-center">
                      <div className="text-sm sm:text-xs text-gray-600">
                        ${totalActual.toFixed(1)}M / ${totalAmbition.toFixed(1)}M
                      </div>
                      <div className={`text-sm sm:text-xs font-semibold ${totalActual >= totalAmbition ? 'text-green-600' : 'text-red-600'}`}>
                        {totalPercentage}% of Ambition
                      </div>
                    </div>
                  </div>
                )
              })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              About DashExecs
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              We build custom tools that match your frameworks and workflows to track the value generated by AI across your organization.
              From ambition to actuals, DashExecs helps leaders see where AI is creating ROI—and what to do next.
            </p>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Deploy on-prem or on cloud—aligned with your security, governance, and reporting requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
              See DashExecs in Action
            </h2>
            <p className="text-xl text-gray-600">
              Track, manage, and visualize AI value across your organization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CEO Dashboard */}
            <Link to="/solutions/ceo-dashboard">
              <motion.div
                id="ceo-dashboard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-none shadow-lg overflow-hidden border border-gray-200 scroll-mt-20 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src="/screenshot-ceo-dashboard.png"
                  alt="CEO Dashboard - Quarterly performance tracking"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                    CEO Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Track quarterly performance at a glance with visual comparisons of actual vs. ambition across all AI initiatives.
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Use Cases Marketplace */}
            <Link to="/solutions/marketplace">
              <motion.div
                id="marketplace"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-none shadow-lg overflow-hidden border border-gray-200 scroll-mt-20 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src="/screenshot-marketplace.png"
                  alt="AI Use Cases Marketplace"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                    Use Cases Marketplace
                  </h3>
                  <p className="text-gray-600">
                    Discover and deploy AI solutions tailored to your business needs, from analytics to automation.
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* KPI Management */}
            <Link to="/solutions/kpi-management">
              <motion.div
                id="kpi-management"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-none shadow-lg overflow-hidden border border-gray-200 scroll-mt-20 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src="/screenshot-kpi-management.png"
                  alt="KPI Management - Quarterly metrics"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                    KPI Management
                  </h3>
                  <p className="text-gray-600">
                    Business leaders input and track their KPIs quarterly, with visual half-donut charts showing progress against ambition.
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Financial Tracking */}
            <Link to="/solutions/financial-tracking">
              <motion.div
                id="financial-tracking"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-none shadow-lg overflow-hidden border border-gray-200 scroll-mt-20 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <img
                  src="/screenshot-usecase-detail.png"
                  alt="Financial Tracking - Metrics input"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                    Financial Tracking
                  </h3>
                  <p className="text-gray-600">
                    Input program details and financial metrics with quarterly breakdowns for ambition and actual values.
                  </p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Flexible Deployment */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-12 text-center">
              Flexible Deployment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 p-8">
                <Server className="w-12 h-12 text-[#1a1a1a] mb-4" />
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">On-Premise</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Full control over your data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Deploy within your existing infrastructure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Meet strict compliance requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Integrate with internal systems
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 p-8">
                <Cloud className="w-12 h-12 text-[#1a1a1a] mb-4" />
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Cloud</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Quick setup and deployment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Automatic updates and maintenance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Scalable infrastructure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    Enterprise-grade security
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

