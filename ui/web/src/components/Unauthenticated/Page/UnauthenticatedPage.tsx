/** React imports */
import React from 'react';

/** Styles */
import './UnauthenticatedPage.scss';

/** Component properties interface */
interface UnauthenticatedPageComponentProps {
  illustrationContent: React.ReactNode;
  mainFormContent: React.ReactNode;
}

function UnauthenticatedPageComponent(
  props: UnauthenticatedPageComponentProps
) {
  return (
    <div className="unauthenticated-page">
      <aside className="unauthenticated-page__illustration">
        {props.illustrationContent}
      </aside>
      <main className="unauthenticated-page__content">
        {props.mainFormContent}
      </main>
    </div>
  );
}

/** Exports */
export default UnauthenticatedPageComponent;
