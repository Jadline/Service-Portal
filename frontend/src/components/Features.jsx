import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'

const features = [
  {
    name: 'Streamlined Request Management',
    description:
      'We simplify how companies submit requests to service providers, making the process fast and reliable.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Data Handling',
    description: 'All requests and client information are handled securely with end-to-end encryption.',
    icon: LockClosedIcon,
  },
  {
    name: 'Real-Time Tracking',
    description: 'Track the status of every request from submission to completion with ease.',
    icon: ServerIcon,
  },
]

export default function Features() {
  return (
    <div className="overflow-hidden  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          
        
          <motion.div 
            className="lg:pt-4 lg:pr-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-400">Our Services</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Connecting Businesses Seamlessly
              </p>
              <p className="mt-6 text-lg/8 text-gray-300">
                We act as a bridge between companies seeking services and service providers, 
                helping businesses submit requests on behalf of their clients efficiently and securely.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    className="relative pl-9"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <dt className="inline font-semibold text-white">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-400" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>

       
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              alt="Platform mockup"
              src="global-connection2.webp"
              className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </motion.div>

        </div>
      </div>
    </div>
  )
}
