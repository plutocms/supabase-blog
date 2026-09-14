import type {
  EditorCustomHandlers,
  EditorSuggestionMenuItem,
  EditorToolbarItem,
} from '@nuxt/ui'
import type { Editor, JSONContent } from '@tiptap/vue-3'
import { upperFirst } from 'scule'

// PostEditor.vue defines `customHandlers` itself, since it closes over a
// component-local ref (`isMediaModalOpen`). This alias only needs its shape,
// so the `satisfies` checks below can type-check the item arrays without
// importing the component's own value.
//
// This must stay a `type`, not an `interface`: `EditorCustomHandlers` is
// `Record<string, EditorHandler>`, and only a type literal gets the implicit
// string index signature TypeScript needs to satisfy that constraint.
// eslint-disable-next-line ts/consistent-type-definitions -- see note above
type ImageUploadHandlers = {
  imageUpload: EditorCustomHandlers['imageUpload']
}

export const fixedToolbarItems = [
  [
    {
      kind: 'undo',
      icon: 'i-lucide-undo',
      tooltip: { text: 'Undo' },
    },
    {
      kind: 'redo',
      icon: 'i-lucide-redo',
      tooltip: { text: 'Redo' },
    },
  ],
  [
    {
      icon: 'i-lucide-heading',
      tooltip: { text: 'Headings' },
      content: {
        align: 'start',
      },
      items: [
        {
          kind: 'heading',
          level: 1,
          icon: 'i-lucide-heading-1',
          label: 'Heading 1',
        },
        {
          kind: 'heading',
          level: 2,
          icon: 'i-lucide-heading-2',
          label: 'Heading 2',
        },
        {
          kind: 'heading',
          level: 3,
          icon: 'i-lucide-heading-3',
          label: 'Heading 3',
        },
        {
          kind: 'heading',
          level: 4,
          icon: 'i-lucide-heading-4',
          label: 'Heading 4',
        },
      ],
    },
    {
      icon: 'i-lucide-list',
      tooltip: { text: 'Lists' },
      content: {
        align: 'start',
      },
      items: [
        {
          kind: 'bulletList',
          icon: 'i-lucide-list',
          label: 'Bullet List',
        },
        {
          kind: 'orderedList',
          icon: 'i-lucide-list-ordered',
          label: 'Ordered List',
        },
      ],
    },
    {
      kind: 'blockquote',
      icon: 'i-lucide-text-quote',
      tooltip: { text: 'Blockquote' },
    },
    {
      kind: 'codeBlock',
      icon: 'i-lucide-square-code',
      tooltip: { text: 'Code Block' },
    },
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: 'i-lucide-bold',
      tooltip: { text: 'Bold' },
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: 'i-lucide-italic',
      tooltip: { text: 'Italic' },
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: 'i-lucide-underline',
      tooltip: { text: 'Underline' },
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: 'i-lucide-strikethrough',
      tooltip: { text: 'Strikethrough' },
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: 'i-lucide-code',
      tooltip: { text: 'Code' },
    },
  ],
  [
    {
      slot: 'link' as const,
      icon: 'i-lucide-link',
    },
    {
      kind: 'imageUpload',
      icon: 'i-lucide-image',
      tooltip: { text: 'Image' },
    },
  ],
] satisfies EditorToolbarItem<ImageUploadHandlers>[][]

export const bubbleToolbarItems = [
  [
    {
      label: 'Turn into',
      trailingIcon: 'i-lucide-chevron-down',
      activeColor: 'neutral',
      activeVariant: 'ghost',
      tooltip: { text: 'Turn into' },
      content: {
        align: 'start',
      },
      ui: {
        label: 'text-xs',
      },
      items: [
        {
          type: 'label',
          label: 'Turn into',
        },
        {
          kind: 'paragraph',
          label: 'Paragraph',
          icon: 'i-lucide-type',
        },
        {
          kind: 'heading',
          level: 1,
          icon: 'i-lucide-heading-1',
          label: 'Heading 1',
        },
        {
          kind: 'heading',
          level: 2,
          icon: 'i-lucide-heading-2',
          label: 'Heading 2',
        },
        {
          kind: 'heading',
          level: 3,
          icon: 'i-lucide-heading-3',
          label: 'Heading 3',
        },
        {
          kind: 'heading',
          level: 4,
          icon: 'i-lucide-heading-4',
          label: 'Heading 4',
        },
        {
          kind: 'bulletList',
          icon: 'i-lucide-list',
          label: 'Bullet List',
        },
        {
          kind: 'orderedList',
          icon: 'i-lucide-list-ordered',
          label: 'Ordered List',
        },
        {
          kind: 'blockquote',
          icon: 'i-lucide-text-quote',
          label: 'Blockquote',
        },
        {
          kind: 'codeBlock',
          icon: 'i-lucide-square-code',
          label: 'Code Block',
        },
      ],
    },
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: 'i-lucide-bold',
      tooltip: { text: 'Bold' },
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: 'i-lucide-italic',
      tooltip: { text: 'Italic' },
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: 'i-lucide-underline',
      tooltip: { text: 'Underline' },
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: 'i-lucide-strikethrough',
      tooltip: { text: 'Strikethrough' },
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: 'i-lucide-code',
      tooltip: { text: 'Code' },
    },
  ],
  [
    {
      slot: 'link' as const,
      icon: 'i-lucide-link',
    },
    {
      kind: 'imageUpload',
      icon: 'i-lucide-image',
      tooltip: { text: 'Image' },
    },
  ],
] satisfies EditorToolbarItem<ImageUploadHandlers>[][]

