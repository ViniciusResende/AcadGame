/** React imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Routes */
import RouteUnauthenticated from './unauthenticated';

/** Exports */
export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        {RouteUnauthenticated}
        {/* {RouteApostle} */}
        {/* <Route path="*" element={<NotFoundPageComponent />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
