import React, {useState} from 'react';


function Select(props) {
    const [filteredCity, setFilterCity] = useState();
    const [filteredMonth, setFilterMonth] = useState();
    const selected = {
        city: '',
        month: ''
    };
    let monthList2 = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April': '04',
        'May': '05',
        'June': '06',
        'July': '07',
        'August': '08',
        'September': '09',
        'October': '10',
        'November': '11',
        'December': '12',
    };

    // фильтр по городам и датам
    function filterApply(e, setVal) {
        const filteredValue = e === "all" ? props.items : props.items.filter((p) => {
            return p.city === selected.city && p.date.split('.')[1] === monthList2[selected.month];
        });
        props.filtered(filteredValue);
        setVal(e);
    }

    // сохраняем выбранный город
    function selectCity(e) {
        const value = e.target.value;
        selected.city = value;
        selected.month = filteredMonth;
        filterApply(value, setFilterCity);
    }

    // сохраняем выбранный месяц
    function selectMonth(e) {
        const value = e.target.value;
        selected.month = value;
        selected.city = filteredCity;
        filterApply(value, setFilterMonth);
    }

    // находим все города в объекте items и берем только уникальные
    function uniq() {
        // списко всех городо
        let allCitysList = props.items.map((item) => {
            return item.city;
        })
        return allCitysList.sort().filter(function (item, pos, ary) {
            return !pos || item !== ary[pos - 1];
        });
    }

    return (
        <div className='block-margin-style'>
            <div className='select-wrapper'>
                <label>City: </label>
                <select className='select-block' onChange={selectCity}>
                    <option value="all">all</option>
                    {uniq().map((item, indx) => (
                        <option key={indx} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className='select-wrapper'>
                <label>Month: </label>
                <select className='select-block' onChange={selectMonth}>
                    <option value="all">all</option>
                    {Object.keys(monthList2).map((item, indx) => (
                        <option key={indx} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    )

}

export default Select;
