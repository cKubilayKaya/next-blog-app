import { useState, useEffect } from "react";
import * as Yup from "yup";

const useForm = (initialData, validationSchema) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading durumu burada

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    const fieldValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    if (touched[name]) {
      validateField(name, fieldValue);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const validateField = async (name, value) => {
    try {
      const fieldSchema = Yup.reach(validationSchema, name);
      await fieldSchema.validate(value);

      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error.message,
      }));
    }
  };

  const validateForm = async () => {
    try {
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (callback) => {
    setIsSubmitting(true);
    setLoading(true);
    const isValid = await validateForm();

    if (isValid) {
      if (callback && typeof callback === "function") {
        await callback(formData);
      }
    }

    setIsSubmitting(false);
    setLoading(false);
    return isValid;
  };

  useEffect(() => {
    const checkFormValidity = async () => {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        setIsFormValid(true);
      } catch (error) {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [formData, validationSchema]);

  return {
    formData,
    setFormData,
    errors,
    touched,
    isSubmitting,
    isFormValid,
    loading,
    handleChange,
    handleFocus,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
