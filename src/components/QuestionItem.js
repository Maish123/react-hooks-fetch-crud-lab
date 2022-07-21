import React from "react";

// let QUESTIONS_DATA= "http://localhost:4000/questions"

function QuestionItem({ question, onDeletedItem, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

function handleDelete(){
  console.log("I've been clicked")
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
  .then((resp)=> resp.json())
  .then(()=>onDeletedItem(id))
}

function handleAnswerChange(event) {
  onAnswerChange(id, parseInt(event.target.value));
}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button
      onClick={handleDelete}
      >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
