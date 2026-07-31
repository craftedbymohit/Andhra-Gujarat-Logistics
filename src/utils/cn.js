/** Tiny class-name joiner: skips falsy values so conditionals stay inline. */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
