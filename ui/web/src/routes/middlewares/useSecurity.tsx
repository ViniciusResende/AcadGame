/** React imports */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Library */
import Lib from 'acad-game-lib';

function useSecurity() {
  const navigate = useNavigate();
  useEffect(() => {
    const navigateToUnauthenticated = () => navigate('/login');

    Lib.utils.subscribeSecurityFailEvents(navigateToUnauthenticated);
    return () => {
      Lib.utils.unsubscribeSecurityFailEvents(navigateToUnauthenticated);
    };
  }, []);
}

export default useSecurity;
