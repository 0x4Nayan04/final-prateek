// /schemas/blockContent.ts

import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    // Basic text block
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
        { title: "Code Block", value: "code" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "External Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab?",
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),

    // Image block
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    // iframe embed block
    defineArrayMember({
      type: "object",
      name: "iframe",
      title: "iFrame Embed",
      fields: [
        {
          name: "url",
          type: "url",
          title: "Embed URL",
        },
        {
          name: "title",
          type: "string",
          title: "Optional Title",
        },
        {
          name: "height",
          type: "number",
          title: "Height (px)",
          initialValue: 400,
        },
      ],
      preview: {
        select: { title: "title", url: "url" },
        prepare({ title, url }) {
          return {
            title: title || "iFrame",
            subtitle: url,
          };
        },
      },
    }),

    // Optional: PDF/file preview block
    defineArrayMember({
      type: "file",
      name: "pdfPreview",
      title: "PDF Preview File (optional)",
      options: {
        accept: ".pdf",
      },
    }),
  ],
});
