import { check } from 'express-validator';

export const verifyRegisterdata = () => {
  return [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long')
      .isAlpha()
      .withMessage('Name must contain only alphabetic characters'),
    check('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),
    check('phone')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any', { strictMode: false })
      .withMessage('Invalid phone number format')
      .custom((value) => {
        const uniqueDigits = new Set(value.replace(/\D/g, ''));
        return uniqueDigits.size >= 4;
      })
      .withMessage('Phone number must contain at least 4 different digits')
  ];
};
