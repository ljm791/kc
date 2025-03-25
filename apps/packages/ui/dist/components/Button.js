import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, ...props }) => {
    return (_jsx("button", { style: {
            backgroundColor: '#5865F2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
        }, ...props, children: children }));
};
