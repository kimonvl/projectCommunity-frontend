import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/LogIn'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import { selectCurrentUser, selectIsAuthenticated, selectLoading } from './store/auth/auth.selector'
import Home from './pages/Home'
import MainLayout from './pages/MainLayout'
import { useEffect } from 'react'
import { isAuthenticatedStart } from './store/auth/authSlice'
import { connectWebsocketStart } from './store/websocket/websocketSlice'
import ProjectDetails from './pages/ProjectDetails'
import IssueDetails from './pages/IssueDetails'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectLoading);

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
