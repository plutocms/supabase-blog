import type { Editor } from '@tiptap/vue-3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { usePostEditorItems } from '../app/composables/post-editor-items'
import {
  bubbleToolbarItems,
  createBlockMenuItemTree,
  fixedToolbarItems,
  suggestionItems,
} from '../app/utils/postEditorItems'
import { createI18nStub } from './fixtures/i18n-stub'

function plain(value: unknown) {
  return JSON.parse(JSON.stringify(value))
}

// In English, the translated items must equal the deprecated constants. This
// keeps the English editor text byte for byte the same as before.
describe('usePostEditorItems in English', () => {
  beforeEach(() => {
    vi.stubGlobal('computed', computed)
    vi.stubGlobal('usePlutoI18n', () => createI18nStub())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('gives the fixed toolbar of the deprecated constant', () => {
    expect(usePostEditorItems().fixedToolbarItems.value).toEqual(
      fixedToolbarItems
    )
  })

  it('gives the bubble toolbar of the deprecated constant', () => {
    expect(usePostEditorItems().bubbleToolbarItems.value).toEqual(
      bubbleToolbarItems
    )
  })

  it('gives the suggestion menu of the deprecated constant', () => {
    expect(usePostEditorItems().suggestionItems.value).toEqual(suggestionItems)
  })

  it('gives the block menu of the deprecated function', () => {
    const editor = {} as Editor

    for (const type of [
      'paragraph',
      'heading',
      'bulletList',
      'orderedList',
      'listItem',
      'blockquote',
      'codeBlock',
      'image',
      'taskList',
    ]) {
      const selected = { node: { type }, pos: 3 }

      // A JSON round trip drops the `onSelect` function, which differs.
      expect(
        plain(usePostEditorItems().createBlockMenuItemTree(editor, selected)),
        type
      ).toEqual(plain(createBlockMenuItemTree(editor, selected)))
    }
  })
})
