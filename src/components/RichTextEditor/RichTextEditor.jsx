import React, { useState, useEffect, useRef } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState, convertToRaw,convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import './styleSheet/RichTextEditor.css'
import PropTypes from 'prop-types'
import ContentGrayFrame from '../ContentGrayFrame/ContentGrayFrame'

function RichTextEditor({ value, onChangeValue,  status, containerStyles, invalidMessage, disabled }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [valueStatus, setValueStatus] = useState(true)
  const [initialValue, setInitialValue] = useState(value || null)
  const initialValueSet = useRef(false)

  useEffect(() => {
    if (!initialValue && value) {
      setInitialValue(value)
      initialValueSet.current = true
    }
    if (value === initialValue) {
      setValueStatus(true)
    }
  }, [value, initialValue])

  useEffect(() => {
    if (value && valueStatus) {
      let parsedValue
      try {
        parsedValue = JSON.parse(value)
      } catch {
        parsedValue = null
      }
      if (parsedValue && typeof parsedValue === 'object') {
        setEditorState(EditorState.createWithContent(convertFromRaw(parsedValue)))
      } else {
        const contentState = ContentState.createFromText(value)
        setEditorState(EditorState.createWithContent(contentState))
      }
      setValueStatus(false)
    }
  }, [value, valueStatus])

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    onChangeValue(JSON.stringify(convertToRaw(editorState.getCurrentContent())), editorState.getCurrentContent().getPlainText())
  }

  return (
    <ContentGrayFrame style={containerStyles}>
      <div className="editor-box">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName grayScrollBar"
          onEditorStateChange={onEditorStateChange}
          placeholder={'รายละเอียด'}
          toolbar={{
            options: ['inline', 'remove', 'colorPicker', 'list', 'textAlign'],
            inline: {
              inDropdown: false,
              className: 'inlineClassName',
              component: undefined,
              dropdownClassName: undefined,
              options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
            },
          }}
          readOnly={disabled}
        />
      </div>
      {invalidMessage && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </ContentGrayFrame>
  )
}

RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  containerStyles: PropTypes.object,
  invalidMessage: PropTypes.string,
}

export default RichTextEditor
