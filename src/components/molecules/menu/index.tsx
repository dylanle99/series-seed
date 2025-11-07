import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Logo from "../logo";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const MENU_ITEMS = [
    {
      name: "Vision",
    },
    {
      name: "Community",
    },
    {
      name: "Events",
    },
    {
      name: "Contact",
    },
  ];

  return (
    <motion.div
      transition={{ duration: 0.3 }}
      className="z-90 md:w-110 absolute left-1/2 top-0 flex h-screen w-full -translate-x-1/2 justify-center overflow-hidden"
    >
      <motion.div
        ref={menuRef}
        animate={{ gap: isOpen ? "8px" : "1px" }}
        className="md:w-110 absolute flex h-screen w-screen flex-col p-4"
      >
        <nav className="flex w-full items-center justify-between rounded-2xl bg-[#121212]/80 px-7 py-5 text-white backdrop-blur-sm">
          <Logo className="size-10" />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-bold uppercase text-white"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </nav>

        {isOpen && (
          <div className="flex flex-col gap-4 flex-1">
            <ul className="flex w-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#121212]/80 px-7 py-5 text-white backdrop-blur-sm">
              {MENU_ITEMS.map((item, index) => (
                <li
                  className="relative flex cursor-pointer flex-col items-center overflow-hidden"
                  key={index}
                >
                  <div className="flex items-start">
                    <span className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
                      {item.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex w-full items-center justify-between rounded-2xl bg-[#121212]/80 p-4 text-sm tracking-tight text-white/60 backdrop-blur-sm">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
          </div>
        )}

        {/* menu items */}
      </motion.div>
    </motion.div>
  );
}
