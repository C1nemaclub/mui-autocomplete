import { useEffect, useRef } from 'react';

export default function Contenteditable(props) {
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current.textContent !== props.value) {
      contentEditableRef.current.textContent = props.value;
    }
  }, []);

  return (
    <div
      contentEditable='true'
      ref={contentEditableRef}
      onInput={(event) => {
        props.onChange(event.target.textContent);
      }}
    />
  );
}
