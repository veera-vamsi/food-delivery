import { createContext, useState } from 'react'
import { food_list } from '../assets/frontend_assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] <= 1) {
        const updatedCart = { ...prev }
        delete updatedCart[itemId]
        return updatedCart
      }
      return {
        ...prev,
        [itemId]: prev[itemId] - 1,
      }
    })
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === itemId || product.id === itemId
        )
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId]
        }
      }
    }
    return totalAmount
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
