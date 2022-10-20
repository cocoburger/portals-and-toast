// module.exports = {
//   env: {
//     browser: true,
//     node: true,
//   },
//   extends: ['eslint:recommended', 'plugin:react/recommended'],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 13,
//     sourceType: 'module',
//   },
//   plugins: ['react'],
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
//   rules: {
//     // General
//     'no-unused-vars': 'off', // 사용하지않는 변수 error처리 하겠다.
//     'no-console': 'off', // 콘솔로그를 사용하수 있게 꺼놓겠다.
//     // React
//     'react/react-in-jsx-scope': 'off',
//   },
// };

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  plugins: ['import', 'react'],
  extends: ['react-app'],
  rules: {
    // General
    'no-unused-vars': 'off', // 사용하지않는 변수 error처리 하겠다.
    'no-console': 'off', // 콘솔로그를 사용하수 있게 꺼놓겠다.
    // React
    'react/react-in-jsx-scope': 'off',
    'no-lone-blocks': 'off', //block {} 처리 최상위 수준이나 다른 블록에서 불필요하고 혼동 될 수있는 블록을 제거하는 것을 목표로합니다
  },
};
