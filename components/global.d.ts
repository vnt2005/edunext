// Ambient TypeScript declarations for standalone React components
// Enables full typing in VS Code without requiring npm install in WordPress theme

declare namespace React {
  export type ReactNode = any;
  export type Key = string | number;
  export interface CSSProperties {
    [key: string]: any;
  }
}

declare module "react" {
  export type ReactNode = any;
  export type Key = string | number;
  export interface CSSProperties {
    [key: string]: any;
  }
  export function createElement(...args: any[]): any;
  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "framer-motion" {
  export type Variants = {
    [key: string]: any;
  };
  export type Transition = {
    [key: string]: any;
  };
  export const motion: {
    div: any;
    h2: any;
    h4: any;
    p: any;
    span: any;
    section: any;
    svg: any;
    [key: string]: any;
  };
}

declare module "lucide-react" {
  export const ArrowRight: any;
}

declare namespace JSX {
  interface Element {
    [key: string]: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

