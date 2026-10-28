import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  Infobox: {
    id: 'Infobox',
    defaultMessage: 'Infobox',
  },
  Button: {
    id: 'Button',
    defaultMessage: 'Button',
  },
  styling: {
    id: 'Styling',
    defaultMessage: 'Styling',
  },
  icon: {
    id: 'Icon',
    defaultMessage: 'Icon',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  buttonText: {
    id: 'Button Text',
    defaultMessage: 'Button Text',
  },
  buttonLink: {
    id: 'buttonLink',
    defaultMessage: 'Button Link',
  },
  alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  svgbest: {
    id: 'It is advised to use an SVG graphic.',
    defaultMessage: 'It is advised to use an SVG graphic.',
  },
});

export default function InfoboxSchema({ intl }: { intl: IntlShape }) {
  return {
    title: intl.formatMessage(messages.Infobox),
    block: 'infoboxBlock',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['icon', 'title'],
      },
      {
        id: 'button',
        title: intl.formatMessage(messages.Button),
        fields: ['buttonText', 'buttonLink'],
      },
      {
        id: 'styling',
        title: intl.formatMessage(messages.styling),
        fields: ['align'],
      },
    ],
    properties: {
      icon: {
        title: intl.formatMessage(messages.icon),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: false,
        selectedItemAttrs: ['image_field', 'image_scales'],
        description: intl.formatMessage(messages.svgbest),
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      buttonText: {
        title: intl.formatMessage(messages.buttonText),
      },
      buttonLink: {
        title: intl.formatMessage(messages.buttonLink),
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
      align: {
        title: intl.formatMessage(messages.alignment),
        widget: 'align',
        actions: ['left', 'right', 'center'],
        default: 'center',
      },
    },
    required: [],
  };
}
