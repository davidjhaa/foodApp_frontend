import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/footer.css';

function Footer() {
    return (
        <div className='footerImg'>
            <footer>
                <div className="footer-parent">
                    <ul className="social-link">
                        <li>
                            <Link to="https://www.facebook.com/foodyy.chaachaa">
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.instagram.com/foddy_chaachaa">
                                
                            </Link>
                        </li>
                        <li>
                            <Link to="https://twitter.com/ChaaFoody">
                                
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                
                            </Link>
                        </li>
                    </ul>
                </div>

                <p className="footer-p">
                    Copyright © 2019 EVERYONE. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Footer
