"use client";

import React, { useCallback, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Image from 'next/image'

import IconMoveDot from "@/assets/icons/move-dot.svg";
import IconPlus from "@/assets/icons/plus.svg";
import IconPencil from "@/assets/icons/pencil.svg";
import IconDelete from "@/assets/icons/trash.svg";
import IconEye from "@/assets/icons/eye.svg";

import Text from '@/app/atom/Text'
import Header from '@/app/organisme/Header'
import MateriComponent from '@/app/template/lesson'

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
  const [session, setSession] = useState({
    text: '',
    isActive: false,
  });
  const [editSession, setEditSession] = useState({
    text: '',
    indexShowLesson: -1,
  });
  const [lesson, setLesson] = useState({
    text: {
      id: "",
      title: "",
      type: "",
      date: "",
      duration: 0,
    },
    isActive: false,
    indexShowLesson: -1,
  });

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
        name: session.text,
        lessonMaterial: [],
      }
    ];

    setData(dataPush)
    setSession({
      text: '',
      isActive: false,
    });
  }

  const handleAddLesson = (index: number) => {
    const dataLength = data[index].lessonMaterial.length + 1;

    const manipulateLessonMaterial = {
      ...data[index],
      lessonMaterial: [
        ...data[index].lessonMaterial,
        {
          id: `${dataLength}`,
          title: lesson.text.title,
          type: lesson.text.type,
          date: lesson.text.date,
          duration: lesson.text.duration,
        },
      ]
    }

    const _data = [...data];
    _data.splice(index, 1, manipulateLessonMaterial);
    setData(_data)
    setLesson({
      text: {
        id: "",
        title: "",
        type: "",
        date: "",
        duration: 0,
      },
      isActive: false,
      indexShowLesson: -1,
    });
  }

  const handleMoveLesson = (id: number, value: {
    id: string;
    title: string;
    type: string;
    date: string;
    duration: number;
  }[]) => {
    const _data = [...data];

    const dataManipulate = {
      ...data[id],
      lessonMaterial: value
    };

    _data.splice(id, 1, dataManipulate);
    setData(_data)
  }

  const handleEditSession = (index: number, typeAction?: string) => {
    if (typeAction === 'submit') {
      const _data = [...data];

      const dataManipulate = {
        ...data[editSession.indexShowLesson],
        name: editSession.text,
      };

      _data.splice(editSession.indexShowLesson, 1, dataManipulate);

      setData(_data)
      setEditSession({
        text: '',
        indexShowLesson: -1,
      })
    } else {
      setEditSession({
        text: data[index].name,
        indexShowLesson: index,
      })
    }
  }

  const handleDeleteSession = useCallback((index: number) => {
    const _data = [...data];

    _data.splice(index, 1);
    setData(_data)
  }, [data])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header title='Event' height='75' />
      <div className="container-curriculum">
        <div className="d-flex flex-row mb-3 align-items-center">
          <div className="p-2">
            <h3>Belajar dan praktek cinematic videography</h3>
          </div>
          <div className="p-2">
            <Text>Last edited 18 October 2021 | 13:23</Text>
          </div>
          <div className="p-2">
            <button
              className="btn btn-custom-preview">
              <Image
                src={IconEye}
                alt="Icon Eye"
                className="dark:invert"
                width={20}
                height={20}
                priority
              />
              <Text color='primary'> Preview</Text>
            </button>
          </div>
        </div>
        <div className="d-flex flex-row mb-3 align-items-center">
          <div className="p-2">
            <Text color="primary">Curricullum</Text>
            <hr className="line-curriculum"/>
          </div>
        </div>
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
                            {editSession.indexShowLesson !== index ? (
                              <>
                                <div className="p-2"><Text>{item.name}</Text></div>
                                <div className="p-2" onClick={() => handleEditSession(index)}>
                                  <Image
                                    src={IconPencil}
                                    alt="Icon Pencil"
                                    className="dark:invert"
                                    width={40}
                                    height={24}
                                    priority
                                  />
                                </div>
                                <div className="p-2" onClick={() => handleDeleteSession(index)}>
                                  <Image
                                    src={IconDelete}
                                    alt="Icon Delete"
                                    className="dark:invert"
                                    width={40}
                                    height={24}
                                    priority
                                  />
                                </div>
                              </>
                            ):(
                              <>
                                <div className="p-2">
                                  <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Edit Session"
                                    value={editSession.text}
                                    onChange={(e) => setEditSession((prevState) => ({
                                      ...prevState,
                                      text: e.target.value
                                    }))}
                                  />
                                </div>
                                <div className="p-2">
                                  <div className="col-md-2">
                                    <button className="btn btn-primary" onClick={() => handleEditSession(index, 'submit')}>
                                      Submit
                                    </button>
                                  </div>
                                </div>
                                <div className="p-2">
                                  <div className="col-md-1">
                                    <button className="btn btn-danger" onClick={() => setEditSession((prevState) => ({
                                      ...prevState,
                                      indexShowLesson: -1
                                    }))}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <MateriComponent id={index} dataLesson={item.lessonMaterial} handleMoveLesson={handleMoveLesson} />
                          <div className="d-flex flex-row">
                            {lesson.isActive && lesson.indexShowLesson === index ? (<div className="row g-3">
                              <div className="col-md-2">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={(e) => setLesson((prevState) => ({
                                    ...prevState,
                                    text: {
                                      ...prevState.text,
                                      type: e.target.value,
                                    },
                                  }))}
                                >
                                  <option selected>Pilih Tipe</option>
                                  <option value="video">Video</option>
                                  <option value="location">Location</option>
                                </select>
                              </div>
                              <div className="col-md-3">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Input Judul"
                                  onChange={(e) => setLesson((prevState) => ({
                                    ...prevState,
                                    text: {
                                      ...prevState.text,
                                      title: e.target.value
                                    },
                                  }))}
                                />
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="datetime-local"
                                  name="name"
                                  className="form-control"
                                  placeholder="Input Tanggal"
                                  onChange={(e) => setLesson((prevState) => ({
                                    ...prevState,
                                    text: {
                                      ...prevState.text,
                                      date: e.target.value
                                    },
                                  }))}
                                />
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="number"
                                  name="name"
                                  className="form-control"
                                  placeholder="Input Duration"
                                  onChange={(e) => setLesson((prevState) => ({
                                    ...prevState,
                                    text: {
                                      ...prevState.text,
                                      duration: Number(e.target.value)
                                    },
                                  }))}
                                />
                              </div>
                              <div className="col-md-2">
                                <button className="btn btn-primary" onClick={() => handleAddLesson(index)}>
                                  Submit
                                </button>
                              </div>
                              <div className="col-md-1">
                                <button className="btn btn-danger" onClick={() => setLesson((prevState) => ({
                                  ...prevState,
                                  isActive: false,
                                  indexShowLesson: -1
                                }))}>
                                  Cancel
                                </button>
                              </div>
                            </div>):(
                            <div className="row g-3">
                              <div className="col-md-3">
                                <button className="btn btn-custom" onClick={() => setLesson((prevState) => ({
                                  ...prevState,
                                  isActive: true,
                                  indexShowLesson: index
                                }))}>
                                  <Image
                                    src={IconPlus}
                                    alt="Icon Move"
                                    className="dark:invert"
                                    width={20}
                                    height={20}
                                    priority
                                  />
                                </button>
                              </div>
                              <div className="col-md-9">
                                <div className="p-2"><Text>Add Lesson Material</Text></div>
                              </div>
                            </div>)}
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
        <div className='d-flex justify-content-end mt-4'>
          {session.isActive ? (<div className="row g-3">
            <div className="col-md-7">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Input Session"
                onChange={(e) => setSession((prevState) => ({
                  ...prevState,
                  text: e.target.value,
                }))}
              />
            </div>
            <div className="col-md-5">
              <button className="btn btn-primary" onClick={handleAddSession}>
                <Image
                  src={IconPlus}
                  alt="Icon Move"
                  className="dark:invert"
                  width={20}
                  height={20}
                  priority
                />
                Submit
              </button>
            </div>
          </div>):(<div className="row g-3">
            <div className="col-md-12">
              <button
                className="btn btn-custom"
                onClick={
                  () => setSession((prevState) => ({
                    ...prevState,
                    isActive: true
                  })
                )}>
                <Image
                  src={IconPlus}
                  alt="Icon Move"
                  className="dark:invert"
                  width={20}
                  height={20}
                  priority
                />
                <Text color='white'> Add Session</Text>
              </button>
            </div>
          </div>)}
        </div>
       </div>

       <style jsx>
          {`
            .container-curriculum {
              padding-top: 100px;
              padding-left: 50px;
              padding-right: 50px;
              padding-bottom:100px;
            }

            .line-curriculum {
              border: 2px solid #7800ef;
            }

            .btn-custom {
              background: #7800ef;
            }
            
            .btn-custom-preview {
              border: 1px solid #7800ef;
            }
          `}
        </style>
     </main>
  )
}
