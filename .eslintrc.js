module.exports = {
    root: true,
    extends: 'next', // Use Next.js ESLint rules as the base
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  };
  