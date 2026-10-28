import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { useIntl } from 'react-intl';
import type { InfoboxDataProps } from './types';

const InfoboxData = (props: InfoboxDataProps) => {
  const {
    block,
    blocksConfig,
    blocksErrors,
    data,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
  const intl = useIntl();

  const blockSchema = blocksConfig.infoboxBlock.blockSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ data, intl })
      : blockSchema;

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id: string, value: unknown) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
      errors={blocksErrors}
    />
  );
};

export default InfoboxData;
