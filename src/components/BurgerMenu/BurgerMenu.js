import React, {useState} from 'react';
import './BurgerMenu.css';
import Burger from '../../img/burger.png';
import Close from '../../img/close.png';

export default function BurgerMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleBurger = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={toggleBurger} className={`toggle-button btn_icon_burger ${isOpen ? 'open' : ''} `}>
                <img src={Burger} alt="Burger Menu" />
            </button>
            <div className={`burgerMenu ${isOpen ? 'open' : ''} `}>
            <button onClick={toggleBurger} className={`close_btn_burger ${isOpen ? 'open' : ''}`}>
                <img src={Close} alt="Close" />
            </button>
                <div className="subsections_menu">
                <h1 className="subsections_title">Разделы</h1>
                <ul>
                    <li>
                        <div className="dropdown">
                            <button className="dropbtn">Текущие</button>
                            <div className="dropdown-content">
                                <button>Карта</button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="dropdown">
                        <button className="dropbtn">Транспорт</button>
                            <div className="dropdown-content">
                                <button>Расписание</button>
                                <button>Перевозчики</button>
                                <button>Отчеты</button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='dropdown'>
                        <button className="dropbtn">Личные</button>
                            <div className="dropdown-content">
                                <button>Дом</button>
                                <button>Работа</button>
                                <button>Любимые места</button>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </>
    )
}