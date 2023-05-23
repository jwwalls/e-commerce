import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-youtube"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                </div>

                <div className="row">
                    <ul>
                        <li><a href="#">Yen Shen </a></li>
                        <li><a href="#">Jeremie Wall</a></li>
                        <li><a href="#">Caleb Ricks</a></li>
                        <li><a href="#">SHOENSTAR</a></li>
                        <li><a href="#">Love Coding</a></li>
                    </ul>
                </div>

                <div className="row">
                SHOENSTAR Copyright © 2023 SHOENSTAR - All rights(are not)reserved || IM THE BEST
                </div>
            </div>
        </footer>
    );
};

export default Footer;