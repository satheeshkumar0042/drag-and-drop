import React, { useState, useCallback } from 'react';
import { ListItem } from './ListItem';
import './ListStyle.css'; 
import'./List.css'

var SortedList = []

export const List = () => {
  const [Lists, setList] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };
  const movePetListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = Lists[dragIndex];
      const hoverItem = Lists[hoverIndex];
      
      setList((pets) => {
        const updatedPets = [...pets];
        updatedPets[dragIndex] = hoverItem;
        updatedPets[hoverIndex] = dragItem;
        return updatedPets;
      });
    },
    [Lists]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if(textareaValue.length != 0){
        const listeditems = {id : Math.floor(Math.random() * 101), name :textareaValue }
        SortedList.push(listeditems)
        setList(SortedList)
    }
    setTextareaValue('');
  };


  return (
    <div className="list-container">

    <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder="Enter your text here..."
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>


      {Lists.map((pet, index) => (
        <ListItem
          key={pet.id}
          index={index}
          text={pet.name}
          moveListItem={movePetListItem}
          className="list-item" 
        />
      ))}
    </div>
  );
};

export default List;

