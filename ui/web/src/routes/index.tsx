/** React imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Routes */
import RouteUnauthenticated from './unauthenticated';
import RouteAuthenticated from './authenticated';

/** Exports */
export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        {RouteUnauthenticated}
        {RouteAuthenticated}
        {/* <Route path="*" element={<NotFoundPageComponent />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
