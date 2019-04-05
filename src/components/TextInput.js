import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  submitFunction,
  label,
  value,
  onChangeFunction,
  inputType
}) => (
  <form onSubmit={submitFunction}>
    <label htmlFor={label}>
      {label}
      <input
        type={inputType}
        name={label}
        value={value}
        onChange={onChangeFunction}
      />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

TextInput.propTypes = {
  submitFunction: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFunction: PropTypes.func.isRequired,
  inputType: PropTypes.string
};

TextInput.defaultProps = {
  inputType: 'text'
};

export default TextInput;
