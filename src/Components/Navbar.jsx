import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'
import LogoImg from '../assets/defaultlogo.png'
import LogoWhite from '../assets/whitelogo.png'
import { NavLink, useLocation} from 'react-router-dom'
import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { title: "Products", path: "/products" },
    { title: "Contact Us", path: "/products/contact-us" },
]

const Navbar = () => {

    const [open, setOpen] = useState(false)
    const {pathname} = useLocation()
    
  return (
    <header>
      <nav className="items-center justify-between pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 flex sm:space-x-6">
        <a href="/">
          <div className=" flex-1 flex items-center">
            <img
              src={LogoWhite}
              width={55}
              className=" object-contain"
              alt="Float UI logo"
            />
            <h3 className=" text-white font-semibold italic text-4xl ml-1">
              Graph<span className=" text-indigo-400">ito</span>
            </h3>
          </div>
        </a>
        <ul className="py-4 flex-1 items-center hidden sm:flex space-x-3 sm:space-x-6 sm:justify-end">
          {navigation.map((item, idx) => (
            <li
              className="text-gray-200 transition-all duration-500 hover:text-indigo-400"
              key={idx}
            >
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          ))}
          <li>
            {/* <a
              href="/"
              className="flex items-center text-gray-200"
            >
              Log In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a> */}
          </li>
        </ul>
        <div className=" sm:hidden flex items-center">
          <button onClick={()=> setOpen(true)} className=" border border-white/50 p-1 rounded-md">
            <Bars3BottomRightIcon className=" fill-white/50 h-9 w-9" />
          </button>
        </div>
      </nav>

      {/* slideovers */}
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-xs">
                    <TransitionChild
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <DialogTitle className="font-semibold leading-6 ">
                          <a href="/">
                            <div className=" flex-1 flex items-center">
                              <img
                                src={LogoImg}
                                width={45}
                                className=" object-contain"
                                alt="Float UI logo"
                              />
                              <h3 className=" text-gray-900 font-semibold italic text-3xl ml-1">
                                Graph
                                <span className=" text-indigo-400">ito</span>
                              </h3>
                            </div>
                          </a>
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <ul>
                          {navigation.map((item, index) => (
                            <NavLink onClick={()=> setOpen(false)} key={index} to={item.path}>
                              <li className={` ${pathname === item.path ? 'text-indigo-500' : ''}  relative py-2 pl-3 pr-9 cursor-pointer font-semibold hover:text-indigo-600 text-lg text-gray-900 px-3 items-center`}>
                                {item.title}
                              </li>
                            </NavLink>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}

export default Navbar
