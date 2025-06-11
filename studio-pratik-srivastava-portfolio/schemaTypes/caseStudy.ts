// /schemas/caseStudy.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short Summary",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "priority",
      title: "Priority (Lower number = higher)",
      type: "number",
    }),
    defineField({
      name: "clientOverview",
      title: "Client Overview",
      type: "blockContent",
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "blockContent",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "blockContent",
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "blockContent",
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "blockContent",
    }),
    defineField({
      name: "iframePreview",
      title: "iFrame Embed URL (optional)",
      type: "url",
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File (for preview)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
  ],
});
