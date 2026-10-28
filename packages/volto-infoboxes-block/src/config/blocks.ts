import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';

// Infobox Block
import InfoboxBlockInfo from '../components/Blocks/Infobox';

declare module '@plone/types' {
  export interface BlocksConfigData {
    infoboxBlock: BlockConfigBase;
  }
}

export default function install(config: ConfigType) {
  config.blocks.blocksConfig.infoboxBlock = InfoboxBlockInfo;

  return config;
}
