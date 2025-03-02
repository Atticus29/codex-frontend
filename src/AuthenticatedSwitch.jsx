import React from 'react';
import { get } from 'lodash-es';
import { Switch, Route } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { TransitionGroup } from 'react-transition-group';
import AuthenticatedAppHeader from './components/AuthenticatedAppHeader';
import SaveCustomField from './pages/fieldManagement/settings/saveField/SaveField';
import GeneralSettings from './pages/generalSettings/GeneralSettings';
import ServerStatus from './pages/serverStatus/ServerStatus';
import SplashSettings from './pages/splashSettings/SplashSettings';
import FieldManagement from './pages/fieldManagement/FieldManagement';
import UserManagement from './pages/userManagement/UserManagement';
import AdminActions from './pages/adminActions/AdminActions';
import ControlPanel from './pages/controlPanel/ControlPanel';
import Individual from './pages/individual/Individual';
import CreateIndividual from './pages/individual/CreateIndividual';
import PictureBook from './pages/individual/PictureBook';
import Sighting from './pages/sighting/Sighting';
import Splash from './pages/splash/Splash';
import AssetGroup from './pages/assetGroup/AssetGroup';
import Org from './pages/org/Org';
import Orgs from './pages/org/Orgs';
import CreateOrg from './pages/org/CreateOrg';
// import Project from './pages/projects/Project';
// import Projects from './pages/projects/Projects';
import User from './pages/user/User';
import Users from './pages/user/Users';
import CreateUser from './pages/user/CreateUser';
import BulkImport from './pages/bulkImport/BulkImport';
import BulkImportSuccess from './pages/bulkImport/Success';
import ReportSighting from './pages/reportSighting/ReportSighting';
import ReportSuccess from './pages/reportSighting/Success';
import Notifications from './pages/notifications/Notifications';
import FourOhFour from './pages/fourohfour/FourOhFour';
import useSiteSettings from './models/site/useSiteSettings';
import SearchIndividuals from './pages/individual/SearchIndividuals';
import SearchSightings from './pages/sighting/SearchSightings';
import SiteSetup from './pages/setup/SiteSetup';
import MatchReview from './pages/match/MatchReview';
import FlagsOnly from './pages/match/iceland/FlagsOnly';
import Iceland from './pages/match/iceland/Iceland';
import Welcome from './pages/auth/Welcome';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Footer from './components/Footer';
import { defaultCrossfadeDuration } from './constants/defaults';

export default function AuthenticatedSwitch() {
  const { data: siteSettings } = useSiteSettings();
  const siteNeedsSetup = get(siteSettings, [
    'site.needsSetup',
    'value',
  ]);

  return (
    <main>
      <AuthenticatedAppHeader />
      <Route
        render={({ location }) => (
          <TransitionGroup appear>
            <Fade
              key={location.key}
              timeout={defaultCrossfadeDuration}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    minHeight: 'calc(100vh - 64px)',
                    boxSizing: 'border-box',
                  }}
                >
                  {siteNeedsSetup ? (
                    <SiteSetup />
                  ) : (
                    <Switch location={location}>
                      <Route path="/admin/splash" exact>
                        <SplashSettings />
                      </Route>
                      <Route path="/admin/splash/preview">
                        <Splash />
                      </Route>
                      <Route path="/admin/status">
                        <ServerStatus />
                      </Route>
                      <Route path="/admin/users">
                        <UserManagement />
                      </Route>
                      <Route path="/admin/actions">
                        <AdminActions />
                      </Route>
                      <Route path="/admin/fields/save-custom-field/:type?/:id?">
                        <SaveCustomField />
                      </Route>
                      <Route path="/admin/fields">
                        <FieldManagement />
                      </Route>
                      <Route path="/admin/settings">
                        <GeneralSettings />
                      </Route>
                      <Route path="/admin">
                        <ControlPanel />
                      </Route>
                      <Route path="/individuals/picturebook">
                        <PictureBook />
                      </Route>
                      <Route path="/individuals/:id">
                        <Individual />
                      </Route>
                      <Route path="/individuals">
                        <SearchIndividuals />
                      </Route>
                      <Route path="/create/individual">
                        <CreateIndividual />
                      </Route>
                      <Route path="/bulk-imports/:id">
                        <AssetGroup />
                      </Route>
                      <Route path="/notifications">
                        <Notifications />
                      </Route>
                      <Route path="/match/:id">
                        <MatchReview />
                      </Route>
                      <Route path="/pending-sightings/:id">
                        <Sighting pending />
                      </Route>
                      <Route path="/sightings/:id">
                        <Sighting />
                      </Route>
                      <Route path="/sightings">
                        <SearchSightings />
                      </Route>
                      <Route path="/users/:id">
                        <User />
                      </Route>
                      <Route path="/users">
                        <Users />
                      </Route>
                      <Route path="/settings">
                        <Settings />
                      </Route>
                      <Route path="/create/user">
                        <CreateUser />
                      </Route>
                      <Route path="/create/org">
                        <CreateOrg />
                      </Route>
                      <Route path="/orgs/:id">
                        <Org />
                      </Route>
                      <Route path="/orgs">
                        <Orgs />
                      </Route>
                      {/* <Route path="/projects/:id">
                        <Project />
                      </Route>
                      <Route path="/projects">
                        <Projects />
                      </Route> */}
                      <Route path="/bulk-import/success/:id">
                        <BulkImportSuccess />
                      </Route>
                      <Route path="/bulk-import">
                        <BulkImport />
                      </Route>
                      <Route path="/report/success/:id">
                        <ReportSuccess authenticated />
                      </Route>
                      <Route path="/report">
                        <ReportSighting authenticated />
                      </Route>
                      <Route path="/iceland/flags">
                        <FlagsOnly />
                      </Route>
                      <Route path="/iceland">
                        <Iceland />
                      </Route>
                      <Route path="/welcome">
                        <Welcome />
                      </Route>
                      <Route path="/" exact>
                        <Home />
                      </Route>
                      <Route>
                        <FourOhFour />
                      </Route>
                    </Switch>
                  )}
                </div>
                <Footer authenticated />
              </div>
            </Fade>
          </TransitionGroup>
        )}
      />
    </main>
  );
}
