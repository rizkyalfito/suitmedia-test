import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const controlHeader = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      controlHeader();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [controlHeader]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'} bg-orange-500 text-white bg-opacity-90 shadow`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center h-full">
        <div className="text-lg font-bold">Suitmedia</div>
        <nav>
          <div className="hidden md:block ">
            <ul className="flex space-x-6 ">
              {['work', 'about', 'services', 'ideas', 'careers', 'contact'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item}`}
                    className={({ isActive }) =>
                      isActive ? 'font-bold' : 'text-white hover:text-gray-800'
                    }
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <span className="text-2xl">&#9776;</span>
            </button>
            {menuOpen && (
              <ul className="absolute right-0 mt-2 py-2 w-48 bg-orange-500 text-white rounded-lg shadow-xl">
                {['work', 'about', 'services', 'ideas', 'careers', 'contact'].map((item) => (
                  <li key={item}>
                    <NavLink
                      to={`/${item}`}
                      className={({ isActive }) =>
                        isActive ? 'font-bold block px-4 py-2' : 'block px-4 py-2 hover:text-gray-300'
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
