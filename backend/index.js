
// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const jwt = require('jsonwebtoken')
// const cors = require('cors')
// const Stripe = require('stripe')

// const UserModel = require('./models/UserModel')
// const OrderModel = require('./models/OrderModel')

// const key = 'sk_test_51Qt0fXCMVz0bhJcyJvcKnYRXMGXak4BdjnMsjAFV2A1Gjtm9xF00YOz0Lznzc8wBGsyC1Qy7iNG971bfZR645U4j00Su4rKWVC'

// const stripe = new Stripe(key)

// mongoose.connect('mongodb://localhost:27017/BookStore')

// app.use(express.json())
// app.use(cors())

// app.get('/', (req, res)=>{
//     res.send("This is home page...")
// })

// app.post('/register', async (req, res)=>{
//     try{   
//         const {name, username, password} = req.body.data
//         const exists = await UserModel.findOne({username})
//         if(!exists){
//             const user = await UserModel.create({name, username, password})
    
//             const token = jwt.sign({id: user._id.toString()}, "JWT_SECRET")
            
//             return res.send({success: true, message: "User created", token})
//         }
//         return res.json({success: false, message: "User already exists!"})


//     }catch(error){
//         console.log(error.message)
//         return res.send({success: false, message: error.message})
//     }
// })

// app.post('/login', async (req, res)=>{
//     try {
//         const {username, password} = req.body.data

//         const findUser = await UserModel.findOne({username})
//         if(!findUser){
//             return res.send({success: false, message: 'No user exists'})
//         }else{
//             if(password===findUser.password){
//                 const token = jwt.sign({id: findUser._id}, "JWT_SECRET")
//                 return res.send({success: true, message: 'Login success', token, name: findUser.name, username: findUser.username, userId: findUser._id.toString(), isAdmin: findUser.isAdmin})
//             }else{
//                 return res.send({success: false, message: 'Wrong password'})
//             }
//         }
//     } catch (error) {
//         return res.send({success: true, message: error.message})
//     }
// })


// app.post('/getCartData', async (req, res)=>{
//     try {
//         const {userId} = req.body
//         const user = await UserModel.findOne({_id: userId})

//         return res.send({success: true, message: "cart data retrieved", cartData: user.cart})
//     } catch (error) {
//         return res.send({success: false, message: error.message})
//     }
// })

// app.post('/addToCart', async (req, res)=>{
//     try {
//         const {book, username} = req.body
//         console.log(book)
//         const user = await UserModel.findOne({ username })
//         if(!user){
//             return res.send({success: false, message: "No user"})
//         }
//         for(let i=0; i<user.cart.length; i++){
//             if(user.cart[i].bookId==book.bookId){
//                 return res.send({success: false, message: "Book already present in the cart", number: 0})
//             }
//         }
//         user.cart.push({
//             bookId:  book.bookId,
//             bookName: book.bookName, 
//             subtitle: book.subtitle,
//             authorName: book.authorName, 
//             image: book.image, 
//             description: book.description,
//             price: book.price,
//             category: book.category,
//             rating: book.rating,
//             pageCount: book.pageCount,
//             publisher: book.publisher,
//             publishedDate: book.publishedDate
//         })
//         await user.save()
//         return res.send({success: true, message: 'Item added to cart', number: 1})
//     } catch (error) {
//         return res.send({success: false, message: error.message})
//     }
// })

// app.post('/removeFromCart', async (req, res)=>{
//     try {
//         const {bookId, userId, username} = req.body
//         const user = await UserModel.findOne({_id: userId})
//         const newCart = user.cart.filter(item=>item.bookId!==bookId)
//         console.log(newCart)
//         user.cart=newCart
//         await user.save()
//         return res.send({success: true, message: 'Item deleted from cart', cartData: user.cart})
//     } catch (error) {
//         return res.send({success: false, message: error.message})
//     }
// })

