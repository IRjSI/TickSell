import React from 'react'
import { LogoutBtn } from '../index' 
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

function Header() {
  const authStatus = useSelector((state) => state.auth.status) 
  // const authStatus = true;
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 backdrop-blur-lg font-mono">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 text-white">
          <a href="#" className="p-1.5 animate-fadeIn opacity-100 hover:opacity-50 transition-all duration-500">
            <span className="text-2xl">Rail3</span>
            
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

        <nav>
          <ul className='flex ml-auto text-white'>
            {navItems.map((item) => (
              item.active ?(
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className='inline-block px-6 py-2 duration-200 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
            {authStatus && (
              <li className='pl-10 pt-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div
          className={`fixed inset-0 z-10 bg-black opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-10 w-96 overflow-y-auto bg-blue-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">TickSell</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-gray-100/10">
              <div className="py-6">
                <nav>
                  <ul className='flex flex-col gap-4 text-white text-center'>
                    {navItems.map((item) => (
                      item.active ? (
                        <li key={item.name}>
                          <button
                            onClick={() => {
                              navigate(item.slug)
                              setMobileMenuOpen(false) // Close the menu after clicking
                            }}
                            className='block w-full px-6 py-3 text-center duration-200 rounded-full hover:bg-blue-600'
                          >
                            {item.name}
                          </button>
                        </li>
                      ) : null
                    ))}
                    {authStatus && (
                      <li className='bg-red-700 p-4 rounded-xl'>
                        <LogoutBtn />
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  )
}

export default Header
