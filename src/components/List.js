import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function List({items, removeItem, editItem}) {
  return (
    <div>
      {items.map(item => {
        return (
          <article key={item.id} className='task-item'>
            <p className='text'>{item.title}</p>
            <div className="btn-container">
              <button type='button' className='edit-btn' onClick={() => editItem(item.id)}>
                <FaEdit />
              </button>
              <button type='button' className='delete-btn' onClick={() => removeItem(item.id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;