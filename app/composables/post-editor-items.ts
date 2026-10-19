import type { Editor, JSONContent } from '@tiptap/vue-3'
import {
  createBubbleToolbarItems,
  createFixedToolbarItems,
  createSuggestionItems,
  createTranslatedBlockMenuItemTree,
} from '../utils/postEditorItems'

/**
 * The toolbar and menu items of the post editor, with text in the admin
 * language. The arrays are computed, so a language switch updates them.
 * In English they equal the deprecated constants of `postEditorItems.ts`.
 */
export function usePostEditorItems() {
  const { t } = usePlutoI18n()

  const fixedToolbarItems = computed(() => createFixedToolbarItems(t))
  const bubbleToolbarItems = computed(() => createBubbleToolbarItems(t))
  const suggestionItems = computed(() => createSuggestionItems(t))

  function createBlockMenuItemTree(
    editor: Editor,
    selectedNode: { node: JSONContent, pos: number }
  ) {
    return createTranslatedBlockMenuItemTree(t, editor, selectedNode)
  }

  return {
    fixedToolbarItems,
    bubbleToolbarItems,
    suggestionItems,
    createBlockMenuItemTree,
  }
}
