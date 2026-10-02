import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface LayoutProps {
  children: React.ReactNode;
}

type NavItem =
  | { label: string; kind: 'hash'; hash: string }
  | { label: string; kind: 'route'; to: string }
  | { label: string; kind: 'external'; href: string };

const navItems: NavItem[] = [
  { label: 'About', kind: 'hash', hash: '#about' },
  { label: 'Expertise', kind: 'hash', hash: '#expertise' },
  { label: 'Publications', kind: 'hash', hash: '#publications' },
  { label: 'Projects', kind: 'route', to: '/assets/projects' },
  { label: 'Teaching', kind: 'hash', hash: '#teaching' },
  { label: 'Certifications', kind: 'hash', hash: '#certifications' },
  { label: 'Contact', kind: 'hash', hash: '#contact' },
  { label: 'Graph Demos', kind: 'external', href: 'https://graph-viz-next.vercel.app/' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  const isItemActive = (item: NavItem) => {
    if (item.kind === 'hash') return location.hash === item.hash;
    if (item.kind === 'route') return isActive(item.to);
    return false;
  };

  const renderNavLink = (item: NavItem, className: string, activeClassName: string, inactiveClassName: string) => {
    const classes = cn(className, isItemActive(item) ? activeClassName : inactiveClassName);
    const closeMenu = () => setMenuOpen(false);

    if (item.kind === 'route') {
      return (
        <Link key={item.label} to={item.to} className={classes} onClick={closeMenu}>
          {item.label}
        </Link>
      );
    }
    if (item.kind === 'external') {
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(className, "text-blue-600 hover:text-blue-800")}
          onClick={closeMenu}
        >
          {item.label}
        </a>
      );
    }
    return (
      <a key={item.label} href={`/${item.hash}`} className={classes} onClick={closeMenu}>
        {item.label}
      </a>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg" aria-label="Primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center py-4">
              <span className="font-semibold text-gray-700 text-lg">Don Branson</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm xl:text-base">
              {navItems.map((item) =>
                renderNavLink(
                  item,
                  "py-4 px-2 whitespace-nowrap hover:text-gray-900",
                  "text-gray-900 border-b-2 border-blue-500",
                  "text-gray-500"
                )
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile links: always rendered (hidden when closed) so the button's aria-controls target exists */}
          <div id="mobile-menu" hidden={!menuOpen} className="lg:hidden border-t border-gray-200 py-2">
            {navItems.map((item) =>
              renderNavLink(
                item,
                "block py-3 px-2 rounded-md text-base hover:bg-gray-50 hover:text-gray-900",
                "text-gray-900 font-semibold",
                "text-gray-600"
              )
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Don Branson. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/donbr"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/donbranson/"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://graph-viz-next.vercel.app/"
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Graph Visualizations
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
