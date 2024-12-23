import React, { useEffect, useState } from 'react';
import '../../styles/cart/cart.css';
import { ledgerApi } from '../../apis/endpoints';
import { data } from 'react-router-dom';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.tsx';
import { fetchCartData, deleteCartItem } from '../../redux/slices/cartSlice.tsx';

interface CartItems {
  id: number;
  name: string;
  price: number;
  start_time: number;
  no_of_hours: number;
  ledger_hash_id: string;
}
interface FullCartItems {
  id: number;
  name: string;
  price: number;
  start_time: number;
  no_of_hours: number;
  ledger_hash_id: string;
}

export default function cartDetails() {
  const cartItems = useSelector((state: RootState) => state.cart.CartData);

  const dispatch = useDispatch<AppDispatch>();
  const customerid: any = localStorage.getItem('userHashId');
  console.log("customer_id:", customerid)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function convertToTime(start_time: number) {
    // Multiply start_time by 100 to get the hour value
    let militaryTime = start_time * 100;

    // Extract the hours and minutes from militaryTime
    let hours = Math.floor(militaryTime / 100);
    let minutes = militaryTime % 100;

    // Convert hours to 12-hour format
    let period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Format the time string
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }



  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  const handleDelete = (id: number) => {

    cartItems.filter((item) => item.id !== id);
    cartItems.filter(async (item) => {
      if (item.id == id) {
        dispatch(deleteCartItem(item))
        window.location.reload();
      }
    })

    // console.log("delete")
  };
  return (
    <div className="cart-page">
      <h1>My Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item-card">
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Slot: {convertToTime(item.start_time)}</p>
            <p>No. of hours: {item.no_of_hours}</p>
            <button onClick={() => handleDelete(item.id)}>Remove</button>
          </div>
        ))}
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
      </div>
      <button
        className='checkout'
        onClick={() => {
          fetch('http://localhost:3002/cart/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              items: cartItems.map(item => {
                return {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: item.name
                    },
                    unit_amount: item.price * 100
                  },
                  quantity: 1
                }
              })
            })
          }).then((res) => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
          }).then((url) => {
            // console.log(url);
            window.location = url
          }).catch(e => {
            console.log(e.error)
          })
        }}>Checkout</button>
    </div>
  );
};
