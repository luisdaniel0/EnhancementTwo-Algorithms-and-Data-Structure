/**
 * Programmer: Luis Sanchez
 * Contact: luisanchezdh@gmail.com
 * Date: 10/03/2024
 * Version: 1.0
 * Purpose: This JavaScript file implements a Trivia App that quizzes users on various albums by artists. The app uses a Binary Search Tree (BST) to store the questions in      lexicographical order (by question text). The application allows users to play a trivia game and displays questions, answers, and scores based on user responses.
 * Issues: An improvement is needed to handle sorting questions more efficiently if new questions are dynamically added.
 */

let pos = 0;           // Tracks the position of the current question
let correct = 0;       // Tracks the number of correct answers
let test, test_status, question, choice, choices, chA, chB, chC, chD;
let playNowBtn = document.querySelector(".playNow");
let restartBtn = document.querySelector(".restart");
let questionImg = document.querySelector(".questionImg");
let questionContainer = document.querySelector(".questionContainer");
let test_ = document.querySelector(".test_");
let test_stat = document.querySelector(".test_stat");
let rules = document.querySelector(".rules");

/**
 * BSTNode class represents each node in the Binary Search Tree.
 * Each node stores a trivia question along with pointers to left and right child nodes.
 */
class BSTNode {
  constructor(question) {
    this.question = question;
    this.left = null;
    this.right = null;
  }
}

/**
 * BST class implements the Binary Search Tree for storing and retrieving trivia questions.
 * - insert(): Adds a new question to the BST.
 * - inOrderTraverse(): Traverses the tree and returns questions in lexicographical order.
 */
class BST {
  constructor() {
    this.root = null;
  }

  // Inserts a new question into the BST based on lexicographical order of the question text.
  insert(question) {
    const newNode = new BSTNode(question);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  // Helper method to insert a node into the BST.
  _insertNode(node, newNode) {
    if (newNode.question.question < node.question.question) {
      // Insert to the left if question text is lexicographically smaller.
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      // Insert to the right if question text is larger.
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  // Traverses the BST in lexicographical order and applies a callback to each question.
  inOrderTraverse(callback) {
    this._inOrderTraverseNode(this.root, callback);
  }

  _inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, callback);
      callback(node.question);
      this._inOrderTraverseNode(node.right, callback);
    }
  }
}

// Array of questions for the trivia app.
let questions = [
  // Question data (including question text, image, multiple choices, and correct answer).
  {
    question: "Illmatic (1994)",
    img: "img/IllmaticNas.jpeg",
    a: "Biggie",
    b: "Jay Z",
    c: "Drake",
    d: "Nas",
    answer: "D"
  },
  {
    question: "My Beautiful Dark Twisted Fantasy (2010)",
    img: "img/MBDTF.jpeg",
    a: "Drake",
    b: "Frank Ocean",
    c: "Andre 3000",
    d: "Kanye West",
    answer: "D"
  },
  {
    question: "Get Rich or Die Tryin (2003)",
    img: "img/Get-rich-or-die-tryin.jpeg",
    a: "50 cent",
    b: "Jadakiss",
    c: "DMX",
    d: "Lloyd Banks",
    answer: "A"
  },
  {
    question: "Come Home with Me (2002)",
    img: "img/come-home-with-me.jpeg",
    a: "Juelz Santana",
    b: "Lil wayne",
    c: "Cam'ron",
    d: "Eminem",
    answer: "C"
  },
  {
    question: "Tha Carter III (2008)",
    img: "img/Carter3.jpeg",
    a: "50 Cent", b:
      "Eminem", c:
      "Lil Wayne",
    d: "Drake",
    answer: "C"
  },
  {
    question: "Blond (2016)",
    img: "img/blond.jpeg",
    a: "The Weeknd",
    b: "Frank Ocean",
    c: "Steve Lacy",
    d: "Tyler, The Creator",
    answer: "B"
  },
  {
    question: "Trilogy (2012)",
    img: "img/trilogy.png",
    a: "Frank Ocean",
    b: "Chris Brown",
    c: "The Weeknd",
    d: "Drake",
    answer: "C"
  },
  {
    question: "17 (2017)",
    img: "img/17_xxxtentacion.png",
    a: "XXXTENTACION",
    b: "Kendrick lamar",
    c: "J.Cole",
    d: "Future",
    answer: "A"
  },
  {
    question: "The Life of Pablo (2016)",
    img: "img/The_life_of_pablo_alternate.jpeg",
    a: "Kid Cudi",
    b: "Travis Scott",
    c: "Kanye West",
    d: "Pablo Escobar",
    answer: "C"
  },
  {
    question: "Ready to Die (1994)",
    img: "img/Ready_To_Die.jpeg",
    a: "2pac",
    b: "The Notorious B.I.G.",
    c: "Big L",
    d: "Mase",
    answer: "B"
  }
];

// Create a new BST and insert all the trivia questions into it.
let bst = new BST();
questions.forEach(question => bst.insert(question));

// Retrieve sorted questions from the BST (alphabetical order).
let sortedQuestions = [];
bst.inOrderTraverse(question => sortedQuestions.push(question));

// Utility function to get an element by its ID.
function get(x) {
  return document.getElementById(x);
}

// Function to render each question onto the page when the game starts.
function renderQuestion() {
  playNowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    playNowBtn.classList.add("hide");
    rules.classList.add("hide");
    questionContainer.classList.remove("hide");
    questionImg.classList.remove("hide");
    test_.classList.remove("hide");
    test_stat.classList.remove("hide");
    restartBtn.classList.remove("hide");
  });

  test = get("test");
  if (pos >= sortedQuestions.length) {
    playNowBtn.classList.add("hidden");
    test.innerHTML = "<h2>You got a score of " + correct + "/100 </h2>";
    get("test_status").innerHTML = "Test completed";
    pos = 0;
    return false;
  }

  get("test_status").innerHTML = "Question " + (pos + 1) + " of " + sortedQuestions.length;

  question = sortedQuestions[pos].question;
  chA = sortedQuestions[pos].a;
  chB = sortedQuestions[pos].b;
  chC = sortedQuestions[pos].c;
  chD = sortedQuestions[pos].d;

  questionImg.src = sortedQuestions[pos].img;

  test.innerHTML = "<h3>" + question + "</h3";
  test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + chD + "</label><br><br>";
  test.innerHTML += "<button class='submit answer button' onclick='checkAnswer()'>Submit Answer</button>";
}

// Function to check if the selected answer is correct and increment the score.
function checkAnswer() {
  choices = document.getElementsByName("choices");
  for (let i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }

  if (choice == sortedQuestions[pos].answer) {
    correct = correct + 10;  // Increment score by 10 for each correct answer.
  }
  pos++;  // Move to the next question.
  renderQuestion();
}

// Event listener to start rendering the first question when the page loads.
window.addEventListener("load", renderQuestion);


