import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import type { BrowserItem } from './types';

/**
 * Resolves the button target from the object browser value. Internal links
 * are flattened and keep the anchor the editor picked; external links are
 * returned as they are.
 */
export const getButtonHref = (link?: BrowserItem[]): string | undefined => {
  const item = link?.[0];
  const url = item?.['@id'];
  if (!url) return undefined;
  if (!isInternalURL(url)) return url;

  const path = flattenToAppURL(url);
  return item.anchor ? `${path}#${item.anchor}` : path;
};

const isSVG = (item: BrowserItem): boolean => {
  const field = item.image_field || 'image';
  const contentType = item.image_scales?.[field]?.[0]?.['content-type'];
  return contentType === 'image/svg+xml' || /\.svg$/i.test(item['@id']);
};

/**
 * Raster icons are rendered at the `teaser` scale. SVGs use the original
 * image, because Plone returns empty scales for them.
 */
export const getIconSrc = (icon?: BrowserItem[]): string | undefined => {
  const item = icon?.[0];
  if (!item?.['@id']) return undefined;

  const path = `${flattenToAppURL(item['@id'])}/@@images/${item.image_field || 'image'}`;
  return isSVG(item) ? path : `${path}/teaser`;
};
