import React from 'react'
import FormItem from '../FormItem/FormItem'
import TextArea from '../TextArea/TextArea'
import ContentGrayFrame from '../ContentGrayFrame/ContentGrayFrame'
import PropTypes from 'prop-types'

function TextAreaBox({ title, id, value, placeholder, onChange, isInvalidMessage, containerStyle, disabled }) {
  return (
    <ContentGrayFrame style={containerStyle}>
      <FormItem label={title} htmlFor={id}>
        <TextArea
          value={value}
          isInvalid={isInvalidMessage ? true : false}
          isInvalidMessage={isInvalidMessage}
          placeholder={placeholder}
          id={id}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
        />
      </FormItem>
    </ContentGrayFrame>
  )
}

TextAreaBox.propTypes = {
  title: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isInvalidMessage: PropTypes.string,
  containerStyle: PropTypes.object,
}

TextAreaBox.defaultProps = {
  title: '',
  id: '',
  value: '',
  placeholder: 'รายละเอียด',
  onChange: () => {},
  isInvalidMessage: '',
}

export default TextAreaBox
