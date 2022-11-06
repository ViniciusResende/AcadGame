/** Library */
import Lib, { ILibConfiguration } from 'acad-game-lib';

const libConfiguration: ILibConfiguration = {
  baseApiUrl: 'http://localhost:3001',
};

Lib.utils.setConfiguration(libConfiguration);
