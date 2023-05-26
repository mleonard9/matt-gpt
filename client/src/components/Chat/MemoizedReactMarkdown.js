import { memo } from 'react';
import ReactMarkdown from 'react-markdown';

const MemoizedReactMarkdown = memo(
    ReactMarkdown,
    (prevProps, nextProps) => (
        prevProps.children === nextProps.children
    )
);

export default MemoizedReactMarkdown;