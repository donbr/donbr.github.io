import { Link } from 'react-router-dom';

/**
 * Header component with navigation and accessibility improvements
 */
const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4" aria-label="Home page">
                <span className="font-semibold text-gray-700 text-lg">Don Branson</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3" role="menubar">
            <Link to="/#about" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">About</Link>
            <Link to="/#expertise" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Expertise</Link>
            <Link to="/#certifications" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Certifications</Link>
            <Link to="/projects" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Projects</Link>
            <Link to="/#contact" className="py-4 px-2 text-gray-500 hover:text-gray-900" role="menuitem">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
