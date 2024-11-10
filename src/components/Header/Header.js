import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import '../../components/Header/header.css';

class Header extends React.Component {
    render () {
        return (
                <div className="header_container">
                    <div className="header_nav">
                        <ul className="header_nav_flexbox">
                            <li><a href="#">Рестораны</a></li>
                            <li><a href="#">Отели</a></li>
                            <li><a href="#">Транспорт</a></li>
                            <li><a href="#">Парки</a></li>
                            <li><a href="#">Аптеки</a></li>
                            <li><a href="#">Банкоматы</a></li>
                            <li>
                                <div className="header_checkbox">
                                    <input type='checkbox' id='routes'/> 
                                    <span>Маршруты</span>    

                                    <input type='checkbox' id='track'/> 
                                    <span>Трекер транспорта</span>  

                                    <input type='checkbox' id='stops'/> 
                                    <span>Остановки</span>                                  
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        )
    }
}

export default Header