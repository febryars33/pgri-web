// resources/js/components/ui/prose.tsx

import { Box } from '@chakra-ui/react'
import DOMPurify from 'isomorphic-dompurify'

interface ProseProps {
    content?: string | null
    className?: string
}

export default function HtmlRenderer({
    content,
    className,
}: ProseProps) {
    return (
        <Box
            as="article"
            className={className}
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.9"
            color="fg.muted"
            overflowWrap="break-word"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content ?? ''),
            }}
            suppressHydrationWarning
            css={{
                // ========================
                // GLOBAL
                // ========================

                '& *': {
                    maxWidth: '100%',
                },

                '& p': {
                    mb: '5',
                },

                '& br': {
                    content: '""',
                    display: 'block',
                    mb: '2',
                },

                // ========================
                // HEADINGS
                // ========================

                '& h1, & h2, & h3, & h4, & h5, & h6': {
                    color: 'fg',
                    fontWeight: '700',
                    lineHeight: '1.3',
                    letterSpacing: '-0.02em',
                    mt: '8',
                    mb: '4',
                },

                '& h1': {
                    fontSize: {
                        base: '2xl',
                        md: '4xl',
                    },
                },

                '& h2': {
                    fontSize: {
                        base: 'xl',
                        md: '3xl',
                    },
                    borderBottom: '1px solid',
                    borderColor: 'border.muted',
                    pb: '2',
                },

                '& h3': {
                    fontSize: {
                        base: 'lg',
                        md: '2xl',
                    },
                },

                '& h4': {
                    fontSize: {
                        base: 'md',
                        md: 'xl',
                    },
                },

                '& h5': {
                    fontSize: 'lg',
                },

                '& h6': {
                    fontSize: 'md',
                    opacity: 0.9,
                },

                // ========================
                // TEXT
                // ========================

                '& strong, & b': {
                    color: 'fg',
                    fontWeight: '700',
                },

                '& em': {
                    fontStyle: 'italic',
                },

                '& mark': {
                    bg: 'yellow.200',
                    color: 'black',
                    px: '1',
                    rounded: 'sm',
                },

                '& del': {
                    opacity: 0.7,
                },

                // ========================
                // LINKS
                // ========================

                '& a': {
                    color: 'teal.500',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    transition: '0.2s',
                },

                '& a:hover': {
                    color: 'teal.400',
                },

                // ========================
                // LISTS
                // ========================

                '& ul, & ol': {
                    pl: '6',
                    mb: '5',
                },

                '& ul': {
                    listStyleType: 'disc',
                },

                '& ol': {
                    listStyleType: 'decimal',
                },

                '& li': {
                    mb: '2',
                },

                '& li > ul, & li > ol': {
                    mt: '2',
                    mb: '2',
                },

                '& li::marker': {
                    color: 'teal.500',
                },

                // ========================
                // BLOCKQUOTE
                // ========================

                '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'teal.500',
                    bg: 'bg.muted',
                    px: '5',
                    py: '4',
                    rounded: 'xl',
                    my: '6',
                    color: 'fg',
                    fontStyle: 'italic',
                },

                '& blockquote p:last-child': {
                    mb: 0,
                },

                // ========================
                // IMAGE
                // ========================

                '& img': {
                    width: '100%',
                    height: 'auto',
                    rounded: '2xl',
                    my: '8',
                    border: '1px solid',
                    borderColor: 'border.muted',
                },

                '& figure': {
                    my: '8',
                },

                '& figcaption': {
                    mt: '2',
                    textAlign: 'center',
                    fontSize: 'sm',
                    color: 'fg.subtle',
                },

                // ========================
                // TABLE
                // ========================

                '& table': {
                    width: '100%',
                    display: 'block',
                    overflowX: 'auto',
                    borderCollapse: 'collapse',
                    my: '8',
                    rounded: 'xl',
                },

                '& thead': {
                    bg: 'bg.muted',
                },

                '& th': {
                    color: 'fg',
                    fontWeight: '700',
                },

                '& th, & td': {
                    border: '1px solid',
                    borderColor: 'border.muted',
                    px: '4',
                    py: '3',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                },

                // ========================
                // CODE
                // ========================

                '& pre': {
                    overflowX: 'auto',
                    p: '5',
                    rounded: '2xl',
                    bg: 'bg.muted',
                    my: '6',
                    border: '1px solid',
                    borderColor: 'border.muted',
                },

                '& code': {
                    fontFamily: 'mono',
                    fontSize: '0.9em',
                },

                '& :not(pre) > code': {
                    bg: 'bg.muted',
                    px: '1.5',
                    py: '1',
                    rounded: 'md',
                    color: 'pink.400',
                },

                // ========================
                // HORIZONTAL RULE
                // ========================

                '& hr': {
                    my: '10',
                    borderColor: 'border.muted',
                },

                // ========================
                // IFRAME / VIDEO
                // ========================

                '& iframe': {
                    width: '100%',
                    minHeight: '300px',
                    rounded: '2xl',
                    my: '8',
                },

                '& video': {
                    width: '100%',
                    rounded: '2xl',
                    my: '8',
                },

                // ========================
                // TEXT ALIGNMENT
                // ========================

                '& .text-center': {
                    textAlign: 'center',
                },

                '& .text-left': {
                    textAlign: 'left',
                },

                '& .text-right': {
                    textAlign: 'right',
                },

                // ========================
                // RESPONSIVE
                // ========================

                '@media (max-width: 768px)': {
                    '& table': {
                        fontSize: 'sm',
                    },

                    '& pre': {
                        fontSize: 'xs',
                    },

                    '& iframe': {
                        minHeight: '220px',
                    },
                },
            }}
        />
    )
}
