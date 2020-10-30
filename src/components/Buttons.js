import React from 'react';

const Buttons = ({initialize, operators, numbers, decimal, evaluate}) => {
    const clearStyle = { background: '#ac3939' },
    operatorStyle = { background: '#673AB7' },
    equalsStyle = {
        background: '#03A9F4',
        position: 'absolute',
        height: 130,
        bottom: 5
    };
    const buttons = [
        { className: 'jumbo', id:'clear', onClick: initialize , style: clearStyle, value: 'AC'},
        { id:'divide', onClick: operators , style: operatorStyle, value: '/'},
        { id:'multiply', onClick: operators , style: operatorStyle, value: 'x'},
        { id:'seven', onClick: numbers, value: '7'},
        { id:'eight', onClick: numbers, value: '8'},
        { id:'nine', onClick: numbers, value: '9'},
        { id:'subtract', onClick: operators , style: operatorStyle, value: '‑'},
        { id:'four', onClick: numbers, value: '4'},
        { id:'five', onClick: numbers, value: '5'},
        { id:'six', onClick: numbers, value: '6'},
        { id:'add', onClick: operators , style: operatorStyle, value: '+'},
        { id:'one', onClick: numbers, value: '1'},
        { id:'two', onClick: numbers, value: '2'},
        { id:'three', onClick: numbers, value: '3'},
        { className: 'jumbo', id:'zero', onClick: numbers, value: '0'},
        { id:'decimal', onClick: decimal, value: '.'},
        { id:'equals', onClick: evaluate , style: equalsStyle, value: '='},
    ]
    return <div>
      {
          buttons.map(item =>(
            <button {...item } key={item.id}>
            {item.value}
            </button>
          ))
      }
  </div>
}

export default Buttons;