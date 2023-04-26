
import { getSession } from "next-auth/react";
import { describe } from "node:test";


describe("createNewSet", () => {
  test('should add a card to database', async () => {

    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  )  as unknown as jest.MockedFunction<typeof fetch>;

  const setSubjectInput = document.createElement("input") as HTMLInputElement;
  setSubjectInput.id = "subject";
  setSubjectInput.value = "Test Subject";

  const questionInput = document.createElement("input") as HTMLInputElement;
  questionInput.id = "front";
  questionInput.value = "Test Question";

  const answerInput = document.createElement("input") as HTMLInputElement;
  answerInput.id = "back";
  answerInput.value = "Test Answer";

  const chapterInput = document.createElement("input") as HTMLInputElement;
  chapterInput.id = "chapter";
  chapterInput.value = "Test Chapter";

  document.body.appendChild(setSubjectInput);
  document.body.appendChild(questionInput);
  document.body.appendChild(answerInput);
  document.body.appendChild(chapterInput);

  createNewSet();

  expect(alert);

  document.body.removeChild(setSubjectInput);
  document.body.removeChild(questionInput);
  document.body.removeChild(answerInput);
  document.body.removeChild(chapterInput);

    });

    test('should display an error message if fields are null', () => {
      // set up the DOM elements with null values

      document.body.innerHTML = `
        <input type="text" id="subject" value="">
        <input type="text" id="front" value="">
        <input type="text" id="back" value="">
        <input type="text" id="chapter" value="">
      `;
    
      // call the function to be tested
      createNewSet();
    
      // assert that the error message is displayed
      expect(alert);
    });
  });



function createNewSet() {
  console.log("Create new set");
  const session = getSession();

  const setSubjectInput = document.getElementById("subject") as HTMLInputElement;
  const questionInput = document.getElementById("front") as HTMLInputElement;
  const answerInput = document.getElementById("back") as HTMLInputElement;
  const chapterInput = document.getElementById("chapter") as HTMLInputElement;

  const subject = setSubjectInput.value;
  const front = questionInput.value;
  const back = answerInput.value;
  const chapter = chapterInput.value;

  if (subject == null || subject == "" || front == null || front == "" || back == null || back == "" || chapter == null || chapter == "") {
    console.log("Fields cannot be empty");
    alert("Fields cannot be empty");
  }

  const data = {
    subject: subject,
    front: front,
    back: back,
    chapter: chapter
  }
  

  console.log( "Subject: " + subject);
  console.log("question: " + front);
  console.log("answer: " + back);
  console.log("chapter: " + chapter);

  const handleUpload = async () => {
    console.log("Upload card");

    fetch('/api/cards/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert("card created and sent to server");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error sending set to server");
      });
  }

  handleUpload();
}