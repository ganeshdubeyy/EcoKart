import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

 export async function CashOnDeliveryOrderController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const user = await UserModel.findById(userId)

        // Support both full cart item shape (with productId object) and minimal shape from client
        const line_items  = list_items.map(item =>{
            const hasProductObject = Boolean(item?.productId && typeof item.productId === 'object')

            const productName = hasProductObject ? item.productId.name : (item?.name || 'Product')
            const productImages = hasProductObject ? item.productId.image : item?.image
            const productIdMeta = hasProductObject ? item.productId._id : (item?._id || '')

            const unitAmountInPaise = hasProductObject
                ? pricewithDiscount(item.productId.price, item.productId.discount) * 100
                : Math.round(Number(item?.price || 0) * 100)

            const quantity = Number(item?.quantity || item?.qty || 1)

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: productName,
                        // Stripe expects array of image URLs; pass if available
                        images: productImages ? (Array.isArray(productImages) ? productImages : [productImages]) : [],
                        metadata: {
                            productId: String(productIdMeta || '')
                        }
                    },
                    unit_amount: unitAmountInPaise
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
                userId : userId,
                addressId : addressId
            },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params)

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images
                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request,response){
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("event",event)

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
      const userId = session.metadata.userId
      const orderProduct = await getOrderProductItems(
        {
            lineItems : lineItems,
            userId : userId,
            addressId : session.metadata.addressId,
            paymentId  : session.payment_intent,
            payment_status : session.payment_status,
        })
    
      const order = await OrderModel.insertMany(orderProduct)

        console.log(order)
        if(Boolean(order[0])){
            const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
                shopping_cart : []
            })
            const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
        }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}

// Verify session on success page and clear the cart if paid
export async function verifyStripeSuccessAndClearCart(request, response){
    try {
        const { session_id } = request.query
        const userId = request.userId

        if(!session_id){
            return response.status(400).json({ success: false, error: true, message: 'Missing session id' })
        }

        const session = await Stripe.checkout.sessions.retrieve(session_id)

        if(session.payment_status !== 'paid'){
            return response.status(400).json({ success: false, error: true, message: 'Payment not completed' })
        }

        // Double check the session belongs to this user
        if(String(session.metadata?.userId) !== String(userId)){
            return response.status(403).json({ success: false, error: true, message: 'Unauthorized session' })
        }

        // Clear cart for the user
        await UserModel.findByIdAndUpdate(userId, { shopping_cart: [] })
        await CartProductModel.deleteMany({ userId })

        return response.json({ success: true, error: false, message: 'Cart cleared' })
    } catch (error) {
        return response.status(500).json({ success: false, error: true, message: error.message || error })
    }
}


export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
