import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichText = ({ value, setValue }) => {
  const quillRef = useRef();

  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];

      // regex to test if file is an image
      if (/^image\//.test(file.type)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          // Insert the image into the Quill editor
          editor.insertEmbed(editor.getSelection(), "image", imageUrl);
        };
        reader.readAsDataURL(file);
      } else {
        console.log("You could only upload images.");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <ReactQuill
      theme="snow"
      ref={quillRef}
      value={value}
      modules={modules}
      onChange={setValue}
    />
  );
};

export default RichText;
