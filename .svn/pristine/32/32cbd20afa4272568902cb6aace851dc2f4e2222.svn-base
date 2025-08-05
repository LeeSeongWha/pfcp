import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Eclass from "./pages/Eclass";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import EclassAssignment from "./pages/EclassLearningSpacePage";
import EclassMaterial from "./pages/EclassMaterial";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SessionDetailPage from "./pages/SessionDetailPage";
import SessionCreatePage from "./pages/SessionCreatePage";
import EclassroomPage from "./pages/EclassroomPage";
import ChatPage from "./pages/ChatPage";
import EclassLectureListPage from "./pages/EclassLectureListPage";
import EclassProfessorLectureListPage from "./pages/EclassLectureListPage";
import EclassLearningSpacePage from "./pages/EclassLearningSpacePage";
import EclassLearningSpaceDetailPage from "./pages/EclassLearningSpaceDetailPage";
import EclassAssignmentManager from "./pages/EclassAssignmentManager";
import EclassAssignmentForm from "./pages/EclassAssignmentForm";
import EclassTestPage from "./pages/EclassTestPage";
import Form from "./components/form/Form";
import DefaultInputs from "./components/form/form-elements/DefaultInputs";
import MaterialForm from "./components/material/MaterialForm";
import ExamDetail from "./components/exam/ExamDetail";
import JobList2 from "./pages/Jobs/JobList2";
import PostingCards from "./pages/Jobs/PostingCards";
import RecentPosts from "./pages/Jobs/RecentPosts";
import JobDashboard from "./pages/Jobs/JobDashboard";
import JobListDetail from "./pages/Jobs/JobListDetail";
import JobPostDetail from "./pages/Jobs/JobPostDetail";
import EclassAssignmentListAll from "./pages/EclassAssignmentListAll";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ProfessorDataPage from "./pages/professor/ProfessorDataPage";
import StudentStatistics from "./pages/StudentStatistics";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route path="/eclass/statistics" element={<StudentStatistics />} />

            <Route path="/jobs" element={<JobDashboard />} />
            {/* <Route path="/jobs/new" element={<JobForm />} /> */}
            <Route path="/jobs/jobsListDetail" element={<JobListDetail />} />
            <Route
              path="/jobs/jobsPostDetail/:jobId"
              element={<JobPostDetail />}
            />
            {/* professor Data*/}
            <Route path="/professorData" element={<ProfessorDataPage />} />
            {/* staff dashboard */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/eclass" element={<Eclass />} />
            <Route path="/session" element={<SessionCreatePage />} />
            <Route path="/session/:sessionNo" element={<SessionDetailPage />} />
            <Route
              path="/eclass/lecture/:userNo/:lectureName/assignment"
              element={<EclassLearningSpacePage />}
            />
            <Route
              path="/eclass/assignmentList/:userNo"
              element={<EclassAssignmentListAll />}
            />
            <Route
              path="/eclass/lecture/:userNo/:lectureName/assignment/:assignmentId"
              element={<EclassLearningSpaceDetailPage />}
            />
            <Route path="/eclass/material" element={<EclassMaterial />} />

            <Route
              path="/eclass/lecture/:userNo"
              element={<EclassLectureListPage />}
            />
            {/* 과제 등록 */}
            <Route
              path="/eclass/lecture/:userNo/:lectureName/assignment/new"
              element={<EclassAssignmentManager />}
            />
            {/* 과제 제출 폼 */}
            <Route
              path="/eclass/lecture/:userNo/:lectureName/assignment/student/new"
              element={<EclassAssignmentForm />}
            />
            <Route
              path="/eclass/lecture/:userNo/:lectureName/exam/:examName"
              element={<ExamDetail />}
            />
            <Route
              path="/eclass/lecture/:userNo/:lectureName/material/new"
              element={<MaterialForm />}
            />
            <Route
              path="/eclass/lecture/:userNo/:lectureName/material/edit"
              element={<MaterialForm />}
            />

            {/* TODO: 학습마당에서 시험을 넣을 지 시험탭을 따로 만들지 고민 */}
            <Route path="/eclass/test" element={<EclassTestPage />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
