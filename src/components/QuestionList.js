import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


const QUESTIONS_DATA = "http://localhost:4000/questions"

function QuestionList() {

// use the state hook to declare the state of data
const [questions,setQuestions]= useState([])

// use the useEffect suth that when the page loads, we get the questions
useEffect(()=>{
  fetch(QUESTIONS_DATA)
  .then((resp)=>resp.json())
  .then((data)=>{
    setQuestions(data)
  })
},[])

//since it is the parent of item list and item form, it will contain most functions to handle how these data is treated, either add of update or delete
//first have handleAdd, which adds an object created in the questionForm, by pushing the question to the existing array

function handleAddQuestion(newItem){
  //our state changes with whether or not we want to submit our question
  setQuestions([...questions,newItem])
}

function handleDeletedItem(id){
  const updatedQuestions= questions.filter((question)=>question.id!==id)
  setQuestions(updatedQuestions)
}
function handleAnswerChange(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex }),
  })
    .then((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion;
        return q;
      });
      setQuestions(updatedQuestions);
    });
}

const questionItems = questions.map((question) => (
  <QuestionItem
    key={question.id}
    question={question}
    onAddQuestion={handleAddQuestion}
    onDeletedItem={handleDeletedItem}
    onAnswerChange={handleAnswerChange}
  />
));
//when the delete button is clicked Questions should be removed from th lise by updating state

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
