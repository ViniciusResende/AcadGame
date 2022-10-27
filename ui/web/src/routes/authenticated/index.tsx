/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import AuthenticatedLayout from '../../components/Layout/Authenticated';

/** Route elements */
import RouteProfile from './RouteProfile';

/** Exports */
export default (
  <Route path="/" element={<AuthenticatedLayout />}>
    <Route path="/profile" element={<RouteProfile />} />
  </Route>
);
