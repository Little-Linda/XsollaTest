import React, {useEffect, useState} from 'react'
import './App.css'
import Select from "./component/Select";

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilterItems] = useState(items);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    setFilterItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    function addFavorite(id) {
        items.map(item => {
            if (item.id === id) {
                item.favorite = !item.favorite;
                setActive(!isActive);
            }
        });
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className='wrapper'>
                <header className='block-margin-style'>
                    <h2 className='cards-title'>Event Listing</h2>
                </header>
                <Select items={items} filtered={setFilterItems}/>

                <div className='card-wrapper block-margin-style'>
                    {filteredItems.map(item => (
                        <div key={item.id} style={{backgroundImage: `url(${item.image})`}} className='card'>
                            <span className='date-block'>{item.date.split('.')[0]}</span>
                            <span className='event-name-block'>{item.name}</span>
                            <button className={ item.favorite ? 'favorite-btn active' : 'favorite-btn' } onClick={() => addFavorite(item.id)}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
