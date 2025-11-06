import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            console.log('cart/addToCart', newItem);
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            state.totalQuantity += newItem.quantity;
        },
        setCart: (state, action) => {
            const { items, totalQuantity } = action.payload;
            console.log('cart/setCart', items, totalQuantity);
            state.items = items || [];
            state.totalQuantity = totalQuantity || 0;
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        updateCartItemQuantity: (state, action) => {
            console.log('cart/updateQuantity', action.payload);
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                const quantityDiff = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalQuantity += quantityDiff;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateCartItemQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;