/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
