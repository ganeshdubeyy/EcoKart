import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'

const Success = () => {
  const location = useLocation()
  const { fetchCartItem, fetchOrder } = useGlobalContext()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const session_id = params.get('session_id')

    const verifyAndClear = async () => {
      try {
        if (!session_id) return
        await Axios({
          ...SummaryApi.stripeSuccess,
          params: { session_id }
        })
        // Refresh cart and orders
        if (fetchCartItem) fetchCartItem()
        if (fetchOrder) fetchOrder()
      } catch (error) {
        console.error(error)
        toast.error('Could not verify payment')
      }
    }

    verifyAndClear()
  }, [location.search])

  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfull</p>
        <Link to="/" className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Success
