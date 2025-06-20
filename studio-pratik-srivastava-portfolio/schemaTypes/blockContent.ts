// /schemas/blockContent.ts

import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    // Basic text block
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
        {title: 'Checklist', value: 'checklist'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Code', value: 'code'},
          {title: 'Highlight', value: 'highlight'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab?',
                initialValue: true,
              },
              {
                name: 'title',
                type: 'string',
                title: 'Link Title (optional)',
                description: 'Appears on hover',
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{type: 'caseStudy'}],
              },
            ],
          },
        ],
      },
    }),

    // Enhanced Image block
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Important for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
        },
        {
          name: 'size',
          type: 'string',
          title: 'Display Size',
          options: {
            list: [
              {title: 'Small', value: 'small'},
              {title: 'Medium', value: 'medium'},
              {title: 'Large', value: 'large'},
              {title: 'Full Width', value: 'full'},
            ],
          },
          initialValue: 'medium',
        },
      ],
    }),

    // Enhanced iframe embed block
    defineArrayMember({
      type: 'object',
      name: 'iframe',
      title: 'Embedded Content (iframe)',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Embed URL',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          description: 'Descriptive title for accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'height',
          type: 'number',
          title: 'Height (px)',
          initialValue: 600,
          validation: (Rule) => Rule.min(200).max(1200),
        },
        {
          name: 'allowFullscreen',
          type: 'boolean',
          title: 'Allow Fullscreen?',
          initialValue: true,
        },
      ],
      preview: {
        select: {title: 'title', url: 'url', height: 'height'},
        prepare({title, url, height}) {
          return {
            title: title || 'Embedded Content',
            subtitle: `${url} (${height}px)`,
          }
        },
      },
    }),

    // Callout/Alert block
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout Box',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Callout Type',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Success', value: 'success'},
              {title: 'Warning', value: 'warning'},
              {title: 'Error', value: 'error'},
              {title: 'Note', value: 'note'},
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title (optional)',
        },
        {
          name: 'content',
          type: 'array',
          title: 'Content',
          of: [{type: 'block'}],
        },
      ],
      preview: {
        select: {title: 'title', type: 'type'},
        prepare({title, type}) {
          return {
            title: title || 'Callout',
            subtitle: type,
          }
        },
      },
    }),

    // Metrics/Statistics block
    defineArrayMember({
      type: 'object',
      name: 'metricsGrid',
      title: 'Metrics Grid',
      fields: [
        {
          name: 'metrics',
          type: 'array',
          title: 'Metrics',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', type: 'string', title: 'Label'},
                {name: 'value', type: 'string', title: 'Value'},
                {name: 'description', type: 'string', title: 'Description'},
              ],
            },
          ],
          validation: (Rule) => Rule.max(6),
        },
      ],
      preview: {
        select: {metrics: 'metrics'},
        prepare({metrics}) {
          const count = metrics ? metrics.length : 0
          return {
            title: `Metrics Grid (${count} items)`,
            subtitle: 'Key performance indicators',
          }
        },
      },
    }),

    // PDF file block (enhanced)
    defineArrayMember({
      type: 'object',
      name: 'pdfEmbed',
      title: 'PDF Document',
      fields: [
        {
          name: 'file',
          type: 'file',
          title: 'PDF File',
          options: {
            accept: '.pdf',
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Document Title',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
        },
        {
          name: 'showPreview',
          type: 'boolean',
          title: 'Show Preview?',
          description: 'Display PDF in an embedded viewer for preview',
          initialValue: true,
        },
        {
          name: 'downloadText',
          type: 'string',
          title: 'Preview Button Text',
          initialValue: 'Preview PDF',
        },
      ],
      preview: {
        select: {title: 'title', file: 'file'},
        prepare({title, file}) {
          return {
            title: title || 'PDF Document',
            subtitle: file ? file.asset?.originalFilename : 'No file selected',
          }
        },
      },
    }),
  ],
})
