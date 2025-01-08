import { CalendarMonth } from '@mui/icons-material';
import { Box, ClickAwayListener, IconButton, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, generateHTML, getText, useEditor } from '@tiptap/react';
import { format } from 'date-fns';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  setMentionHandler: Dispatch<
    SetStateAction<((value: string) => void | null) | undefined>
  >;
  type?: 'mention' | 'date';
  label?: string;
}

const TipTapEditor: FC<TipTapEditorProps> = ({
  value,
  onChange,
  setMentionHandler,
  type = 'date',
  label,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const addMention = (text: string) => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent(
        `<span data-type="mention" data-denotation-char="#" data-label="${text}"  data-id="${text}"></span>`
      )
      .run();
  };

  const editor = useEditor({
    extensions: [
      Text,
      Document,
      Paragraph,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        deleteTriggerWithBackspace: true,
        renderHTML: ({ node }) => {
          return node.attrs.id ?? node.attrs.label;
        },
        // renderHTML({ options, node }) {
        //   console.log(options, node);

        //   return [
        //     'span',
        //     mergeAttributes(options.HTMLAttributes, {
        //       class: 'mention',
        //     }),
        //     // [
        //     //   'img',
        //     //   {
        //     //     src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
        //     //     class: 'mention-image',
        //     //   },
        //     // ],
        //     `
        //     ${options.suggestion.char}
        //     ${node.attrs.label ?? node.attrs.id}`,
        //   ];
        // },
      }),
    ],
    content:
      '<p>hello World <span data-type="mention" class="mention" data-id="Sam" data-label="Sam">Sam</span></p><p>Also this is more TEXT !!! <span data-type="mention" class="mention" data-id="Sam" data-label="Sam">Sam</span></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setMentionHandler(() => addMention);
    },
  });

  const addDate = (date: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(date).run();
  };

  const renderDateMarkup = () => {
    return (
      <>
        <IconButton
          onClick={() => setDatePickerOpen((prev) => !prev)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            zIndex: 1,
          }}>
          <CalendarMonth />
        </IconButton>
        {datePickerOpen && (
          <ClickAwayListener onClickAway={() => setDatePickerOpen(false)}>
            <Box sx={{ position: 'absolute', right: 10, top: 50, zIndex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs='desktop'
                  openTo='day'
                  value={new Date()}
                  onChange={(newValue) => {
                    if (!newValue) return;
                    setDatePickerOpen(false);
                    addDate(format(newValue, 'dd/MM/yyyy'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </ClickAwayListener>
        )}
      </>
    );
  };

  // useEffect(() => {
  //   if (editor && editor.getHTML() !== value) {
  //     editor.commands.setContent(value);
  //     // editor.commands.clearContent();
  //   }
  // }, [value, editor]);

  if (!editor) return null;

  const getPlaceholderClass = () => {
    let classes = 'tiptap placeholder';
    if (editor.isEmpty) {
      classes = classes.concat(' empty');
    } else {
      classes = classes.concat(' has-value');
    }
    if (editor.isFocused) {
      classes = classes.concat(' focused');
    }
    return classes;
  };

  // const serializedText = editor.getText({
  //   blockSeparator: 'x',
  //   textSerializers: {
  //     mention: ({ node }: { node: any }) => {
  //       return `{{${node.attrs.id}}}`;
  //     },
  //   },s
  // });

  // function serializedTextToJson(input: string): DocNode {
  //   const mentionPattern = /{{(\w+)\.(\w+)}}/;
  //   const match = mentionPattern.exec(input);

  //   if (match && match[1] === match[2]) {
  //     const mentionNode: MentionNode = {
  //       type: 'mention',
  //       attrs: {
  //         id: match[1],
  //         label: match[2],
  //       },
  //     };

  //     const paragraphNode: ParagraphNode = {
  //       type: 'paragraph',
  //       content: [mentionNode],
  //     };

  //     const docNode: DocNode = {
  //       type: 'doc',
  //       content: [paragraphNode],
  //     };

  //     return docNode;
  //   }

  //   throw new Error('Invalid input format');
  // }

  const serialized = getText(editor.state.doc, {
    textSerializers: {
      mention: ({ node }) => {
        return `{{${node.attrs.id}.${node.attrs.label}}}`;
      },
    },
  });

  const getHTML = generateHTML(editor.getJSON(), [
    Text,
    Document,
    Paragraph,
    Mention.configure({
      HTMLAttributes: {
        class: 'mention',
      },
      deleteTriggerWithBackspace: true,
      renderHTML: ({ node }) => {
        return node.attrs.id ?? node.attrs.label;
      },
    }),
  ]);

  return (
    <Box
      position={'relative'}
      sx={{
        '--primary-color': ({ palette }) => palette.primary.main,
      }}>
      <EditorContent editor={editor} className='editor-content' />
      {type === 'date' && renderDateMarkup()}
      {label && (
        <Box
          sx={{
            color: '#a1a1a1',
            pointerEvents: 'none',
            fontWeight: 500,
          }}
          className={getPlaceholderClass()}>
          {label}
        </Box>
      )}
      <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
      <pre>
        {JSON.stringify(
          editor.getText({
            blockSeparator: '',
            textSerializers: {
              mention: ({ node }) => {
                return `{{${node.attrs.id}.${node.attrs.label}}}`;
              },
            },
          }),
          null,
          2
        )}
      </pre>
      <pre>{JSON.stringify({ serialized }, null, 2)}</pre>
      <pre>{JSON.stringify({ getHTML }, null, 2)}</pre>
    </Box>
  );
};

export default TipTapEditor;
