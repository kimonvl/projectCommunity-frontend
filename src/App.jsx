import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/LogIn'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import { connect, useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated, selectLoading } from './store/auth/auth.selector'
import Home from './pages/Home'
import MainLayout from './pages/MainLayout'
import { useEffect } from 'react'
import { isAuthenticatedStart } from './store/auth/authSlice'
import { connectWebsocketStart } from './store/websocket/websocketSlice'
import ProjectDetails from './pages/ProjectDetails'
import IssueDetails from './pages/IssueDetails'

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectLoading);

  useEffect(() => {

    dispatch(isAuthenticatedStart());
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Connecting WS...");
      dispatch(connectWebsocketStart());
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path='/auth/signup'
        element={<ProtectedRoute element={<SignUp />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}
      />
      <Route path='/auth/login'
        element={<ProtectedRoute element={<Login />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}
      />
      <Route element={<ProtectedRoute element={<MainLayout />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}>
        <Route path='/'
          element={<ProtectedRoute element={<Home />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}
        />
        <Route path='/projectDetails/:projectId'
          element={<ProtectedRoute element={<ProjectDetails />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}
        />
        <Route path='/issueDetails/:issueId'
          element={<ProtectedRoute element={<IssueDetails />} user={user} isAuthenticated={isAuthenticated} loading={loading} />}
        />
      </Route>
    </Routes>
  )
}

export default App
