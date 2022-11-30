import { LocalStorage } from './LocalStorage';

class LocalStorageMock {
  store: Record<string, string>;
  length: number;
  key: (index: number) => string | null;

  constructor() {
    this.store = {};
    this.length = 0;
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string | Record<string, unknown>) {
    this.store[key] = String(value);
    this.length++;
  }

  removeItem(key: string) {
    delete this.store[key];
    this.length--;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

describe('LocalStorage', () => {
  const LOCAL_STORAGE_MOCK_KEY = 'mock_local_storage';

  let localStorage: LocalStorage;
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage = new LocalStorage();
  });

  it('should correctly call localStorage getItem when getLocalStorageItem method is called', () => {
    jest.spyOn(window.localStorage, 'getItem');

    localStorage.getLocalStorageItem(LOCAL_STORAGE_MOCK_KEY);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_MOCK_KEY
    );
  });

  it('should correctly call localStorage setItem when setLocalStorageItem method is called', () => {
    jest.spyOn(window.localStorage, 'setItem');

    localStorage.setLocalStorageItem(LOCAL_STORAGE_MOCK_KEY, 'value');
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_MOCK_KEY,
      'value'
    );
  });

  it('should correctly call localStorage removeItem when setLocalStorageItem method is called', () => {
    jest.spyOn(window.localStorage, 'removeItem');

    localStorage.removeLocalStorageItem(LOCAL_STORAGE_MOCK_KEY);
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_MOCK_KEY
    );
  });
});
