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

/**
 * The fixed toolbar items, in English.
 *
 * @deprecated Kept for third parties. This layer no longer reads it. Use
 * `usePostEditorItems()` for translated items.
 */
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

/**
 * The bubble toolbar items, in English.
 *
 * @deprecated Kept for third parties. This layer no longer reads it. Use
 * `usePostEditorItems()` for translated items.
 */
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

/**
 * The suggestion menu items, in English.
 *
 * @deprecated Kept for third parties. This layer no longer reads it. Use
 * `usePostEditorItems()` for translated items.
 */
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
 * `DropdownMenuItem[][]`. The labels are in English.
 *
 * @deprecated Use `usePostEditorItems().createBlockMenuItemTree`, which
 * translates the labels.
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

/** A translate function: a message key in, the text out. */
export type EditorItemsTranslate = (key: string) => string

// The node types that the block menu names. Each key is a full literal, so
// the locale-file test can see it.
const NODE_TYPE_KEYS: Record<string, string> = {
  paragraph: 'supabase-blog.editor.nodes.paragraph',
  heading: 'supabase-blog.editor.nodes.heading',
  bulletList: 'supabase-blog.editor.nodes.bulletList',
  orderedList: 'supabase-blog.editor.nodes.orderedList',
  listItem: 'supabase-blog.editor.nodes.listItem',
  blockquote: 'supabase-blog.editor.nodes.blockquote',
  codeBlock: 'supabase-blog.editor.nodes.codeBlock',
  image: 'supabase-blog.editor.nodes.image',
}

function headingItems(t: EditorItemsTranslate, levels: (1 | 2 | 3 | 4)[]) {
  const labels = {
    1: t('supabase-blog.editor.heading1'),
    2: t('supabase-blog.editor.heading2'),
    3: t('supabase-blog.editor.heading3'),
    4: t('supabase-blog.editor.heading4'),
  }

  return levels.map((level) => ({
    kind: 'heading' as const,
    level,
    icon: `i-lucide-heading-${level}` as const,
    label: labels[level],
  }))
}

function markItems(t: EditorItemsTranslate) {
  return [
    {
      kind: 'mark' as const,
      mark: 'bold' as const,
      icon: 'i-lucide-bold',
      tooltip: { text: t('supabase-blog.editor.bold') },
    },
    {
      kind: 'mark' as const,
      mark: 'italic' as const,
      icon: 'i-lucide-italic',
      tooltip: { text: t('supabase-blog.editor.italic') },
    },
    {
      kind: 'mark' as const,
      mark: 'underline' as const,
      icon: 'i-lucide-underline',
      tooltip: { text: t('supabase-blog.editor.underline') },
    },
    {
      kind: 'mark' as const,
      mark: 'strike' as const,
      icon: 'i-lucide-strikethrough',
      tooltip: { text: t('supabase-blog.editor.strikethrough') },
    },
    {
      kind: 'mark' as const,
      mark: 'code' as const,
      icon: 'i-lucide-code',
      tooltip: { text: t('supabase-blog.editor.code') },
    },
  ]
}

function linkAndImageItems(t: EditorItemsTranslate) {
  return [
    { slot: 'link' as const, icon: 'i-lucide-link' },
    {
      kind: 'imageUpload' as const,
      icon: 'i-lucide-image',
      tooltip: { text: t('supabase-blog.editor.image') },
    },
  ]
}

/** The translated counterpart of `fixedToolbarItems`. */
export function createFixedToolbarItems(t: EditorItemsTranslate) {
  return [
    [
      {
        kind: 'undo',
        icon: 'i-lucide-undo',
        tooltip: { text: t('supabase-blog.editor.undo') },
      },
      {
        kind: 'redo',
        icon: 'i-lucide-redo',
        tooltip: { text: t('supabase-blog.editor.redo') },
      },
    ],
    [
      {
        icon: 'i-lucide-heading',
        tooltip: { text: t('supabase-blog.editor.headings') },
        content: { align: 'start' },
        items: headingItems(t, [1, 2, 3, 4]),
      },
      {
        icon: 'i-lucide-list',
        tooltip: { text: t('supabase-blog.editor.lists') },
        content: { align: 'start' },
        items: [
          {
            kind: 'bulletList',
            icon: 'i-lucide-list',
            label: t('supabase-blog.editor.bulletList'),
          },
          {
            kind: 'orderedList',
            icon: 'i-lucide-list-ordered',
            label: t('supabase-blog.editor.orderedList'),
          },
        ],
      },
      {
        kind: 'blockquote',
        icon: 'i-lucide-text-quote',
        tooltip: { text: t('supabase-blog.editor.blockquote') },
      },
      {
        kind: 'codeBlock',
        icon: 'i-lucide-square-code',
        tooltip: { text: t('supabase-blog.editor.codeBlock') },
      },
    ],
    markItems(t),
    linkAndImageItems(t),
  ] satisfies EditorToolbarItem<ImageUploadHandlers>[][]
}

