import { CalendarMonth } from '@mui/icons-material';
import { Box, ClickAwayListener, IconButton, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Document from '@tiptap/extension-document';
import Mention from '@tiptap/extension-mention';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import {
  EditorContent,
  generateHTML,
  mergeAttributes,
  Node,
  useEditor,
} from '@tiptap/react';
import { format } from 'date-fns';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';

const IconNode = Node.create({
  name: 'iconNode',
  inline: true,
  group: 'inline',
  atom: true,
  addAttributes() {
    return {
      iconType: {
        default: 'defaultIcon',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'icon-node',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['icon-node', mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('span');
      dom.contentEditable = 'false';
      dom.innerText = 'HELLOS';
      return { dom };
    };
  },
});

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

  const transformTextToHTML = (text: string) => {
    const mentionPattern = /{{(\w+)\.(\w+)}}/g;
    const paragraphs = text.split('\n').map((paragraph) => {
      const parts = paragraph.split(mentionPattern);

      const content = parts
        .map((part, index) => {
          if (index % 3 === 0) {
            return part ? { type: 'text', text: part } : undefined;
          } else if (index % 3 === 1) {
            return {
              type: 'mention',
              attrs: { id: part, label: parts[index + 1] },
            };
          }
          return undefined;
        })
        .filter(
          (item): item is Exclude<typeof item, undefined> => item !== undefined
        );

      return {
        type: 'paragraph',
        content,
      };
    });

    const json = {
      type: 'doc',
      content: paragraphs.filter((paragraph) => paragraph.content.length > 0),
    };

    return generateHTML(json, [Text, Document, Paragraph, Mention]);
  };

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
      IconNode,
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
    // iconComponents: {
    //   defaultIcon: ImportContactsTwoTone,
    //   customIcon: ImportContacts,
    // },
    content: transformTextToHTML(value),
    onUpdate: ({ editor }) => {
      const textContent = editor.getText({
        textSerializers: {
          mention: ({ node }) => {
            return `{{${node.attrs.id}.${node.attrs.label}}}`;
          },
        },
      });
      // onChange(editor.getHTML());
      onChange(textContent);
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

  const insertIcon = (iconType) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'iconNode',
          attrs: { iconType },
        })
        .run();
    }
  };

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
    </Box>
  );
};

export default TipTapEditor;
