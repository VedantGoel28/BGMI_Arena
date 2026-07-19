type ClassValue = string | undefined | null | false;

export const cn = (...classes: ClassValue[]): string => classes.filter(Boolean).join(' ');
