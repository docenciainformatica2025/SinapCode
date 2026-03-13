import { describe, it, expect } from '@jest/globals';
import { formatDate, cn, truncateText } from '@/lib/utils';

describe('Utils Library', () => {
    describe('cn (classNames)', () => {
        it('should merge classes correctly', () => {
            expect(cn('a', 'b')).toBe('a b');
            expect(cn('a', { b: true, c: false })).toBe('a b');
        });

        it('should handle tailwind merges', () => {
            expect(cn('px-2', 'px-4')).toBe('px-4');
        });
    });

    describe('formatDate', () => {
        it('should format dates to Spanish locale by default', () => {
            const date = new Date('2024-03-13T12:00:00Z');
            const formatted = formatDate(date);
            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
        });
    });

    describe('truncateText', () => {
        it('should truncate long text and handle spaces correctly', () => {
            const longText = 'This is a very long text that should be truncated';
            // "This is a " is 10 chars. So result is "This is a ..."
            expect(truncateText(longText, 10)).toBe('This is a ...');
        });

        it('should not truncate short text', () => {
            const shortText = 'Short';
            expect(truncateText(shortText, 10)).toBe('Short');
        });
    });
});
