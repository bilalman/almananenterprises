import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DeploymentModal } from './components/DeploymentModal';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { BackToTopButton } from './components/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { RecruitmentPage } from './pages/RecruitmentPage';
import { TrainingPage } from './pages/TrainingPage';
import { ApplyPage } from './pages/ApplyPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const [deploymentModalOpen, setDeploymentModalOpen] = useState(false);

  // Match route
  const renderView = () => {
    // Exact or normalized routes
    const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    if (path === '/' || path === '') {
      return <HomePage />;
    }
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/services') {
      return <ServicesPage />;
    }
    if (path === '/services/overseas-employment') {
      return <ServiceDetailPage serviceId="overseas-employment" />;
    }
    if (path === '/services/travel-tours') {
      return <ServiceDetailPage serviceId="travel-tours" />;
    }
    if (path === '/services/training-center') {
      return <ServiceDetailPage serviceId="training-center" />;
    }
    if (path === '/recruitment') {
      return <RecruitmentPage />;
    }
    if (path === '/training') {
      return <TrainingPage />;
    }
    if (path === '/apply' || path === '/register') {
      return <ApplyPage />;
    }
    if (path === '/contact') {
      return <ContactPage />;
    }
    if (path === '/portal' || path === '/login') {
      return <PortalPage />;
    }

    // Default fallback to HomePage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-900 selection:text-white relative">
      {/* Subtle Viewport Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Top Header Navigation */}
      <Header />

      {/* Main Routed Page Content with smooth page transition */}
      <main className="flex-1 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Footer with Deployment Guide trigger */}
      <Footer onOpenDeploymentGuide={() => setDeploymentModalOpen(true)} />

      {/* Discreet Floating Back to Top Button */}
      <BackToTopButton />

      {/* Deployment & cPanel Setup Modal */}
      <DeploymentModal
        isOpen={deploymentModalOpen}
        onClose={() => setDeploymentModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
