import infoSVG from '@plone/volto/icons/info.svg';
import InfoboxView from './View';
import InfoboxEdit from './Edit';
import InfoboxSchema from './schema';
import type { BlockConfigBase } from '@plone/types';

const InfoboxBlockInfo: BlockConfigBase = {
  id: 'infoboxBlock',
  title: 'Infobox',
  icon: infoSVG,
  group: 'common',
  view: InfoboxView,
  edit: InfoboxEdit,
  blockSchema: InfoboxSchema,
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: true,
};

export default InfoboxBlockInfo;
