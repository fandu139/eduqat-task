"use client";

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image'

import IconMoveDot from "@/assets/icons/move-dot.svg";
import IconPlus from "@/assets/icons/plus.svg";
import IconPencil from "@/assets/icons/pencil.svg";

import Text from '@/app/atom/Text'
import Card from '@/app/atom/Card'
import Header from '@/app/organisme/Header'
import ItemList from '@/app/organisme/ItemList'
import MateriComponent from '@/app/template/materi'

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
    overflow: 'auto',
  });

  const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    padding: 2,
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

  const handleAddSession = () => {
    const dataLength = data.length + 1;
    const dataPush = [
      ...data,
      {
        id: `item-${dataLength}`,
        name: `Session ${dataLength}`,
        lessonMaterial: [],
      }
    ];
    setData(dataPush)
  }

  const handleAddLesson = (index: number) => {
    const dataLength = data[index].lessonMaterial.length + 1;

    const manipulateLessonMaterial = {
      ...data[index],
      lessonMaterial: [
        ...data[index].lessonMaterial,
        {
          id: `${dataLength}`,
          title: `Materi ${dataLength}`,
          type: "video",
          date: "2023-09-22T16:48",
          duration: 30,
        },
      ]
    }

    const _data = [...data];
    _data.splice(index, 1, manipulateLessonMaterial);
    setData(_data)
  }

  const handleMoveLesson = (id, value) => {
    console.log('fandu', id, value);
    const _data = [...data];

    const dataManipulate = {
      ...data[id],
      lessonMaterial: value
    };

    _data.splice(id, 1, dataManipulate);
    setData(_data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header title='Event' height='75' />
      <div className="p-5">
        <Card padding={4}>
          <Text>Event Schedule: 24 Oktober 2021, 16:30</Text>
        </Card>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="session">
            {(provided) => (
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
                          style={getItemStyle(
                            provided.draggableProps.style
                          )}
                          className={`border rounded p-4 mt-4`}
                        >
                          <div className="d-flex flex-row">
                            <div
                              className="p-2"
                              {...provided.dragHandleProps}
                            >
                              <Image
                                src={IconMoveDot}
                                alt="Icon Move"
                                className="dark:invert"
                                width={40}
                                height={24}
                                priority
                              />
                            </div>
                            <div className="p-2"><Text>{item.name}</Text></div>
                            <div className="p-2">
                              <Image
                                src={IconPencil}
                                alt="Icon Pencil"
                                className="dark:invert"
                                width={40}
                                height={24}
                                priority
                              />
                            </div>
                          </div>
                          <MateriComponent id={index} dataLesson={item.lessonMaterial} handleMoveLesson={handleMoveLesson} />
                          <div className="d-flex flex-row">
                            <div className="p-2 btn btn-primary" onClick={() => handleAddLesson(index)}>
                              <Image
                                src={IconPlus}
                                alt="Icon Move"
                                className="dark:invert"
                                width={20}
                                height={20}
                                priority
                              />
                            </div>
                            <div className="p-2"><Text>Add Lesson Material</Text></div>
                          </div>
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
         <button className="btn btn-primary" onClick={handleAddSession}>Add Session</button>
       </div>
     </main>
  )
}
