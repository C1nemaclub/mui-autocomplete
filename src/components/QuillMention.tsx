import 'quill-mention';
import mention from 'quill-mention';
import { useState, type FC } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/mention', mention);

interface QuillMentionProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

import { forwardRef } from 'react';

const QuillMention: FC<QuillMentionProps> = forwardRef<
  ReactQuill,
  QuillMentionProps
>(({ value, onChange, label }, ref) => {
  // const quillRef = useRef<ReactQuill | null>(null);
  // const [editorValue, setEditorValue] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <ReactQuill
      // ref={(instance) => {
      //   quillRef.current = instance;
      //   if (typeof ref === 'function') {
      //     ref(instance);
      //   } else if (ref) {
      //     (ref as React.MutableRefObject<ReactQuill | null>).current = instance;
      //   }
      // }}
      ref={ref}
      value={!value ? label : value}
      onChange={(value) => onChange(value)}
      formats={['mention']}
      modules={{
        toolbar: false,
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ['@', '#'],
          listItemClass: 'mention-list-item',
          mentionContainerClass: 'mention-container',
          mentionListClass: 'mention-list',
          showDenotationChar: false,
        },
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={focused ? 'focused' : ''}
      style={{
        width: '100%',
        minHeight: 54,
        height: '100%',
      }}
    />
  );
});

export default QuillMention;
