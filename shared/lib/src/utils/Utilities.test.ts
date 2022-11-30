/** Classes */
import { Security } from './classes/security/Security';
import { UtilitiesClass } from './Utilities';

/** Enums */
import { UtilitiesEvents } from './UtilitiesEnums';

describe('Utilities', () => {
  const MOCK_UTILITIES_CONFIGURATION = { baseApiUrl: 'https://test.tst' };

  let utilities: UtilitiesClass;
  beforeEach(() => {
    jest.clearAllMocks();
    utilities = new UtilitiesClass();
  });

  it('should correctly set configuration and publish event', () => {
    jest.spyOn(utilities, 'publish');

    utilities.setConfiguration(MOCK_UTILITIES_CONFIGURATION);

    expect(utilities.publish).toHaveBeenCalledTimes(1);
    expect(utilities.publish).toHaveBeenCalledWith(
      UtilitiesEvents.CONFIGURATION_CHANGED,
      MOCK_UTILITIES_CONFIGURATION
    );
  });

  it('should correctly retrieve utilities configuration when call configuration getter', () => {
    utilities.setConfiguration(MOCK_UTILITIES_CONFIGURATION);

    const retrievedConfiguration = utilities.configuration;

    expect(retrievedConfiguration).toEqual(MOCK_UTILITIES_CONFIGURATION);
  });

  it('should correctly perform while calling getNumber helper', () => {
    let getNumberRes = utilities.getNumber(3);
    expect(getNumberRes).toEqual(3);

    getNumberRes = utilities.getNumber('4');
    expect(getNumberRes).toEqual(4);

    getNumberRes = utilities.getNumber(undefined);
    expect(getNumberRes).toEqual(0);

    getNumberRes = utilities.getNumber(null);
    expect(getNumberRes).toEqual(0);

    getNumberRes = utilities.getNumber(NaN);
    expect(getNumberRes).toEqual(0);
  });

  it('should correctly perform while calling resolvePath helper', () => {
    interface IMockObj {
      key1: {
        key2: {
          key3: string;
        };
      };
      key4: number;
      key5: number;
    }
    const mockObj: IMockObj = {
      key1: {
        key2: {
          key3: 'hello world',
        },
      },
      key4: 4,
      key5: 5,
    };

    const pathResolveFail = utilities.resolvePath<string>(
      mockObj,
      'key1.key4',
      'fail to resolve'
    );

    expect(pathResolveFail).toBe('fail to resolve');

    const pathResolveSuccess = utilities.resolvePath<string>(
      mockObj,
      'key1.key2.key3',
      'fail to resolve'
    );

    expect(pathResolveSuccess).toBe('hello world');
  });

  it('should call subscribeSecurityFailEvents security method when called', () => {
    jest.spyOn(Security, 'subscribeSecurityFailEvents');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nop = () => {};

    utilities.subscribeSecurityFailEvents(nop);

    expect(Security.subscribeSecurityFailEvents).toHaveBeenCalledTimes(1);
    expect(Security.subscribeSecurityFailEvents).toHaveBeenCalledWith(nop);
  });

  it('should call unsubscribeSecurityFailEvents security method when called', () => {
    jest.spyOn(Security, 'unsubscribeSecurityFailEvents');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nop = () => {};

    utilities.unsubscribeSecurityFailEvents(nop);

    expect(Security.unsubscribeSecurityFailEvents).toHaveBeenCalledTimes(1);
    expect(Security.unsubscribeSecurityFailEvents).toHaveBeenCalledWith(nop);
  });
});
