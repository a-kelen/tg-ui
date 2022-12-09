import { ChannelList } from './pages/ChannelList/ChannelList'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { WordDecision } from './pages/WordDecision/WordDecision'
import { WordPage } from './pages/WordPage/WordPage'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import DvrIcon from '@mui/icons-material/Dvr';
import { AdminPanel } from './pages/Admin/AdminPanel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ChannelPage } from './pages/ChannelPage/ChannelPage';
import { ChannelComparison } from './pages/ChannelComparison/ChannelComparison';
import CompareIcon from '@mui/icons-material/Compare';

const Routes = [
    {
      path: '/',
      pathname: 'Dashboard',
      // sidebarName: 'Dashboard',
      icon: <DashboardIcon />,
      component: <Dashboard />
    },
    {
      path: '/channels',
      pathname: 'Channels',
      sidebarName: 'Channels',
      icon: <DvrIcon />,
      component: <ChannelList />
    },
    {
      path: '/word-decision',
      pathname: 'WordDecision',
      // sidebarName: 'Word Decision',
      component: <WordDecision />
    },
    {
      path: '/word',
      pathmame: 'WordPage',
      sidebarName: 'Word Visualizer',
      icon: <LineAxisIcon />,
      component: <WordPage />
    },
    {
      path: '/channel/:id',
      pathmame: 'ChannelPage',
      icon: <LineAxisIcon />,
      component: <ChannelPage />
    },
    {
      path: '/channel-comparison',
      pathmame: 'ChannelComparison',
      sidebarName: 'Channel Comparison',
      icon: <CompareIcon />,
      component: <ChannelComparison />
    },
    {
      path: '/admin',
      pathmame: 'Admin',
      // sidebarName: 'Admin Panel',
      icon: <AdminPanelSettingsIcon />,
      component: <AdminPanel />
    },
  ];
  
  export default Routes;
  