export const suggestionItems = [
  [
    {
      type: 'label',
      label: 'Style',
    },
    {
      kind: 'paragraph',
      label: 'Paragraph',
      icon: 'i-lucide-type',
    },
    {
      kind: 'heading',
      level: 1,
      label: 'Heading 1',
      icon: 'i-lucide-heading-1',
    },
    {
      kind: 'heading',
      level: 2,
      label: 'Heading 2',
      icon: 'i-lucide-heading-2',
    },
    {
      kind: 'heading',
      level: 3,
      label: 'Heading 3',
      icon: 'i-lucide-heading-3',
    },
    {
      kind: 'bulletList',
      label: 'Bullet List',
      icon: 'i-lucide-list',
    },
    {
      kind: 'orderedList',
      label: 'Numbered List',
      icon: 'i-lucide-list-ordered',
    },
    {
      kind: 'blockquote',
      label: 'Blockquote',
      icon: 'i-lucide-text-quote',
    },
    {
      kind: 'codeBlock',
      label: 'Code Block',
      icon: 'i-lucide-square-code',
    },
  ],
  [
    {
      type: 'label',
      label: 'Insert',
    },
    {
      kind: 'imageUpload',
      label: 'Image',
      icon: 'i-lucide-image',
    },
  ],
] satisfies EditorSuggestionMenuItem<ImageUploadHandlers>[][]

/**
 * Builds the item tree for the drag-handle's block dropdown menu (the
 * "grip" button next to a block). Pass the result to `mapEditorItems`,
 * along with the live `editor` and `customHandlers`, to get the final
 * `DropdownMenuItem[][]`.
 */
export function createBlockMenuItemTree(
  editor: Editor,
  selectedNode: { node: JSONContent, pos: number }
) {
  return [
    [
      {
        type: 'label',
        label: upperFirst(selectedNode.node.type ?? ''),
      },
      {
        label: 'Turn into',
        icon: 'i-lucide-repeat-2',
        children: [
          { kind: 'paragraph', label: 'Paragraph', icon: 'i-lucide-type' },
          {
            kind: 'heading',
            level: 1,
            label: 'Heading 1',
            icon: 'i-lucide-heading-1',
          },
          {
            kind: 'heading',
            level: 2,
            label: 'Heading 2',
            icon: 'i-lucide-heading-2',
          },
          {
            kind: 'heading',
            level: 3,
            label: 'Heading 3',
            icon: 'i-lucide-heading-3',
          },
          {
            kind: 'heading',
            level: 4,
            label: 'Heading 4',
            icon: 'i-lucide-heading-4',
          },
          { kind: 'bulletList', label: 'Bullet List', icon: 'i-lucide-list' },
          {
            kind: 'orderedList',
            label: 'Ordered List',
            icon: 'i-lucide-list-ordered',
          },
          {
            kind: 'blockquote',
            label: 'Blockquote',
            icon: 'i-lucide-text-quote',
          },
          {
            kind: 'codeBlock',
            label: 'Code Block',
            icon: 'i-lucide-square-code',
          },
        ],
      },
      {
        kind: 'clearFormatting',
        pos: selectedNode.pos,
        label: 'Reset formatting',
        icon: 'i-lucide-rotate-ccw',
      },
    ],
    [
      {
        kind: 'duplicate',
        pos: selectedNode.pos,
        label: 'Duplicate',
        icon: 'i-lucide-copy',
      },
      {
        label: 'Copy to clipboard',
        icon: 'i-lucide-clipboard',
        onSelect: async () => {
          const node = editor.state.doc.nodeAt(selectedNode.pos)
          if (node) {
            await navigator.clipboard.writeText(node.textContent)
          }
        },
      },
    ],
    [
      {
        kind: 'moveUp',
        pos: selectedNode.pos,
        label: 'Move up',
        icon: 'i-lucide-arrow-up',
      },
      {
        kind: 'moveDown',
        pos: selectedNode.pos,
        label: 'Move down',
        icon: 'i-lucide-arrow-down',
      },
    ],
    [
      {
        kind: 'delete',
        pos: selectedNode.pos,
        label: 'Delete',
        icon: 'i-lucide-trash',
      },
    ],
  ]
}
