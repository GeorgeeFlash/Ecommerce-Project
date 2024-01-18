"use client";

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '@/context/StateContext'
import { runFireWorks } from '@/lib/utils';

const Success = () => {

    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    const onRender = useCallback(() => {
        localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runFireWorks();

    }, []);

    useEffect(() => {
        onRender();
    }, [onRender])
    

    return (
        <div className='succes-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email inbox for you reciept.</p>
                <p className='description'>
                    If you have any questions, please email
                    <a className='email' href='mailto:order@example.com'>
                        order@example.com
                    </a>
                </p>
                <Link href='/'>
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success