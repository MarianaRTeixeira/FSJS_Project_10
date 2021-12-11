import React from 'react';

const Form = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

//Submit function
  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

//cancel function 
  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
    {/* display the validations errors */}
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className='pad-bottom'>
          <button className='button' type='submit'>{submitButtonText}</button>
          <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );

//Error display function
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;
  if (errors.length) {
    errorsDisplay = (
      <div className='validation--errors'>
        <h2 className='validation--errors--label'>Validation errors</h2>
        <div className='validation-errors'>
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  return errorsDisplay;
  }
}

export default Form;