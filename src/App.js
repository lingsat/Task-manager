import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import Alert from './components/Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(JSON.parse(localStorage.getItem('listStorage')) || []);
  const [isEditing, setIsAditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  function showAlert(show = false, msg = '', type = '') {
    setAlert({show, msg, type});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'Please, enter the task!', 'danger');
    } else if (name && isEditing) {
      setList(prevList => prevList.map(item => {
        if (item.id === editId) {
          return {...item, title: name};
        }
        return item;
      }));
      setName('');
      setEditId(null);
      setIsAditing(false);
      showAlert(true, 'Task changed!', 'success');
    } else {
      showAlert(true, 'Task added!', 'success');
      const newItem = {id: uuidv4(), title: name}; 
      setList(prevList => [...prevList, newItem]);
      setName('');
    }
  }

  function clearList() {
    showAlert(true, 'List of tasks cleared!', 'danger');
    setList([]);
  }

  function removeItem(id) {
    showAlert(true, 'Task removed!', 'danger');
    setList(prevList => prevList.filter(item => item.id !== id));    
  }  

  function editItem(id) {
    const editedItem = list.find(item => item.id === id);
    setIsAditing(true);
    setEditId(id);
    setName(editedItem.title);
  }  

  useEffect(() => {
    localStorage.setItem('listStorage', JSON.stringify(list));
  }, [list]);
  
  return (
    <div className="container">
      <section className='section-center'>
        <form onSubmit={handleSubmit} className='task-form'>
          {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
          <h3>Task Manager</h3>
          <div className="form-control">
            <input 
              type="text"
              className='task'
              placeholder='task'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={`submit-btn ${isEditing ? 'submit-btn--edit' : ''}`}>
              {isEditing ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && 
          <div className="task-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>clear items</button>
          </div>      
        }
      </section>
    </div>
  );
}

export default App;