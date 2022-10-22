/** React imports */
import React from 'react';

/** Styles */
import './DefaultCardBox.scss';

/** Component properties interface */
interface DefaultCardBoxComponentProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
function DefaultCardBoxComponent(props: DefaultCardBoxComponentProps) {
  const { title, icon, children } = props;

  return (
    <div className="default-card-box__container">
      <header className="default-card-box__header">
        {icon}
        <h2>{title}</h2>
      </header>
      <main className="default-card-box__content">{children}</main>
    </div>
  );
}

/** Exports */
export default DefaultCardBoxComponent;
