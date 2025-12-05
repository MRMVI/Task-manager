import { reactive } from 'vue';

/**
 * Composable for form validation
 * @param {Object} form - Reactive form object with field values
 * @param {Object} rules - Validation rules object
 * @returns {Object} - errors object and validate function
 * 
 * Example usage:
 * const { errors, validate } = useFormValidation(form, {
 *   email: [
 *     { check: () => form.email.trim(), message: 'Email is required.' },
 *     { check: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), message: 'Please enter a valid email.' }
 *   ],
 *   password: [
 *     { check: () => form.password.trim(), message: 'Password is required.' },
 *     { check: () => form.password.length >= 6, message: 'Password must be at least 6 characters.' }
 *   ]
 * });
 */
export function useFormValidation(form, rules) {
  // Create errors object with same keys as rules
  const errors = reactive(
    Object.keys(rules).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {})
  );

  /**
   * Validate form against all rules
   * @returns {boolean} - true if all validations pass
   */
  const validate = () => {
    // Clear all errors
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });

    let isValid = true;

    // Check each field's validation rules
    Object.keys(rules).forEach(fieldName => {
      const fieldRules = rules[fieldName];

      // Rules can be an array of rule objects or a single rule object
      const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules];

      // Check each rule for this field
      for (const rule of rulesArray) {
        if (!rule.check()) {
          errors[fieldName] = rule.message;
          isValid = false;
          break; // Stop on first error for this field
        }
      }
    });

    return isValid;
  };

  return {
    errors,
    validate,
  };
}
