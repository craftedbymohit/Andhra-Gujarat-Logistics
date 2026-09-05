import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import RouteError from '@/pages/RouteError';

// Home ships in the initial bundle; every other page is split out.
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const RoadFreight = lazy(() => import('@/pages/RoadFreight'));
const ProjectCargo = lazy(() => import('@/pages/ProjectCargo'));
const CustomizedSolutions = lazy(() => import('@/pages/CustomizedSolutions'));
const BranchNetwork = lazy(() => import('@/pages/BranchNetwork'));
const Industries = lazy(() => import('@/pages/Industries'));
const Careers = lazy(() => import('@/pages/Careers'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const SocialComingSoon = lazy(() => import('@/pages/SocialComingSoon'));

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <RouteError />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'services', element: <Services /> },
        { path: 'services/road-freight', element: <RoadFreight /> },
        { path: 'services/project-cargo', element: <ProjectCargo /> },
        { path: 'services/customized-solutions', element: <CustomizedSolutions /> },
        { path: 'branch-network', element: <BranchNetwork /> },
        { path: 'industries', element: <Industries /> },
        { path: 'careers', element: <Careers /> },
        { path: 'contact', element: <Contact /> },
        { path: 'social-coming-soon', element: <SocialComingSoon /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
);
