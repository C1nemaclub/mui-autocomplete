import { Mention, MentionBlot } from 'quill-mention';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Quill } from 'react-quill';
// import 'quill-mention/autoregister';

Quill.register({ 'blots/mention': MentionBlot, 'modules/mention': Mention });

async function suggestPeople(searchTerm) {
  const allPeople = [
    {
      id: 1,
      value: 'Fredrik Sundqvist',
    },
    {
      id: 2,
      value: 'Patrik Sjölin',
    },
  ];
  return allPeople.filter((person) => person.value.includes(searchTerm));
}

// Editor is an uncontrolled React component
const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
    }: {
      readOnly: boolean;
      defaultValue: any;
      onTextChange: any;
      onSelectionChange: any;
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        formats: ['mention'],
        modules: {
          toolbar: false,
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['@', '#'],
            source: async function (searchTerm, renderList) {
              console.log(searchTerm, 'Xx');

              const matchedPeople = await suggestPeople(searchTerm);
              renderList(matchedPeople);
            },
          },
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
