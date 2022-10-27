/** React imports */
import React from 'react';

/** Styles */
import './WorkingOnPlaceholder.scss';

/** Assets */
import { WorkingOnIllustration } from '../../../assets/svg/illustrations';

/** Constants */
const DEFAULT_WORKING_ON_TEXT = 'Ainda trabalhando pela sua experiência';

/** Component properties interface */
interface WorkingOnPlaceholderComponentProps {
  title?: string;
}
function WorkingOnPlaceholderComponent({
  title = DEFAULT_WORKING_ON_TEXT,
}: WorkingOnPlaceholderComponentProps) {
  return (
    <div className="working-on-placeholder__container">
      <WorkingOnIllustration />
      <h2>{title}</h2>
    </div>
  );
}

/** Exports */
export default WorkingOnPlaceholderComponent;
