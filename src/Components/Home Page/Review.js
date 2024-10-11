import React, { useEffect, useState } from 'react';
import Star from '../Images/star.png'
import '../Styles/review.css'
import axios from 'axios';
import { FaRegCircleUser } from "react-icons/fa6";
const apiUrl = process.env.REACT_APP_API_URL;


function Review() {
    const [arr, setarr] = useState([]);

    const top3Reviews = async () => {
        try {
            const data = await axios.get(`${apiUrl}/review/top3`);
            setarr(data.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        top3Reviews();
    }, [])

    return (
        <div className="reviewImg">
            <div className="reviewCard">
                <div className='h1Box'>
                    <h1 className='h1'>REVIEWS</h1>
                    <div className="line"></div>
                </div>
                <div className="rDetail">
                    {
                        arr && arr?.map((review) => (
                            <div className="rCard" key={review._id}>
                                <FaRegCircleUser className='rimage' />
                                <div className='rheader'>
                                    <h3 className="rh3">{review.user.name}</h3>
                                </div>
                                <div className='rsummary'>
                                    {review.review}
                                </div>
                                <div><h4>Plan: {review.plan.name}</h4></div>
                                <div className='frate'>
                                    {Array.from(Array(review.rating).keys()).map((ele, key) => (
                                        <img key={key} alt='' src={Star} className='img' />
                                    ))}
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Review
