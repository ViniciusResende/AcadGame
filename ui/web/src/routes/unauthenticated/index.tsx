/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import UnauthenticatedLayout from '../../components/Layout/Unauthenticated';

/** Route elements */
import RouteLogin from './RouteLogin';

/** Exports */
export default (
  <Route path="/" element={<UnauthenticatedLayout />}>
    <Route path="/login" element={<RouteLogin />} />
  </Route>
);
