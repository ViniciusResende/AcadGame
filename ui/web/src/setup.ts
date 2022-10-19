/** Library */
import Lib, { ILibConfiguration } from 'acad-game-lib';

const libConfiguration: ILibConfiguration = {
  baseApiUrl: 'https://acadgame.com/api',
};

Lib.utils.setConfiguration(libConfiguration);
