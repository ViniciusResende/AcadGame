/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import AuthenticatedLayout from '../../components/Layout/Authenticated';

/** Route elements */
import RouteExercisesAdd from './RouteExercisesAdd';
import RouteExercisesSheet from './RouteExercisesSheet';
import RouteHome from './RouteHome';
import RouteProfile from './RouteProfile';

/** Exports */
export default (
  <Route path="/" element={<AuthenticatedLayout />}>
    <Route index element={<RouteHome />} />
    <Route path="/profile" element={<RouteProfile />} />
    <Route path="/exercisesSheets">
      <Route index element={<RouteExercisesSheet />} />
      <Route path=":sheetId/add" element={<RouteExercisesAdd />} />
    </Route>
  </Route>
);
