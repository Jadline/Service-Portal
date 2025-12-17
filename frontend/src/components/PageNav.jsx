import { useEffect, useState } from "react"
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function PageNav() {
  const location = useLocation()
  const [role, setRole] = useState(null)

  
  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.log("Error fetching role:", error.message)
      } else {
        setRole(data.role)
      }
    }

    fetchUserRole()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const linkClass = (path) =>
    location.pathname === path
      ? 'border-b-2 border-indigo-500 text-white pb-1'
      : 'border-b-2 border-transparent text-gray-300 hover:border-white/50 hover:text-white pb-1'

  return (
    <Disclosure as="nav" className="bg-gray-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
        
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          
          <div className="flex flex-1 items-center justify-between sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-indigo-400">BridgeDesk</Link>
            </div>

            <div className="hidden sm:flex sm:space-x-8 ml-6 items-center">
              <Link to="/" className={linkClass('/')}>Home</Link>
              <Link to="/request-services" className={linkClass('/request-services')}>Request Services</Link>
              {role === 'admin' && <Link to="/requests" className={linkClass('/requests')}>Requests</Link>}
            </div>
          </div>

         
          <div className="flex items-center space-x-4">
            <button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full bg-gray-800"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 text-sm text-gray-300 shadow-lg focus:outline-none">
                <MenuItem>
                  <Link to="/login" className="block px-4 py-2 hover:bg-white/5">Sign out</Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

    
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-4">
          <DisclosureButton as={Link} to="/" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-gray-300 hover:border-white/50 hover:bg-white/5 hover:text-white">Home</DisclosureButton>
          <DisclosureButton as={Link} to="/request-services" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-gray-300 hover:border-white/50 hover:bg-white/5 hover:text-white">Request Services</DisclosureButton>
          {role === 'admin' && <DisclosureButton as={Link} to="/requests" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-gray-300 hover:border-white/50 hover:bg-white/5 hover:text-white">Requests</DisclosureButton>}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
