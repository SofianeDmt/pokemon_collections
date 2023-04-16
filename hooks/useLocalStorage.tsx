import { useState, useEffect } from 'react';

export type ItemType = {
    id: number;
    name: string;
};

export type UseLocalStorageResult = {
    items: ItemType[];
    addItem: (newItem: ItemType) => void;
    removeItemById: (itemId: number) => void;
    isItemExistsById: (itemId: number) => boolean;
};

export const useLocalStorage = (key: string, initialValue: ItemType[]): UseLocalStorageResult => {

    const [items, setItems] = useState<ItemType[]>(() => {
        if (typeof window !== 'undefined') {
            const storedItems: string | null = localStorage.getItem(key);
            return storedItems ? JSON.parse(storedItems) : initialValue;
        }
    });

    useEffect((): void => {
        window.localStorage.setItem(key, JSON.stringify(items));
    }, [key, items]);

    const addItem = (newItem: ItemType): void => {
        setItems(prevItems => [...prevItems, newItem]);
    };

    const removeItemById = (itemId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const isItemExistsById = (itemId: number) => {
        return items.some(item => item.id === itemId);
    };

    return { items, addItem, removeItemById, isItemExistsById };
};

export default useLocalStorage;
