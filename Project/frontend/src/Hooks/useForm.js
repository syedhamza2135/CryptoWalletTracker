import { useState, useCallback, useEffect } from 'react';
import { validateForm, isFormValid } from '../Utils/validation.js';

/**
 * Hook for managing form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationSchema - Validation schema { fieldName: [rules] }
 * @returns {Object} Form state and methods
 */
const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form when values change
  useEffect(() => {
    const validationErrors = validateForm(values, validationSchema);
    setErrors(validationErrors);
  }, [values, validationSchema]);

  // Handle input changes
  const handleChange = useCallback((field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  // Handle input blur (mark as touched)
  const handleBlur = useCallback((field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = validateForm(values, validationSchema);
    setErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      try {
        await onSubmit(values);
      } catch (error) {
        // Handle submission error
        console.error('Form submission error:', error);
      }
    }

    setIsSubmitting(false);
  }, [values, validationSchema]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set specific field value
  const setFieldValue = useCallback((field, value) => {
    handleChange(field, value);
  }, [handleChange]);

  // Set multiple field values
  const updateValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Get field props for easy binding
  const getFieldProps = useCallback((field) => ({
    value: values[field] || '',
    onChange: (e) => handleChange(field, e.target.value),
    onBlur: () => handleBlur(field),
    error: touched[field] && errors[field],
    touched: touched[field]
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isValid: isFormValid(errors),

    // Methods
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    updateValues,
    getFieldProps
  };
};

export default useForm;