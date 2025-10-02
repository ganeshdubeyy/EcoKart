import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem?.cart || [])
    const [loading, setLoading] = useState(false)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState(null)

    // Add item to cart
    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!data?._id) return

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addTocart,
                data: { productId: data._id }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem && fetchCartItem()
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // Check if this item is already in the cart
    useEffect(() => {
        if (!data?._id || !Array.isArray(cartItem)) return

        const product = cartItem.find(item => item?.productId?._id === data._id)
        setIsAvailableCart(!!product)
        setQty(product?.quantity || 0)
        setCartItemsDetails(product || null)
    }, [data, cartItem])

    // Increase quantity
    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!cartItemDetails?._id) return

        try {
            setLoading(true)
            const response = await updateCartItem(cartItemDetails._id, qty + 1)
            if (response?.success) {
                toast.success("Item quantity increased")
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // Decrease quantity
    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!cartItemDetails?._id) return

        try {
            setLoading(true)
            if (qty === 1) {
                await deleteCartItem(cartItemDetails._id)
                toast.success("Item removed from cart")
            } else {
                const response = await updateCartItem(cartItemDetails._id, qty - 1)
                if (response?.success) {
                    toast.success("Item quantity decreased")
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {isAvailableCart ? (
                <div className='flex w-full h-full'>
                    <button
                        onClick={decreaseQty}
                        className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'
                        disabled={loading}
                    >
                        <FaMinus />
                    </button>

                    <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>
                        {qty}
                    </p>

                    <button
                        onClick={increaseQty}
                        className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'
                        disabled={loading}
                    >
                        <FaPlus />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleADDTocart}
                    className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'
                    disabled={loading}
                >
                    {loading ? <Loading /> : "Add"}
                </button>
            )}
        </div>
    )
}

export default AddToCartButton
