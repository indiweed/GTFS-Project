import React, {useState} from "react";
import '../Layers/Layers.css';
import iconLayers from '../../img/layers.png';

export default function Layers() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleLayers = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
        <button onClick={toggleLayers} className={`toggle-layers layers_icon ${isOpen ? 'open' : ''}`}>
            <img src={iconLayers} alt="Layers Menu" />
        </button>
        <div className={`layers ${isOpen ? 'open' : ''}`}>
            <div className="layers_list">
                <h1>Слои</h1>
                <ul>
                    <li>
                        <input type="checkbox" id="stops"/>
                        <p>Остановки</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Погода</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Ресторан</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Отели</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Парки</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Аптеки</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Банкоматы</p>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <p>Кафе</p>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}