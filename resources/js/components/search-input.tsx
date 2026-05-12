import { CloseButton, Input, InputGroup } from '@chakra-ui/react';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface SearchInputProps {
    placeholder?: string;
    debounce?: number;
    queryKey?: string;
}

export default function SearchInput({
    placeholder = 'Cari postingan...',
    debounce = 300,
    queryKey = 'search',
}: SearchInputProps) {
    const { url } = usePage();

    const currentSearch = useMemo(() => {
        const query = url.split('?')[1] ?? '';

        return new URLSearchParams(query).get(queryKey) ?? '';
    }, [queryKey, url]);

    const [value, setValue] = useState(() => currentSearch);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const previousValue = useRef(currentSearch);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const trimmed = value.trim();

            // Prevent unnecessary request
            if (trimmed === previousValue.current) {
                return;
            }

            previousValue.current = trimmed;

            const [pathname] = url.split('?');

            const params = new URLSearchParams(url.split('?')[1] ?? '');

            if (trimmed) {
                params.set(queryKey, trimmed);
            } else {
                params.delete(queryKey);
            }

            const query = params.toString();

            router.get(
                query ? `${pathname}?${query}` : pathname,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,

                    replace: true,

                    only: ['posts'],

                    reset: ['posts'],
                },
            );
        }, debounce);

        return () => clearTimeout(timeout);
    }, [debounce, queryKey, url, value]);

    const endElement = value ? (
        <CloseButton
            size="xs"
            me="-2"
            onClick={() => {
                setValue('');

                inputRef.current?.focus();
            }}
        />
    ) : undefined;

    return (
        <InputGroup endElement={endElement}>
            <Input
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
            />
        </InputGroup>
    );
}
