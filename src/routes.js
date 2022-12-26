import { ChannelList } from './pages/ChannelList/ChannelList'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { WordDecision } from './pages/WordDecision/WordDecision'
import { WordPage } from './pages/WordPage/WordPage'
// import DashboardIcon from '@mui/icons-material/Dashboard';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import DvrIcon from '@mui/icons-material/Dvr';
import { ChannelPage } from './pages/ChannelPage/ChannelPage';
import { ChannelComparison } from './pages/ChannelComparison/ChannelComparison';
import CompareIcon from '@mui/icons-material/Compare';

const Routes = [
    // {
    //   path: '/',
    //   pathname: 'Dashboard',
    //   icon: <DashboardIcon />,
    //   component: <Dashboard />
    // },
    {
      path: '/',
      pathname: 'Channels',
      sidebarName: 'Channels',
      icon: <DvrIcon />,
      component: <ChannelList />
    },
    {
      path: '/word-decision',
      pathname: 'WordDecision',
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
  ];
  
  export default Routes;
  