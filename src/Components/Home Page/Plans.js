import React, { useEffect, useState } from 'react';
import '../Styles/plan.css';
import Tick from '../../Images/check-mark.png'
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;


function Plans() {
    const [arr, arrset] = useState([]);

    const top3 = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/plans/top3`);
            arrset(response.data.plans);
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        top3();
    }, [])

    return (
        <div className='plansCard'>
            <div className='h1Box'>
                <h1 className='h1'>START EATING HEALTHY TODAY</h1>
                <div className="line"></div>
            </div>
            <div className='planDetails'>
                {arr && arr?.map((ele, key) =>
                    <div className='pCard' key={key}>
                        <h3 className='h3'>{ele.name}</h3>
                        <div className='pCard1'>
                            <div className='priceBox'>
                                <div className='price'>Rs {ele.price}</div>
                                <div className="duration">/month</div>
                            </div>
                            <p className="point">That’s only ₹{(ele.price / 30).toFixed(2)} per meal</p>                            </div>

                        <div className='pCard2'>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.duration} meal every day</p>
                            </div>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.discount} discount available.</p>
                            </div>
                            <div className='ppoints'>
                                <img src={Tick} alt='' className='img' />
                                <p className='point'>{ele.ratingsAverage} rated meal.</p>
                            </div>
                        </div>
                        <button className='btn'>I'm Hungry</button>
                    </div>
                )}
            </div>
        
        </div>
    )
}

export default Plans
