import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatBubble = ({ user, text }) => {
    return (_jsxs("div", { style: {
            background: '#2f3136',
            color: '#fff',
            padding: '10px',
            marginBottom: '8px',
            borderRadius: '8px',
            maxWidth: '70%',
        }, children: [_jsx("strong", { style: { color: '#00AFF4' }, children: user }), ": ", text] }));
};