// app.post('/getUsers', async (req, res)=>{
//         try {
//             const docs = await UserModel.find({})
//             const users = docs.map((user)=>{
//                 return{
//                     userId: user._id,
//                     name: user.name,
//                     username: user.username,
//                     isAdmin: user.isAdmin
//                 }
//             })
//             return res.send({success: true, message: 'Users fetched', users})
//         } catch (error) {
//             console.log(error.message);
//         }
//     }
// )

// app.post('/removeUser', async (req, res)=>{
//     try {
//         const {userId} = req.body
//         const users = await UserModel.findByIdAndDelete(userId)
//         return res.send({success: true, message: 'User deleted'})
//     } catch (error) {
//         return res.send({success: false, message: error.message})
//     }
// })


// app.post('/getUser', async (req, res)=>{
//     try {
//         const {userId, username} = req.body
//         console.log(userId, username)
//         const user = await UserModel.findOne({username})
//         console.log(user)
//         if(user)
//         return res.send({success: true, user, message: 'User retrieved'})
//         return res.send({success: false, message: 'error'})
//     } catch (error) {
//         console.log(error.message)
//         return res.send({success: false, message: error.message})
//     }
// })

// app.post('/order/cod', async (req, res)=>{
//     try {
//         const {userId, book, quantity, address} = req.body
//         const orderData = {
//             userId,
//             address,
//             item: book,
//             paymentMethod: 'COD',
//             payment: false,
//             date: Date.now(),
//             amount: book.price*quantity,
//             quantity
//         }

//         const newOrder = new OrderModel(orderData)
//         await newOrder.save()

//         res.send({success: true, message: 'Order placed'})
//     } catch (error) {
//         res.send({success: false, message: 'error'})
//     }
// })


// app.post('/order/stripe', async (req, res)=>{
//     try {
//         const {userId, book, address, quantity} = req.body

//         const currency = 'inr'
//         const deliveryCharge = 0

//         const {origin} = req.headers
//         const orderData = {
//             userId,
//             address,
//             item: book,
//             amount: book.price*quantity,
//             paymentMethod: 'Stripe',
//             payment: false,
//             quantity: quantity,
//             date: Date.now()
//         }
//         // console.log(orderData)

//         const newOrder = new OrderModel(orderData)
//         await newOrder.save()

//         const line_items = [
//             {
//                 price_data:{
//                     currency: currency,
//                     product_data:{
//                         name: book.bookName
//                     },
//                     unit_amount: book.price*100
//                 },
//                 quantity: quantity
//             }
//         ]

//         line_items.push({
//             price_data:{
//                 currency: currency,
//                 product_data:{
//                     name: 'Delivery Charge'
//                 },
//                 unit_amount: deliveryCharge*100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/bookverse/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/bookverse/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment'
//         })

//         return res.send({success: true, session_url: session.url})
//     } catch (error) {
//         console.log(error.message)
//         res.send({success: false})
//     }
// })

// app.post('/verifyStripe', async (req, res)=>{
//     try {
//         const {orderId, success, userId} = req.body
//         if(success==='true'){
//             await OrderModel.findByIdAndUpdate(orderId, {payment: true})
//             return res.send({success:true})
//         }
//         else{
//             await OrderModel.findByIdAndDelete(orderId)
//             return res.send({success:false})
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// })

// app.post('/getOrders', async (req, res)=>{
//     try {
//         const {userId} = req.body
//         console.log(userId)
//         const records = await OrderModel.find({userId})
//         const orders = records.map(order=>{
//             return{
//                 bookName: order.item.bookName,
//                 authorName: order.item.authorName,
//                 image: order.item.image,
//                 price: order.item.price,
//                 paymentMethod: order.paymentMethod,
//                 date: order.date.toString(),
//                 quantity: order.quantity,
//                 amount: order.amount
//             }
//         })
//         console.log('called')
//         return res.send({success: true, orders})
//     } catch (err) {
//         console.log(err.message)
//     }
// })


// app.listen(3001, ()=>{
//     console.log("Server running")
// })





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/BookStore');

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
