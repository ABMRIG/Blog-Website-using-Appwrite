import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "", labelClassName="" }) {
  return (
    <div className="w-full text-white">
      
      {label && <label className={`inline-block mb-1 pl-1 ${labelClassName}`}>{label}</label>}

      {/* The <Controller/> tag is responsible for wraping external elemets like RTE to get integrated with React-Hook-Form since we don't get ref or name attributes for external elements */}
      <Controller
        name={name || "content"}
        // the value "control" (right-side) is the parent that wants the control of RTE.jsx

        // the variable "control" hands over the control of this .jsx to the parent component
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
                apiKey: import.meta.env.VITE_TINYMCE_API_KEY,
                selector: 'textarea', // Your selector here
                skin: 'oxide-dark',    // Applies the dark skin
                content_css: 'dark',    // Applies the dark content styles
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                    'undo redo | blocks fontfamily fontsize forecolor bold italic underline | strikethrough link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }, html body { overflow: hidden; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
