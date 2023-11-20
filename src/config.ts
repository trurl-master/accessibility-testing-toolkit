import type { IsInaccessibleOptions } from 'dom-accessibility-api';

type Config = {
  isInaccessibleOptions?: IsInaccessibleOptions;
};

const config: Config = {
  isInaccessibleOptions: undefined,
};

export const getConfig = (): typeof config => config;
export const configToolkit = (options: Partial<Config>): void => {
  Object.assign(config, options);
};