/** The translated counterpart of `bubbleToolbarItems`. */
export function createBubbleToolbarItems(t: EditorItemsTranslate) {
  return [
    [
      {
        label: t('supabase-blog.editor.turnInto'),
        trailingIcon: 'i-lucide-chevron-down',
        activeColor: 'neutral',
        activeVariant: 'ghost',
        tooltip: { text: t('supabase-blog.editor.turnInto') },
        content: { align: 'start' },
        ui: { label: 'text-xs' },
        items: [
          { type: 'label', label: t('supabase-blog.editor.turnInto') },
          {
            kind: 'paragraph',
            label: t('supabase-blog.editor.paragraph'),
            icon: 'i-lucide-type',
          },
          ...headingItems(t, [1, 2, 3, 4]),
          {
            kind: 'bulletList',
            icon: 'i-lucide-list',
            label: t('supabase-blog.editor.bulletList'),
          },
          {
            kind: 'orderedList',
            icon: 'i-lucide-list-ordered',
            label: t('supabase-blog.editor.orderedList'),
          },
          {
            kind: 'blockquote',
            icon: 'i-lucide-text-quote',
            label: t('supabase-blog.editor.blockquote'),
          },
          {
            kind: 'codeBlock',
            icon: 'i-lucide-square-code',
            label: t('supabase-blog.editor.codeBlock'),
          },
        ],
      },
    ],
    markItems(t),
    linkAndImageItems(t),
  ] satisfies EditorToolbarItem<ImageUploadHandlers>[][]
}

/** The translated counterpart of `suggestionItems`. */
export function createSuggestionItems(t: EditorItemsTranslate) {
  return [
    [
      { type: 'label', label: t('supabase-blog.editor.style') },
      {
        kind: 'paragraph',
        label: t('supabase-blog.editor.paragraph'),
        icon: 'i-lucide-type',
      },
      ...headingItems(t, [1, 2, 3]),
      {
        kind: 'bulletList',
        label: t('supabase-blog.editor.bulletList'),
        icon: 'i-lucide-list',
      },
      {
        kind: 'orderedList',
        label: t('supabase-blog.editor.numberedList'),
        icon: 'i-lucide-list-ordered',
      },
      {
        kind: 'blockquote',
        label: t('supabase-blog.editor.blockquote'),
        icon: 'i-lucide-text-quote',
      },
      {
        kind: 'codeBlock',
        label: t('supabase-blog.editor.codeBlock'),
        icon: 'i-lucide-square-code',
      },
    ],
    [
      { type: 'label', label: t('supabase-blog.editor.insert') },
      {
        kind: 'imageUpload',
        label: t('supabase-blog.editor.image'),
        icon: 'i-lucide-image',
      },
    ],
  ] satisfies EditorSuggestionMenuItem<ImageUploadHandlers>[][]
}

/** The translated counterpart of `createBlockMenuItemTree`. */
export function createTranslatedBlockMenuItemTree(
  t: EditorItemsTranslate,
  editor: Editor,
  selectedNode: { node: JSONContent, pos: number }
) {
  const nodeType = selectedNode.node.type ?? ''
  const nodeKey = NODE_TYPE_KEYS[nodeType]

  return [
    [
      {
        type: 'label',
        label: nodeKey ? t(nodeKey) : upperFirst(nodeType),
      },
      {
        label: t('supabase-blog.editor.turnInto'),
        icon: 'i-lucide-repeat-2',
        children: [
          {
            kind: 'paragraph',
            label: t('supabase-blog.editor.paragraph'),
            icon: 'i-lucide-type',
          },
          ...headingItems(t, [1, 2, 3, 4]),
          {
            kind: 'bulletList',
            label: t('supabase-blog.editor.bulletList'),
            icon: 'i-lucide-list',
          },
          {
            kind: 'orderedList',
            label: t('supabase-blog.editor.orderedList'),
            icon: 'i-lucide-list-ordered',
          },
          {
            kind: 'blockquote',
            label: t('supabase-blog.editor.blockquote'),
            icon: 'i-lucide-text-quote',
          },
          {
            kind: 'codeBlock',
            label: t('supabase-blog.editor.codeBlock'),
            icon: 'i-lucide-square-code',
          },
        ],
      },
      {
        kind: 'clearFormatting',
        pos: selectedNode.pos,
        label: t('supabase-blog.editor.resetFormatting'),
        icon: 'i-lucide-rotate-ccw',
      },
    ],
    [
      {
        kind: 'duplicate',
        pos: selectedNode.pos,
        label: t('supabase-blog.editor.duplicate'),
        icon: 'i-lucide-copy',
      },
      {
        label: t('supabase-blog.editor.copyToClipboard'),
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
        label: t('supabase-blog.editor.moveUp'),
        icon: 'i-lucide-arrow-up',
      },
      {
        kind: 'moveDown',
        pos: selectedNode.pos,
        label: t('supabase-blog.editor.moveDown'),
        icon: 'i-lucide-arrow-down',
      },
    ],
    [
      {
        kind: 'delete',
        pos: selectedNode.pos,
        label: t('pluto.common.delete'),
        icon: 'i-lucide-trash',
      },
    ],
  ]
}
