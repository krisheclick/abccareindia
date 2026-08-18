declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Swiper exposes these package subpaths as CSS files without TypeScript
// declaration files. Declaring the side-effect imports keeps strict module
// checking enabled while allowing Swiper's styles to be imported normally.
declare module 'swiper/css';
declare module 'swiper/css/autoplay';
declare module 'swiper/css/free-mode';
declare module 'swiper/css/navigation';

declare module 'wowjs';
