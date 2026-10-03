import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { cn } from '@/lib/utils.ts';

interface StatusAction {
  label: string;
  to?: string; // renders a router Link; otherwise a button calling onClick
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface StatusPageProps {
  title: string; // document title (Layout adds " | Don Branson")
  heading: string;
  message: string;
  actions: StatusAction[];
  role?: 'alert';
}

const actionStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500',
  secondary: 'border border-gray-300 text-gray-800 hover:bg-gray-50',
};

// Full-page message with actions, shared by the 404 page and the route error boundary
const StatusPage: React.FC<StatusPageProps> = ({ title, heading, message, actions, role }) => (
  <Layout title={title}>
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center" role={role}>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{heading}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">{message}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {actions.map(({ label, to, onClick, variant = 'primary' }) => {
          const className = cn(
            'px-6 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            actionStyles[variant]
          );
          return to ? (
            <Link key={label} to={to} className={className}>{label}</Link>
          ) : (
            <button key={label} type="button" onClick={onClick} className={className}>{label}</button>
          );
        })}
      </div>
    </div>
  </Layout>
);

export default StatusPage;
