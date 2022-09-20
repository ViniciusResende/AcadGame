/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import UnauthenticatedLayout from '../../components/Layout/Unauthenticated';

/** React components */
import Login from '../../components/Unauthenticated/Login';

/** Exports */
export default (
  <Route path="/" element={<UnauthenticatedLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);
