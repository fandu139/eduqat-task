"use client";

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ItemList from '@/app/organisme/ItemList'

const DATA_SESSIONS = [
  {
    id: "item-1",
    name: "Session 1",
    lessonMaterial: [
      {
        id: "1",
        title: "Materi 1",
        type: "video",
        date: "2023-09-22T16:48",
        duration: 30,
      },
      {
        id: "2",
        title: "Materi 2",
        type: "location",
        date: "2023-09-23T12:48",
        duration: 40,
      },
    ],
  },
  {
    id: "item-2",
    name: "Session 2",
    lessonMaterial: [
      {
        id: "1",
        title: "Materi 1",
        type: "video",
        date: "2023-09-22T16:48",
        duration: 30,
      },
      {
        id: "2",
        title: "Materi 2",
        type: "location",
        date: "2023-09-23T12:48",
        duration: 40,
      },
    ],
  },
];

export default function Home(this: any) {
  const [data, setData] = useState(DATA_SESSIONS);
  const grid = 8;
  
  const getListStyle = () => ({
    padding: grid,
    overflow: 'auto',
  });

  const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 10px 0`,
    background: '#8080800f',
    ...draggableStyle,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsManipulate = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setData(itemsManipulate)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle()}
            {...provided.droppableProps}
          >
            {data.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        provided.draggableProps.style
                      )}
                    >
                      <ItemList
                        ref={provided.innerRef}
                        key={index}
                        id={item.id}
                        // title={item.title}
                        title={item.name}
                        // type={item.type}
                        // date={item.date}
                        // duration={item.duration}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
