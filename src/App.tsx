import { Routes, Route } from 'react-router-dom';
import HomePage          from '@/Pages/HomePage';
import AboutPage         from '@/Pages/AboutPage';
import AILabPage         from '@/Pages/AILabPage';
import SkillsPage        from '@/Pages/SkillsPage';
import CertificationsPage from '@/Pages/CertificationsPage';
import ProjectsPage      from '@/Pages/ProjectsPage';
import ExperiencePage    from '@/Pages/ExperiencePage';
import ContactPage       from '@/Pages/ContactPage';

export default function App() {
  return (
    <Routes>
      <Route path="/"               element={<HomePage />} />
      <Route path="/about"          element={<AboutPage />} />
      <Route path="/ai-lab"         element={<AILabPage />} />
      <Route path="/skills"         element={<SkillsPage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/projects"       element={<ProjectsPage />} />
      <Route path="/experience"     element={<ExperiencePage />} />
      <Route path="/contact"        element={<ContactPage />} />
    </Routes>
  );
}