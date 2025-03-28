import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link to="/" className="flex items-center py-4">
                  <span className="font-semibold text-gray-700 text-lg">Don Branson</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a 
                href="/#about" 
                className={cn(
                  "py-4 px-2 hover:text-gray-900",
                  location.hash === '#about' ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500"
                )}
              >
                About
              </a>
              <a 
                href="/#expertise" 
                className={cn(
                  "py-4 px-2 hover:text-gray-900",
                  location.hash === '#expertise' ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500"
                )}
              >
                Expertise
              </a>
              <a 
                href="/#certifications" 
                className={cn(
                  "py-4 px-2 hover:text-gray-900",
                  location.hash === '#certifications' ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500"
                )}
              >
                Certifications
              </a>
              <Link 
                to="/assets/projects" 
                className={cn(
                  "py-4 px-2 hover:text-gray-900",
                  isActive('/assets/projects') ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500"
                )}
              >
                Projects
              </Link>
              <a 
                href="/#contact" 
                className={cn(
                  "py-4 px-2 hover:text-gray-900",
                  location.hash === '#contact' ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500"
                )}
              >
                Contact
              </a>
              <a 
                href="https://graph-viz-next.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="py-4 px-2 text-blue-600 hover:text-blue-800"
              >
                Graph Demos
              </a>
            </div>
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