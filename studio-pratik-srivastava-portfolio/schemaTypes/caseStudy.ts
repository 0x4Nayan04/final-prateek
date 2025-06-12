// /schemas/caseStudy.ts

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the case study',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      description: 'Brief description of the case study',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Main image shown on case study cards and headers',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      description: 'Additional images for the case study',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Technologies, tools, and categories (e.g., Power BI, Analytics, SQL)',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'priority',
      title: 'Priority (Lower number = higher priority)',
      type: 'number',
      description: 'Used for sorting case studies on the homepage (1 = highest priority)',
      validation: (Rule) => Rule.min(1).max(100),
      initialValue: 50,
    }),
    defineField({
      name: 'clientOverview',
      title: 'Client Overview',
      type: 'blockContent',
      description: 'Background information about the client and their business',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'blockContent',
      description: 'What challenges or problems needed to be solved',
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'blockContent',
      description: 'Your methodology and strategy for solving the problem',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'blockContent',
      description: 'The technical solution and implementation details',
    }),
    defineField({
      name: 'result',
      title: 'Result & Impact',
      type: 'blockContent',
      description: 'Outcomes, metrics, and business impact achieved',
    }),
    defineField({
      name: 'iframePreview',
      title: 'Dashboard/Report Embed URL',
      type: 'url',
      description: 'URL for embedding Power BI, Tableau, or other interactive dashboards',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Downloadable Report (PDF)',
      type: 'file',
      description: 'PDF report or documentation for download',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      description: 'Links to live dashboards, reports, or related resources',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Link Title'},
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'description', type: 'string', title: 'Description'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'thumbnail',
    },
  },
  orderings: [
    {
      title: 'Priority (Highest First)',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
