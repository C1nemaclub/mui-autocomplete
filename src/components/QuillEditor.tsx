import { Button, Stack } from '@mui/material';
import Delta from 'quill-delta';
import { Mention, MentionBlot } from 'quill-mention';
import 'quill-mention/autoregister';
import { useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor';

Quill.register({ 'blots/mention': MentionBlot, 'modules/mention': Mention });

// Define a custom 'border' format
const Inline = Quill.import('blots/inline');

class BorderBlot extends Inline {
  static create(value) {
    const node = super.create();
    node.style.border = value || '1px solid black'; // Default border style
    node.style.padding = '2px';
    // node.style.pointerEvents = 'none';
    node.style.cursor = 'pointer'; // Make it look clickable
    node.style.wordBreak = 'break-all';
    node.style.whiteSpace = 'normal';

    node.style.contentEditable = false;
    node.setAttribute('contenteditable', 'false'); // Make it uneditable

    // Add a click event listener
    node.addEventListener('click', () => {
      const blot = Quill.find(node); // Get the Blot instance
      if (blot) {
        blot.remove(); // Remove the blot
      }
    });
    return node;
  }

  static formats(node) {
    return node.style.border;
  }

  optimize(context) {
    // Dont merge the border format with other formats
    this.format('border', this.statics.formats(this.domNode));
  }
}

BorderBlot.blotName = 'border';
BorderBlot.tagName = 'span';
Quill.register(BorderBlot);

const initialContent = new Delta()
  .insert('Hello')
  .insert('\n', { header: 1 })
  .insert('Some ')
  .insert('initial', { bold: true })
  .insert(' ')
  .insert('content', { underline: true })
  .insert(' ')
  .insert('with a border', { border: '2px dashed blue' }) // Add custom border format
  .insert('with a border', { border: '2px dashed blue' }) // Add custom border format
  .insert('Hello')
  .insert('\n');

const initialDelta: Delta = {
  ops: [
    {
      insert: 'Hello\nSome initial content ',
    },
    {
      attributes: {
        border: '2px dashed blue',
      },
      insert: 'I have a border!',
    },
    {
      insert: 'HelloExtradWDdsdadas ',
    },
    {
      attributes: {
        border: '2px dashed blue',
      },
      insert: 'I Also have  a border!!',
    },
  ],
};

const QuillEditor = () => {
  const refQuill = useRef<ReactQuill | null>(null);
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const [editorContent, setEditorContent] = useState<Delta>(initialDelta);

  const handleChange = (value: Delta) => {
    // console.log(value, 'value');
    setEditorContent(value);
  };

  const quillRef = useRef();

  const getPlainText = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const delta = editor.getContents();
      let plainText = '';

      // Iterate over each operation in the delta
      delta.ops.forEach((op) => {
        if (op.attributes?.border) {
          // If it's a bordered text, wrap it in {{bordered-text}}
          plainText += `{{${op.insert}}}`.replace('{{ }}', '');
        } else {
          // Otherwise, just append the regular text
          plainText += op.insert;
        }
      });

      console.log(plainText);
      return plainText;
    }
    return '';
  };
  const plainText = getPlainText();

  const addBorderedTextToQuill = (value: string) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    // Get the current selection (cursor position)
    const range = editor.getSelection();
    if (!range) return; // No selection (cursor not placed)

    // Insert bordered text and a non-bordered space between them
    editor.insertText(range.index, ` ${value} `, 'border', '2px dashed blue');
    editor.insertText(range.index + value.length + 2, ' ', 'border', 'none'); // Insert a space after the bordered text

    console.log(editor.getContents());

    // Optionally, update the editor content state
    setEditorContent(editor.getContents());
  };

  return (
    <Stack gap={1}>
      <ReactQuill
        ref={quillRef}
        value={editorContent} // Controlled value
        onChange={handleChange} // On change handler
        defaultValue={initialContent}
        readOnly={false}
        modules={{
          toolbar: false,
          // mention: {
          //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          //   mentionDenotationChars: ['@'],
          //   source: function (searchTerm, renderList) {
          //     const values = ['Sam', 'Samantha', 'Sammy'];
          //     if (searchTerm.length === 0) {
          //       renderList(values, searchTerm);
          //     } else {
          //       const matches = [];
          //       for (let i = 0; i < values.length; i++)
          //         if (
          //           ~values[i].toLowerCase().indexOf(searchTerm.toLowerCase())
          //         )
          //           matches.push(values[i]);
          //       renderList(matches, searchTerm);
          //     }
          //   },
          // },
        }}
        formats={['border', 'mentiion']} // Allow only the 'border' format
      />
      {/* <div>
        <h3>Editor Content (Delta Format):</h3>
        <pre>{JSON.stringify(editorContent, null, 2)}</pre>
      </div>
      <div>
        <h3>Plain Text Output:</h3>
        <pre>{plainText}</pre>
      </div> */}
      <Editor
        ref={refQuill}
        readOnly={readOnly}
        // defaultValue={new Delta()
        //   .insert('Hello')
        //   .insert('\n', { header: 1 })
        //   .insert('Some ')
        //   .insert('initial', { bold: true })
        //   .insert(' ')
        //   .insert('content', { underline: true })
        //   .insert('\n')}
        defaultValue={initialContent}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      <Stack
        direction='row'
        gap={1}
        width='100%'
        justifyContent={'center'}
        mb={2}>
        {['Sam', 'Samantha', 'Sammy'].map((item) => {
          return (
            <Button
              key={item}
              variant='outlined'
              onClick={() => addBorderedTextToQuill(item)}>
              {item}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default QuillEditor;
