import type {
  BlockEditProps,
  BlocksFormData,
  BlockViewProps,
} from '@plone/types';

/**
 * An item as returned by the object browser widget.
 */
export interface BrowserItem {
  '@id': string;
  title?: string;
  /**
   * Set by the object browser link mode when the editor picks an anchor.
   */
  anchor?: string;
  image_field?: string;
  image_scales?: Record<string, { 'content-type'?: string }[]>;
  [key: string]: unknown;
}

export type InfoboxAlignment = 'left' | 'right' | 'center';

/**
 * The block data as stored on the content object.
 *
 * The shape is kept compatible with the original DLR `infoboxBlock`, so
 * existing content renders without a migration.
 */
export interface InfoboxBlockData extends BlocksFormData {
  icon?: BrowserItem[];
  title?: string;
  /**
   * Slate value of the rich text body.
   */
  value?: unknown[];
  plaintext?: string;
  buttonText?: string;
  buttonLink?: BrowserItem[];
  align?: InfoboxAlignment;
}

export interface InfoboxViewProps extends Omit<BlockViewProps, 'data'> {
  data: InfoboxBlockData;
  isEditMode?: boolean;
}

export interface InfoboxEditProps extends Omit<BlockEditProps, 'data'> {
  data: InfoboxBlockData;
}

export type InfoboxDataProps = Pick<
  InfoboxEditProps,
  | 'block'
  | 'blocksConfig'
  | 'blocksErrors'
  | 'data'
  | 'onChangeBlock'
  | 'navRoot'
  | 'contentType'
>;
