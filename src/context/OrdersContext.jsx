import { createContext } from 'react';

// Provider in app.jsx
export const OrdersContext = createContext({
    orders: []
});