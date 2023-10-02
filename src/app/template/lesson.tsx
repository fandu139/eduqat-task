"use client";

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ItemList from '@/app/organisme/ItemList'

interface LessonProps {
  id: number;
  dataLesson: {
    id: string;
    title: string;
    type: string;
    date: string;
    duration: number;
  }[],
  handleMoveLesson: (
    id: number,
    data: {
      id: string;
      title: string;
      type: string;
      date: string;
      duration: number;
    }[]
  ) => void;
}

export default function MateriLesson({ id, dataLesson, handleMoveLesson }: LessonProps) {
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
      dataLesson,
      result.source.index,
      result.destination.index
    );

    handleMoveLesson(id, itemsManipulate)
  };

  const handleDeleteLesson = (index: number) => {
    dataLesson.splice(index-1, 1);
    handleMoveLesson(id, dataLesson)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lesson">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle()}
            {...provided.droppableProps}
          >
            {dataLesson.map((item, index) => {
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
                        key={index}
                        id={item.id}
                        title={item.title}
                        type={item.type}
                        date={item.date}
                        duration={item.duration}
                        handleDeleteLesson={handleDeleteLesson}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
