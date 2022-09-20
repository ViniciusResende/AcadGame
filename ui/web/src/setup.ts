/** Library */
import Lib, { ContinentNumber, ILibConfiguration } from 'acad-game-lib';

const continentNumber: ContinentNumber = 4;

const libConfiguration: ILibConfiguration = {
  baseApiUrl: 'https://backend.evolution.land/api',
  continentNumber,
  basePictureUrlApostle: 'https://gcs.evolution.land/apostle',
  basePictureUrlEquipment: 'https://www.evolution.land/evo_images/equipment',
  allowedImageDomains: ['www.evolution.land', 'gcs.evolution.land'],
};

Lib.utils.setConfiguration(libConfiguration);
