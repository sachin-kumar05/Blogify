import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

/*
In simple words:
TinyMCE → gives you a rich text editor (bold, images, lists, etc.)
react-hook-form Controller → connects this editor to your form state
This component makes the editor behave like a normal <input />


🔹 Editor (TinyMCE React wrapper)
This is TinyMCE, a full-featured WYSIWYG editor
It does NOT behave like a normal input
It manages its own internal state

🔹 Controller
react-hook-form cannot directly register TinyMCE
So Controller acts as a bridge between:
TinyMCE (controlled by TinyMCE)
react-hook-form (controlled by form state)
👉 Without Controller, form validation & submission won’t work correctly.
*/ 

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>
        {label}  
      </label>}

      <Controller 
        name={name || "Content"}
        control={control}
        render={({field: {onChange}}) => (
          <Editor 
            initialValue={defaultValue}
            init={{
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
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: 
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}    //Editor → onEditorChange → RHF onChange → form state
          />
        )}
      />
    </div>
  )
}