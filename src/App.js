import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/SavedJobs';
import MyApplications from './pages/MyApplications';
import PostJob from './pages/PostJob';
import NotFound from './pages/NotFound';
import { JobsProvider } from './context/JobsContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';
import './styles/global.css';

function App() {
  return (
    <JobsProvider>
      <SavedJobsProvider>
        <ApplicationsProvider>
          <BrowserRouter>
            <Header />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </ApplicationsProvider>
      </SavedJobsProvider>
    </JobsProvider>
  );
}

export default App;
