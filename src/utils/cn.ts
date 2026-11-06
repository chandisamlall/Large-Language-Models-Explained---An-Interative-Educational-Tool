/** Joins truthy class name fragments together. A tiny stand-in for `clsx`
 *  so the project doesn't need an extra dependency for this alone. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
