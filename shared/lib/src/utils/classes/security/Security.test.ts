/** Classes */
import { SecurityClass } from './Security';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../../data/interfaces/CommonInterfaces';

/** Enums */
import { SecurityEvents } from './SecurityEnums';

describe('Security', () => {
  const FAKE_MOCK_JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  let security: SecurityClass;
  beforeEach(() => {
    jest.clearAllMocks();
    security = new SecurityClass();
  });

  it('should correctly setNewAuthToken when method is called', () => {
    jest.spyOn(security, 'publish');

    security.setNewAuthToken(FAKE_MOCK_JWT);

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.NEW_AUTH_TOKEN_OBTAINED,
      FAKE_MOCK_JWT
    );
  });

  it('should correctly excludeAuthToken when method is called', () => {
    jest.spyOn(security, 'publish');

    security.excludeAuthToken();

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.EXCLUDE_AUTH_TOKEN,
      null
    );
  });

  describe('should correctly getTokenStored when method is called', () => {
    it('should perform correctly when there is token stored', () => {
      jest.spyOn(security, 'publish');

      security.setNewAuthToken(FAKE_MOCK_JWT);

      const storedAuthToken = security.getTokenStored();

      expect(storedAuthToken).toEqual(FAKE_MOCK_JWT);
      expect(security.publish).toHaveBeenCalledTimes(1);
      expect(security.publish).not.toHaveBeenCalledWith(
        SecurityEvents.NO_AUTH_TOKEN_STORED,
        null
      );
    });

    it('should perform correctly when there is no token stored', () => {
      jest.spyOn(security, 'publish');

      security.excludeAuthToken();
      const storedAuthToken = security.getTokenStored();

      expect(storedAuthToken).toEqual(null);
      expect(security.publish).toHaveBeenCalledTimes(2);
      expect(security.publish).toHaveBeenCalledWith(
        SecurityEvents.NO_AUTH_TOKEN_STORED,
        null
      );
    });
  });

  it('should correctly publishApiRequestUnauthorized when method is called', () => {
    jest.spyOn(security, 'publish');

    const genericErrorPayload: ILibGeneralErrorPayload = {
      errorCode: 401,
      errorMessage: 'Token Expired',
    };

    security.publishApiRequestUnauthorized(genericErrorPayload);

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.API_REQUEST_UNAUTHORIZED,
      genericErrorPayload
    );
  });

  it('should correctly subscribeSecurityFailEvents when method is called', () => {
    jest.spyOn(security, 'subscribe');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nop = () => {};

    security.subscribeSecurityFailEvents(nop);

    expect(security.subscribe).toHaveBeenCalledTimes(2);
    expect(security.subscribe).toHaveBeenCalledWith(
      SecurityEvents.API_REQUEST_UNAUTHORIZED,
      nop
    );
    expect(security.subscribe).toHaveBeenCalledWith(
      SecurityEvents.NO_AUTH_TOKEN_STORED,
      nop
    );
  });

  it('should correctly unsubscribeSecurityFailEvents when method is called', () => {
    jest.spyOn(security, 'unsubscribe');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nop = () => {};

    security.unsubscribeSecurityFailEvents(nop);

    expect(security.unsubscribe).toHaveBeenCalledTimes(2);
    expect(security.unsubscribe).toHaveBeenCalledWith(
      SecurityEvents.API_REQUEST_UNAUTHORIZED,
      nop
    );
    expect(security.unsubscribe).toHaveBeenCalledWith(
      SecurityEvents.NO_AUTH_TOKEN_STORED,
      nop
    );
  });
});
