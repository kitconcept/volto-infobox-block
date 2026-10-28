import cx from 'classnames';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { getButtonHref, getIconSrc } from './helpers';
import type { InfoboxViewProps } from './types';

const InfoboxView = (props: InfoboxViewProps) => {
  const { data, isEditMode, className } = props;
  const align = data.align || 'center';
  const iconSrc = getIconSrc(data.icon);
  // No navigation while editing, so clicking the button selects the block.
  const href = isEditMode ? undefined : getButtonHref(data.buttonLink);

  return (
    <BlockWrapper {...props} className={cx('infobox', align, className)}>
      <div className={cx('inner', align)}>
        <div className="title_row">
          {iconSrc && <img className="icon" src={iconSrc} alt="" />}
          {data.title && <h2 className="title">{data.title}</h2>}
        </div>
        <div className="info-text">
          {isEditMode ? (
            // `detached` makes Enter add a paragraph instead of a new block.
            <DetachedTextBlockEditor {...props} detached />
          ) : (
            <TextBlockView {...props} />
          )}
        </div>
        {data.buttonText &&
          (href ? (
            <UniversalLink className="button" href={href}>
              {data.buttonText}
            </UniversalLink>
          ) : (
            <span className="button">{data.buttonText}</span>
          ))}
      </div>
    </BlockWrapper>
  );
};

export default InfoboxView;
