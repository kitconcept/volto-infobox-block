import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import InfoboxView from './View';
import InfoboxData from './Data';
import type { InfoboxEditProps } from './types';

const InfoboxEdit = (props: InfoboxEditProps) => {
  const { selected } = props;

  return (
    <>
      <InfoboxView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <InfoboxData {...props} />
      </SidebarPortal>
    </>
  );
};

export default InfoboxEdit;
