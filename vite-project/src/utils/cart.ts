import type { CartItem } from '@/types/order';

const CART_KEY = 'MEDWISE_CART';

// 获取购物车列表
export const getCartItems = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// 保存购物车列表
export const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// 添加商品到购物车
export const addToCart = (item: CartItem) => {
  const items = getCartItems();
  const existingItem = items.find(i => i.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
    // 确保不超过库存
    existingItem.quantity = Math.min(existingItem.quantity, item.stock);
  } else {
    items.push(item);
  }
  
  saveCartItems(items);
  return items;
};

// 更新购物车商品数量
export const updateCartItemQuantity = (id: number, quantity: number) => {
  const items = getCartItems();
  const item = items.find(i => i.id === id);
  
  if (item) {
    item.quantity = Math.min(quantity, item.stock);
    saveCartItems(items);
  }
  
  return items;
};

// 从购物车移除商品
export const removeFromCart = (id: number) => {
  const items = getCartItems();
  const newItems = items.filter(item => item.id !== id);
  saveCartItems(newItems);
  return newItems;
};

// 清空购物车
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// 计算购物车总价
export const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// 获取购物车商品总数
export const getCartItemCount = () => {
  const items = getCartItems();
  return items.reduce((count, item) => count + item.quantity, 0);
}; 