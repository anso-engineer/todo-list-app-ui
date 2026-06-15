// TiptapEditor.jsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './TipTapEditor.css';

export default function TiptapEditor({ value, onChange, error }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    // allow empty string; treat null/undefined as ''
    const incoming = value ?? '';
    const current = editor.getHTML();

    // avoid cursor jumps & feedback loops
    if (incoming !== current) {
      editor.commands.setContent(incoming, false); // false => don't emit onUpdate
    }
  }, [value, editor]);

  const addBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const addOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const addBold = () => editor?.chain().focus().toggleBold().run();
  const addItalic = () => editor?.chain().focus().toggleItalic().run();

  return (
      <div className="mb-3">
        <div className="d-flex gap-2 mb-2">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addBold}>Bold</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addItalic}>Italic</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addBulletList}>• List</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addOrderedList}>1. List</button>
        </div>

          <div className={`tiptap-container ${error ? 'is-invalid' : ''}`}>
              <EditorContent editor={editor} />
          </div>

        {error && <div className="invalid-feedback d-block">{error.message}</div>}
      </div>
  );
}