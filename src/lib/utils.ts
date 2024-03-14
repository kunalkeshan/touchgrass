import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseISOString(s: string) {
	const dateString = `${s}T00:00:00.000Z`;
	const b = dateString.split(/\D+/).map((n) => parseInt(n, 10));
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export const dateFormatterAfterISOParse = (date: Date) => {
	return new Intl.DateTimeFormat('en-IN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
};

export function randomColor() {
	const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	return randomColor;
}
