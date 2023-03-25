
import { useEffect, useState } from 'react';
import './App.css';
import uuid from 'react-uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable'

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || [])
  useEffect(() => { localStorage.setItem('items', JSON.stringify(items)) }, [items])
  const rnd = () => Math.random() * 100
  const windowDim = {
    w: window.innerWidth,
    h: window.innerHeight
  }


  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuid(),
        item: item,
        color: randomColor({luminosity: 'light'}),
        defaultPos: {x: (windowDim.w / 2 - 250) + rnd() , y: (-windowDim.h + 100) / 2 + rnd() }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Enter somthing...')
      setItem('')
    }
  }
  
  const deleteItem = (id) => {
    const newItems = [...items].filter(t => t.id !== id)
    setItems(newItems)
  }
  
  const onPressKey = (e) => {
    if (e.keyCode === 13) {
      newItem()
    }
  }
  
  const updatePos = (data, id) => {
    const newArr = items.map(e => e.id === id ? {...e, defaultPos: {x: data.x, y: data.y}} : e)
    setItems(
      newArr
      )
  }
  

  return (
    <div className="App">
      <div className='wrapper'>
        <input
          type='text'
          value={item}
          placeholder='Enter somthing...'
          onChange={(e) => { setItem(e.target.value) }}
          onKeyDown={onPressKey}
        />
        <button className='enter' onClick={() => { newItem() }}>ENTER</button>
      </div>
      {
        items.map((item) => {
          return (
            <Draggable key={item.id}
              defaultPosition={item.defaultPos}
              bounds={"parent"}
              onStop={(_, data)=>{ updatePos(data, item.id) }}
            >
              <div className='todo__item' style={{ backgroundColor: item.color }}>
                {item.item}
                <button className='delete' onClick={() => { deleteItem(item.id) }}>X</button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
