import React, { useEffect, useState } from 'react'
import '../Styles/allplans.css';
import Tick from '../../../src/Images/check-mark.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;


function AllPlans() {
    const [arr, setArr] = useState([]);

    useEffect( () => {
        const allPlans = async () =>{
            try {
                const response = await axios.get(`${apiUrl}/plans/allPlans`);
                console.log(response.data.plans);
                setArr(response.data.plans);
            } catch (err) {
                console.log(err);
            }
        }
        allPlans();
    }, [])

    return (
        <div className='allplansCard'>
            <div className='h1Box'>
                <h1 className='plan-heading'>START EATING HEALTHY TODAY</h1>
                <div className="line"></div>
            </div>
            <div className='allplanDetails'>
                <div className='planDetails'>
                    {arr && arr?.map((ele, key) =>
                        <div className='apCard' key={key}>
                            <h3 className='h3'>{ele.name}</h3>
                            <div className='pCard1'>
                                <div className='priceBox'>
                                    <div className='price'>Rs {ele.price}</div>
                                    <div className="duration">/month</div>
                                </div>
                                <p className="point">That’s only ₹{(ele.price / 30).toFixed(2)} per meal</p>
                            </div>

                            <div className='pCard2'>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{ele.duration} meal every day</p>
                                </div>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{ele.discount}% discount available.</p>
                                </div>
                                <div className='ppoints'>
                                    <img src={Tick} alt='' className='img' />
                                    <p className='point'>{ele.ratingsAverage} rated meal.</p>
                                </div>
                            </div>

                            <button className='btn'> <Link to={`/planDetail/${ele._id}`} >I'm Hungry</Link></button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default AllPlans;
