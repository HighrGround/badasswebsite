import React from "react";
import PropTypes from "prop-types"; // Import PropTypes to check prop types

class SubmitButton extends React.Component {
  render() {
    return (
      <div className="SubmitButton">
        <button
          className='btn'
          disabled={this.props.disabled}
          onClick={this.props.onClick} // No need to wrap this.props.onClick in another function
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}

// Define prop types for SubmitButton
SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // Ensure onClick is a function
  disabled: PropTypes.bool
};

// Provide default props
SubmitButton.defaultProps = {
  disabled: false
};

export default SubmitButton;
