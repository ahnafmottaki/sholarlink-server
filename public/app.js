const STORAGE_KEY = "ssc-mcq-progress-v1";
const LETTERS = ["A", "B", "C", "D"];

const DIFFICULTY_ORDER = ["easy", "normal", "hard"];
const DIFFICULTY_META = {
  easy: {
    title: "Easy",
    description: "Start here. Finish this to unlock Normal.",
  },
  normal: {
    title: "Normal",
    description: "Balanced SSC-style practice with moderate challenge.",
  },
  hard: {
    title: "Hard",
    description: "Final unlock with the toughest set of MCQs.",
  },
};

const RESULTS_META = [
  {
    minScore: 27,
    title: "Cheerful performance",
    message:
      "Excellent work. You handled this set with strong confidence and exam rhythm.",
  },
  {
    minScore: 24,
    title: "Good performance",
    message:
      "Very solid result. A little more revision can push you into the top band.",
  },
  {
    minScore: 20,
    title: "Okay performance",
    message:
      "You are on the right track. Revise weak areas and give the next paper again.",
  },
  {
    minScore: 0,
    title: "Need more practice",
    message:
      "Read the chapter again, practice more MCQs, and return for another attempt.",
  },
];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}`;
}

function buildQuestion(id, text, correctAnswer, wrongAnswers) {
  const options = shuffle([
    { key: createId(), text: correctAnswer, isCorrect: true },
    ...wrongAnswers.map((answer) => ({
      key: createId(),
      text: answer,
      isCorrect: false,
    })),
  ]).map((option, index) => ({
    ...option,
    label: LETTERS[index],
  }));

  return { id, text, options };
}

function arithmeticQuestions(difficulty) {
  const questions = [];

  if (difficulty === "easy") {
    for (let n = 1; n <= 10; n += 1) {
      const a = 10 + n * 2;
      const b = 4 + n;
      const correct = a + b;
      questions.push(buildQuestion(`math-arithmetic-easy-sum-${n}`, `What is ${a} + ${b}?`, String(correct), [String(correct + 1), String(correct - 1), String(correct + 2)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const total = 40 + n * 5;
      const percent = 10 + n;
      const correct = (total * percent) / 100;
      questions.push(buildQuestion(`math-arithmetic-easy-percent-${n}`, `What is ${percent}% of ${total}?`, String(correct), [String(correct + 2), String(correct - 2), String(correct + 5)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const base = 6 + n;
      const multiplier = 2 + (n % 4);
      const correct = base * multiplier;
      questions.push(buildQuestion(`math-arithmetic-easy-mul-${n}`, `What is ${base} × ${multiplier}?`, String(correct), [String(correct + multiplier), String(correct - multiplier), String(correct + 3)]));
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 10; n += 1) {
      const cost = 200 + n * 25;
      const discount = 10 + (n % 5) * 5;
      const correct = cost - (cost * discount) / 100;
      questions.push(buildQuestion(`math-arithmetic-normal-discount-${n}`, `A book costs ${cost} taka. After a ${discount}% discount, what is the sale price?`, String(correct), [String(correct + 10), String(correct - 10), String(cost)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const distance = 60 + n * 6;
      const time = 2 + (n % 4);
      const correct = distance / time;
      questions.push(buildQuestion(`math-arithmetic-normal-speed-${n}`, `A cyclist covers ${distance} km in ${time} hours. What is the average speed?`, `${correct} km/h`, [`${correct + 4} km/h`, `${correct - 4} km/h`, `${correct + 2} km/h`]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const principal = 1000 + n * 200;
      const rate = 5 + (n % 4);
      const years = 2 + (n % 3);
      const correct = (principal * rate * years) / 100;
      questions.push(buildQuestion(`math-arithmetic-normal-interest-${n}`, `What is the simple interest on ${principal} taka at ${rate}% for ${years} years?`, String(correct), [String(correct + 50), String(correct - 50), String(principal)]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 10; n += 1) {
      const ratioA = 2 + (n % 5);
      const ratioB = 3 + (n % 4);
      const total = (ratioA + ratioB) * (12 + n);
      const correct = (total * ratioA) / (ratioA + ratioB);
      questions.push(buildQuestion(`math-arithmetic-hard-ratio-${n}`, `Two numbers are in the ratio ${ratioA}:${ratioB} and their sum is ${total}. What is the first number?`, String(correct), [String(correct + 6), String(correct - 6), String(total - correct)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const first = 8 + n;
      const diff = 3 + (n % 4);
      const terms = 5 + (n % 5);
      const correct = (terms / 2) * (2 * first + (terms - 1) * diff);
      questions.push(buildQuestion(`math-arithmetic-hard-ap-${n}`, `Find the sum of the first ${terms} terms of an AP where the first term is ${first} and common difference is ${diff}.`, String(correct), [String(correct + 10), String(correct - 10), String(first * terms)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const total = 240 + n * 18;
      const boysPercent = 45 + (n % 5) * 5;
      const girls = total - (total * boysPercent) / 100;
      questions.push(buildQuestion(`math-arithmetic-hard-population-${n}`, `In a school of ${total} students, ${boysPercent}% are boys. How many are girls?`, String(girls), [String(girls + 12), String(girls - 12), String(total / 2)]));
    }
  }

  return questions;
}

function algebraQuestions(difficulty) {
  const questions = [];

  if (difficulty === "easy") {
    for (let n = 1; n <= 15; n += 1) {
      const x = 2 + n;
      const constant = 3 + (n % 4);
      const result = x + constant;
      questions.push(buildQuestion(`math-algebra-easy-eval-${n}`, `If x = ${x}, what is x + ${constant}?`, String(result), [String(result + 1), String(result - 1), String(x * constant)]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const x = 4 + n;
      const coefficient = 2 + (n % 3);
      const result = coefficient * x;
      questions.push(buildQuestion(`math-algebra-easy-expression-${n}`, `If x = ${x}, what is ${coefficient}x?`, String(result), [String(result + coefficient), String(result - coefficient), String(x + coefficient)]));
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 15; n += 1) {
      const answer = 3 + n;
      const add = 2 + (n % 4);
      const total = answer + add;
      questions.push(buildQuestion(`math-algebra-normal-solve-${n}`, `Solve: x + ${add} = ${total}`, String(answer), [String(answer + 2), String(answer - 2), String(total)]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const answer = 4 + n;
      const coefficient = 2 + (n % 4);
      const total = coefficient * answer;
      questions.push(buildQuestion(`math-algebra-normal-linear-${n}`, `Solve: ${coefficient}x = ${total}`, String(answer), [String(answer + 1), String(answer - 1), String(total / 2)]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 15; n += 1) {
      const answer = 2 + n;
      const left = 2 + (n % 4);
      const right = 3 + (n % 5);
      const constant = right * answer - left;
      questions.push(buildQuestion(`math-algebra-hard-balance-${n}`, `Solve: x + ${left} = ${right}x - ${constant}`, String(answer), [String(answer + 2), String(answer - 1), String(right)]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const answer = 1 + n;
      const factor = 2 + (n % 3);
      const constant = factor * answer * answer;
      questions.push(buildQuestion(`math-algebra-hard-square-${n}`, `If ${factor}x² = ${constant} and x is positive, what is x?`, String(answer), [String(answer + 1), String(answer + 2), String(answer - 1)]));
    }
  }

  return questions;
}

function geometryQuestions(difficulty) {
  const questions = [];

  if (difficulty === "easy") {
    for (let n = 1; n <= 15; n += 1) {
      const length = 4 + n;
      const width = 2 + (n % 5);
      const correct = 2 * (length + width);
      questions.push(buildQuestion(`math-geometry-easy-perimeter-${n}`, `What is the perimeter of a rectangle with length ${length} cm and width ${width} cm?`, `${correct} cm`, [`${correct + 2} cm`, `${correct - 2} cm`, `${length * width} cm`]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const side = 3 + n;
      const correct = side * side;
      questions.push(buildQuestion(`math-geometry-easy-area-${n}`, `What is the area of a square with side ${side} cm?`, `${correct} sq cm`, [`${correct + side} sq cm`, `${correct - side} sq cm`, `${side * 4} sq cm`]));
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 15; n += 1) {
      const base = 8 + n;
      const height = 5 + (n % 4);
      const correct = (base * height) / 2;
      questions.push(buildQuestion(`math-geometry-normal-triangle-${n}`, `Find the area of a triangle with base ${base} cm and height ${height} cm.`, `${correct} sq cm`, [`${correct + 4} sq cm`, `${correct - 4} sq cm`, `${base * height} sq cm`]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const angle = 20 + n * 2;
      const correct = 180 - angle;
      questions.push(buildQuestion(`math-geometry-normal-line-${n}`, `Two adjacent angles on a straight line sum to 180°. If one angle is ${angle}°, the other is:`, `${correct}°`, [`${correct + 10}°`, `${correct - 10}°`, `${angle}°`]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 15; n += 1) {
      const radius = 4 + n;
      const correct = 2 * 3.1416 * radius;
      questions.push(buildQuestion(`math-geometry-hard-circle-${n}`, `Using π = 3.1416, what is the circumference of a circle with radius ${radius} cm?`, `${correct.toFixed(2)} cm`, [`${(correct + 6.28).toFixed(2)} cm`, `${(correct - 6.28).toFixed(2)} cm`, `${(3.1416 * radius * radius).toFixed(2)} cm`]));
    }
    for (let n = 1; n <= 15; n += 1) {
      const x = 20 + n;
      const correct = x / 2;
      questions.push(buildQuestion(`math-geometry-hard-angles-${n}`, `An isosceles triangle has equal angles that are half of ${x}°. What is one equal angle?`, `${correct}°`, [`${correct + 5}°`, `${correct - 5}°`, `${x}°`]));
    }
  }

  return questions;
}

function physicsQuestions(difficulty) {
  const questions = [];
  const easyFacts = [
    ["The SI unit of force is", "Newton", ["Joule", "Watt", "Pascal"]],
    ["Light travels fastest in", "Vacuum", ["Water", "Glass", "Air"]],
    ["The instrument used to measure temperature is", "Thermometer", ["Ammeter", "Barometer", "Voltmeter"]],
    ["The energy stored in food is mainly", "Chemical energy", ["Sound energy", "Light energy", "Magnetic energy"]],
    ["The motion of a fan blade is an example of", "Circular motion", ["Rectilinear motion", "Random motion", "Oscillatory motion"]],
  ];

  if (difficulty === "easy") {
    for (let n = 0; n < 6; n += 1) {
      easyFacts.forEach(([text, correct, wrong], index) => {
        questions.push(buildQuestion(`science-physics-easy-${n}-${index}`, `${text}?`, correct, wrong));
      });
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 10; n += 1) {
      const distance = 20 + n * 4;
      const time = 2 + (n % 4);
      const correct = distance / time;
      questions.push(buildQuestion(`science-physics-normal-speed-${n}`, `A body moves ${distance} m in ${time} s. What is its speed?`, `${correct} m/s`, [`${correct + 2} m/s`, `${correct - 2} m/s`, `${distance} m/s`]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const mass = 2 + n;
      const acceleration = 2 + (n % 3);
      const correct = mass * acceleration;
      questions.push(buildQuestion(`science-physics-normal-force-${n}`, `Find the force on a ${mass} kg object accelerating at ${acceleration} m/s².`, `${correct} N`, [`${correct + 2} N`, `${correct - 2} N`, `${mass + acceleration} N`]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const voltage = 6 + n;
      const current = 1 + (n % 4);
      const correct = voltage * current;
      questions.push(buildQuestion(`science-physics-normal-power-${n}`, `An appliance uses ${voltage} V and ${current} A. What is the power?`, `${correct} W`, [`${correct + 4} W`, `${correct - 4} W`, `${voltage + current} W`]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 10; n += 1) {
      const mass = 4 + n;
      const velocity = 3 + (n % 5);
      const correct = 0.5 * mass * velocity * velocity;
      questions.push(buildQuestion(`science-physics-hard-ke-${n}`, `What is the kinetic energy of a ${mass} kg body moving at ${velocity} m/s?`, `${correct} J`, [`${correct + 10} J`, `${correct - 10} J`, `${mass * velocity} J`]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const resistance = 2 + n;
      const current = 1 + (n % 4);
      const correct = resistance * current;
      questions.push(buildQuestion(`science-physics-hard-ohm-${n}`, `Using Ohm's law, what is the potential difference across ${resistance} Ω if current is ${current} A?`, `${correct} V`, [`${correct + 2} V`, `${correct - 2} V`, `${resistance + current} V`]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const objectDistance = 8 + n;
      const focalLength = 4;
      const correct = 1 / (1 / focalLength - 1 / objectDistance);
      questions.push(buildQuestion(`science-physics-hard-lens-${n}`, `For a convex lens with focal length ${focalLength} cm and object distance ${objectDistance} cm, the image distance is closest to:`, `${correct.toFixed(2)} cm`, [`${(correct + 1.5).toFixed(2)} cm`, `${(correct - 1.5).toFixed(2)} cm`, `${(objectDistance - focalLength).toFixed(2)} cm`]));
    }
  }

  return questions;
}

function chemistryQuestions(difficulty) {
  const questions = [];
  const easyFacts = [
    ["Water is made of", "Hydrogen and oxygen", ["Carbon and oxygen", "Nitrogen and hydrogen", "Calcium and oxygen"]],
    ["The pH of a neutral solution is", "7", ["5", "9", "14"]],
    ["The gas essential for breathing is", "Oxygen", ["Nitrogen", "Hydrogen", "Helium"]],
    ["Rusting mainly affects", "Iron", ["Copper", "Gold", "Silver"]],
    ["The chemical symbol of sodium is", "Na", ["So", "S", "Sn"]],
  ];

  if (difficulty === "easy") {
    for (let n = 0; n < 6; n += 1) {
      easyFacts.forEach(([text, correct, wrong], index) => {
        questions.push(buildQuestion(`science-chemistry-easy-${n}-${index}`, `${text}?`, correct, wrong));
      });
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 10; n += 1) {
      const atoms = 2 + (n % 4);
      questions.push(buildQuestion(`science-chemistry-normal-molecule-${n}`, `How many hydrogen atoms are there in ${atoms}H₂O?`, String(atoms * 2), [String(atoms), String(atoms + 2), String(atoms * 3)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const temp = 20 + n * 5;
      questions.push(buildQuestion(`science-chemistry-normal-state-${n}`, `At ${temp}°C, water is usually in which state?`, "Liquid", ["Solid", "Gas", "Plasma"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-chemistry-normal-neutral-${n}`, "When equal effective amounts of acid and base react, the resulting solution tends to be:", "Neutral", ["Strongly acidic", "Strongly basic", "Always gaseous"]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 10; n += 1) {
      const protons = 8 + n;
      questions.push(buildQuestion(`science-chemistry-hard-atomic-${n}`, `If an atom has ${protons} protons and is neutral, how many electrons does it have?`, String(protons), [String(protons + 1), String(protons - 1), String(protons * 2)]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const ph = 2 + (n % 5);
      questions.push(buildQuestion(`science-chemistry-hard-acidity-${n}`, `A solution with pH ${ph} is best described as:`, "Acidic", ["Basic", "Neutral", "Always salty"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      const mass = 18 + n * 2;
      questions.push(buildQuestion(`science-chemistry-hard-conservation-${n}`, `In a closed reaction vessel, if reactants have a total mass of ${mass} g, the products will have mass:`, `${mass} g`, [`${mass - 2} g`, `${mass + 2} g`, `${mass / 2} g`]));
    }
  }

  return questions;
}

function biologyQuestions(difficulty) {
  const questions = [];
  const easyFacts = [
    ["The basic unit of life is", "Cell", ["Tissue", "Organ", "Atom"]],
    ["Plants make food by", "Photosynthesis", ["Respiration", "Digestion", "Fermentation"]],
    ["The organ that pumps blood is", "Heart", ["Lung", "Liver", "Brain"]],
    ["The green pigment in leaves is", "Chlorophyll", ["Hemoglobin", "Melanin", "Keratin"]],
    ["Bones and muscles together help in", "Movement", ["Photosynthesis", "Digestion of plants", "Blood purification"]],
  ];

  if (difficulty === "easy") {
    for (let n = 0; n < 6; n += 1) {
      easyFacts.forEach(([text, correct, wrong], index) => {
        questions.push(buildQuestion(`science-biology-easy-${n}-${index}`, `${text}?`, correct, wrong));
      });
    }
  }

  if (difficulty === "normal") {
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-biology-normal-photosynthesis-${n}`, "Which factor is directly necessary for photosynthesis?", "Sunlight", ["Sound", "Gravity only", "Dry soil only"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-biology-normal-circulation-${n}`, "Which blood vessel carries blood away from the heart?", "Artery", ["Vein", "Capillary", "Neuron"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-biology-normal-respiration-${n}`, "During respiration, cells mainly release:", "Energy", ["Chlorophyll", "Nitrogen only", "Bone tissue"]));
    }
  }

  if (difficulty === "hard") {
    for (let n = 1; n <= 10; n += 1) {
      const pulse = 60 + n * 2;
      questions.push(buildQuestion(`science-biology-hard-pulse-${n}`, `A student has a pulse rate of ${pulse} beats per minute. Pulse mainly indicates the activity of the:`, "Heart", ["Stomach", "Kidney", "Skin"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-biology-hard-foodchain-${n}`, "In a food chain, green plants are called:", "Producers", ["Consumers", "Decomposers", "Predators"]));
    }
    for (let n = 1; n <= 10; n += 1) {
      questions.push(buildQuestion(`science-biology-hard-heredity-${n}`, "The carriers of hereditary information are mainly:", "Genes", ["Ribosomes", "Veins", "Hormones"]));
    }
  }

  return questions;
}

const SUBJECTS = [
  {
    id: "general-math",
    title: "General Math",
    description: "Algebra, arithmetic, geometry, and SSC-style mixed practice.",
    chapters: [
      {
        id: "arithmetic",
        title: "Arithmetic",
        description: "Percentage, ratio, interest, averages, and number problems.",
        getQuestions: arithmeticQuestions,
      },
      {
        id: "algebra",
        title: "Algebra",
        description: "Expressions, equations, and symbolic reasoning.",
        getQuestions: algebraQuestions,
      },
      {
        id: "geometry",
        title: "Geometry",
        description: "Perimeter, area, angles, triangles, and circles.",
        getQuestions: geometryQuestions,
      },
    ],
  },
  {
    id: "general-science",
    title: "General Science",
    description: "Physics, chemistry, biology, and whole-book SSC mock tests.",
    chapters: [
      {
        id: "physics",
        title: "Physics Basics",
        description: "Motion, force, energy, electricity, and light.",
        getQuestions: physicsQuestions,
      },
      {
        id: "chemistry",
        title: "Chemistry Basics",
        description: "Atoms, molecules, reactions, acidity, and matter.",
        getQuestions: chemistryQuestions,
      },
      {
        id: "biology",
        title: "Biology Basics",
        description: "Cells, plants, body systems, respiration, and heredity.",
        getQuestions: biologyQuestions,
      },
    ],
  },
];

const state = {
  selectedSubjectId: null,
  selectedScope: null,
  progress: loadProgress(),
  exam: null,
  timerInterval: null,
};

const subjectList = document.getElementById("subjectList");
const scopeList = document.getElementById("scopeList");
const difficultyList = document.getElementById("difficultyList");
const progressSummary = document.getElementById("progressSummary");
const selectionBadge = document.getElementById("selectionBadge");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownValue = document.getElementById("countdownValue");
const examOverlay = document.getElementById("examOverlay");
const examMeta = document.getElementById("examMeta");
const examTitle = document.getElementById("examTitle");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionList = document.getElementById("optionList");
const questionProgress = document.getElementById("questionProgress");
const timerLabel = document.getElementById("timerLabel");
const timerBar = document.getElementById("timerBar");
const resultOverlay = document.getElementById("resultOverlay");
const resultHeading = document.getElementById("resultHeading");
const resultScore = document.getElementById("resultScore");
const resultMessage = document.getElementById("resultMessage");
const resultBreakdown = document.getElementById("resultBreakdown");
const closeResultBtn = document.getElementById("closeResultBtn");
const exitExamBtn = document.getElementById("exitExamBtn");
const resetProgressBtn = document.getElementById("resetProgressBtn");

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch (error) {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function getScopeKey(subjectId, scope) {
  return `${subjectId}:${scope.type}:${scope.id}`;
}

function getScopeProgress(subjectId, scope) {
  return state.progress[getScopeKey(subjectId, scope)] ?? {
    completed: [],
    unlocked: ["easy"],
    attempts: 0,
    bestScore: {},
    history: [],
  };
}

function getSelectedSubject() {
  return SUBJECTS.find((subject) => subject.id === state.selectedSubjectId) ?? null;
}

function getResultMeta(score) {
  return RESULTS_META.find((entry) => score >= entry.minScore) ?? RESULTS_META.at(-1);
}

function setSelectedSubject(subjectId) {
  state.selectedSubjectId = subjectId;
  state.selectedScope = null;
  renderSubjects();
  renderScopes();
  renderDifficulties();
  renderProgressSummary();
}

function setSelectedScope(scope) {
  state.selectedScope = scope;
  selectionBadge.textContent = scope.type === "whole-book" ? "Whole Book Mock" : scope.title;
  selectionBadge.classList.remove("hidden");
  renderScopes();
  renderDifficulties();
  renderProgressSummary();
}

function renderSubjects() {
  subjectList.innerHTML = "";
  SUBJECTS.forEach((subject) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `subject-card ${subject.id === state.selectedSubjectId ? "active" : ""}`;
    button.innerHTML = `
      <h3>${subject.title}</h3>
      <p>${subject.description}</p>
      <div class="scope-meta">
        <span class="tag">${subject.chapters.length} chapters</span>
        <span class="tag">Whole-book mock</span>
      </div>
    `;
    button.addEventListener("click", () => setSelectedSubject(subject.id));
    subjectList.appendChild(button);
  });
}

function renderScopes() {
  const subject = getSelectedSubject();
  if (!subject) {
    scopeList.className = "scope-grid empty-state";
    scopeList.textContent = "Select a subject to view chapters and the whole-book mock exam.";
    selectionBadge.classList.add("hidden");
    return;
  }

  const scopes = [
    ...subject.chapters.map((chapter) => ({
      type: "chapter",
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
    })),
    {
      type: "whole-book",
      id: "whole-book",
      title: "Whole Book Exam",
      description: "30 mixed MCQs in SSC question style across the full subject.",
    },
  ];

  scopeList.className = "scope-grid";
  scopeList.innerHTML = "";

  scopes.forEach((scope) => {
    const progress = getScopeProgress(subject.id, scope);
    const best = Math.max(...Object.values(progress.bestScore), 0);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `scope-card ${state.selectedScope?.id === scope.id && state.selectedScope?.type === scope.type ? "active" : ""}`;
    card.innerHTML = `
      <h3>${scope.title}</h3>
      <p>${scope.description}</p>
      <div class="scope-meta">
        <span class="tag">${progress.completed.length}/3 completed</span>
        <span class="tag">Best ${best}/30</span>
      </div>
    `;
    card.addEventListener("click", () => setSelectedScope(scope));
    scopeList.appendChild(card);
  });
}

function renderDifficulties() {
  const subject = getSelectedSubject();
  const scope = state.selectedScope;

  if (!subject || !scope) {
    difficultyList.className = "difficulty-grid empty-state";
    difficultyList.textContent = "Choose a chapter or whole-book exam first.";
    return;
  }

  const progress = getScopeProgress(subject.id, scope);
  difficultyList.className = "difficulty-grid";
  difficultyList.innerHTML = "";

  DIFFICULTY_ORDER.forEach((difficulty) => {
    const locked = !progress.unlocked.includes(difficulty);
    const completed = progress.completed.includes(difficulty);
    const best = progress.bestScore[difficulty];

    const card = document.createElement("article");
    card.className = `difficulty-card ${difficulty} ${locked ? "locked" : ""}`;
    card.innerHTML = `
      <div class="panel-header">
        <div>
          <p class="eyebrow">${DIFFICULTY_META[difficulty].title}</p>
          <h3>30 MCQs</h3>
        </div>
        <h4>${completed ? "Done" : locked ? "Lock" : "Open"}</h4>
      </div>
      <p>${DIFFICULTY_META[difficulty].description}</p>
      <div class="difficulty-meta">
        <span class="tag">1 minute per question</span>
        <span class="tag">${completed ? `Best score ${best ?? 0}/30` : "No result yet"}</span>
      </div>
      <div class="difficulty-meta">
        <button class="primary-btn" type="button" ${locked ? "disabled" : ""}>
          ${completed ? "Try again" : "Start exam"}
        </button>
      </div>
    `;

    const startButton = card.querySelector("button");
    startButton.addEventListener("click", () => {
      if (!locked) {
        prepareExam(subject, scope, difficulty);
      }
    });
    difficultyList.appendChild(card);
  });
}

function renderProgressSummary() {
  const subject = getSelectedSubject();
  const scope = state.selectedScope;

  if (!subject || !scope) {
    progressSummary.className = "progress-summary empty-state";
    progressSummary.textContent = "Your completed exams, unlocked difficulties, and best scores will appear here.";
    return;
  }

  const progress = getScopeProgress(subject.id, scope);
  const totalBest = Math.max(...Object.values(progress.bestScore), 0);
  const lastAttempt = progress.history.at(-1);

  progressSummary.className = "progress-summary";
  progressSummary.innerHTML = `
    <article class="summary-chip">
      <h3>Unlocked</h3>
      <div class="summary-row">
        ${progress.unlocked.map((item) => `<span class="mini-pill">${DIFFICULTY_META[item].title}</span>`).join("")}
      </div>
    </article>
    <article class="summary-chip">
      <h3>Completed</h3>
      <div class="summary-row">
        ${progress.completed.length ? progress.completed.map((item) => `<span class="mini-pill">${DIFFICULTY_META[item].title}</span>`).join("") : '<span class="mini-pill">No exams completed yet</span>'}
      </div>
    </article>
    <article class="summary-chip">
      <h3>Attempts</h3>
      <p>${progress.attempts} exam${progress.attempts === 1 ? "" : "s"} on this device</p>
    </article>
    <article class="summary-chip">
      <h3>Best Score</h3>
      <p>${totalBest}/30</p>
    </article>
    <article class="summary-chip">
      <h3>Last Result</h3>
      <p>${lastAttempt ? `${DIFFICULTY_META[lastAttempt.difficulty].title} - ${lastAttempt.score}/30` : "No result saved yet"}</p>
    </article>
  `;
}

function getQuestionsForScope(subject, scope, difficulty) {
  if (scope.type === "whole-book") {
    return shuffle(subject.chapters.flatMap((chapter) => chapter.getQuestions(difficulty))).slice(0, 30);
  }

  const chapter = subject.chapters.find((item) => item.id === scope.id);
  return chapter ? chapter.getQuestions(difficulty).slice(0, 30) : [];
}

function prepareExam(subject, scope, difficulty) {
  state.exam = {
    subjectId: subject.id,
    subjectTitle: subject.title,
    scope,
    difficulty,
    questions: getQuestionsForScope(subject, scope, difficulty),
    currentIndex: 0,
    answers: Array(30).fill(null),
    questionStartedAt: null,
    questionDurationMs: 60_000,
  };

  let count = 3;
  countdownValue.textContent = String(count);
  countdownOverlay.classList.remove("hidden");

  const countdownTimer = setInterval(() => {
    count -= 1;
    if (count > 0) {
      countdownValue.textContent = String(count);
      return;
    }
    clearInterval(countdownTimer);
    countdownOverlay.classList.add("hidden");
    startExam();
  }, 1000);
}

function startExam() {
  examOverlay.classList.remove("hidden");
  examMeta.textContent = `${state.exam.subjectTitle} • ${state.exam.scope.title}`;
  examTitle.textContent = `${DIFFICULTY_META[state.exam.difficulty].title} exam`;
  renderQuestion();
  startQuestionTimer();
}

function startQuestionTimer() {
  clearInterval(state.timerInterval);
  state.exam.questionStartedAt = Date.now();
  updateTimer();

  state.timerInterval = setInterval(() => {
    updateTimer();
    if (Date.now() - state.exam.questionStartedAt >= state.exam.questionDurationMs) {
      finishExam(true);
    }
  }, 250);
}

function updateTimer() {
  const elapsed = Date.now() - state.exam.questionStartedAt;
  const remaining = Math.max(state.exam.questionDurationMs - elapsed, 0);
  const percent = (remaining / state.exam.questionDurationMs) * 100;
  timerLabel.textContent = `${Math.ceil(remaining / 1000)}s`;
  timerBar.style.width = `${percent}%`;
}

function renderQuestionProgress() {
  questionProgress.innerHTML = "";
  state.exam.questions.forEach((_, index) => {
    const pill = document.createElement("div");
    pill.className = `progress-pill ${state.exam.answers[index] ? "done" : ""} ${index === state.exam.currentIndex ? "current" : ""}`;
    pill.textContent = state.exam.answers[index] ? "✓" : String(index + 1);
    questionProgress.appendChild(pill);
  });
}

function renderQuestion() {
  const question = state.exam.questions[state.exam.currentIndex];
  questionNumber.textContent = `Question ${state.exam.currentIndex + 1} of ${state.exam.questions.length}`;
  questionText.textContent = question.text;
  optionList.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.innerHTML = `<span class="option-key">${option.label}</span><span>${option.text}</span>`;
    button.addEventListener("click", () => selectAnswer(option.key));
    optionList.appendChild(button);
  });

  renderQuestionProgress();
}

function selectAnswer(optionKey) {
  const question = state.exam.questions[state.exam.currentIndex];
  const selectedOption = question.options.find((option) => option.key === optionKey);

  state.exam.answers[state.exam.currentIndex] = {
    questionId: question.id,
    selectedKey: optionKey,
    isCorrect: Boolean(selectedOption?.isCorrect),
    elapsedMs: Date.now() - state.exam.questionStartedAt,
  };

  if (state.exam.currentIndex === state.exam.questions.length - 1) {
    finishExam(false);
    return;
  }

  state.exam.currentIndex += 1;
  renderQuestion();
  startQuestionTimer();
}

function finishExam(timedOut) {
  clearInterval(state.timerInterval);

  const answeredCount = state.exam.answers.filter(Boolean).length;
  const score = state.exam.answers.filter((answer) => answer?.isCorrect).length;
  const resultMeta = getResultMeta(score);
  const progress = getScopeProgress(state.exam.subjectId, state.exam.scope);

  progress.attempts += 1;
  progress.bestScore[state.exam.difficulty] = Math.max(progress.bestScore[state.exam.difficulty] ?? 0, score);

  if (!progress.completed.includes(state.exam.difficulty)) {
    progress.completed.push(state.exam.difficulty);
  }

  const completedIndex = DIFFICULTY_ORDER.indexOf(state.exam.difficulty);
  if (completedIndex < DIFFICULTY_ORDER.length - 1) {
    const nextDifficulty = DIFFICULTY_ORDER[completedIndex + 1];
    if (!progress.unlocked.includes(nextDifficulty)) {
      progress.unlocked.push(nextDifficulty);
    }
  }

  progress.history.push({
    difficulty: state.exam.difficulty,
    score,
    answeredCount,
    timedOut,
    takenAt: new Date().toISOString(),
  });

  state.progress[getScopeKey(state.exam.subjectId, state.exam.scope)] = progress;
  saveProgress();

  resultHeading.textContent = resultMeta.title;
  resultScore.textContent = `${score} / 30`;
  resultMessage.textContent = timedOut ? `${resultMeta.message} Time ended before the full paper was completed.` : resultMeta.message;
  resultBreakdown.innerHTML = `
    <span class="mini-pill">${state.exam.subjectTitle}</span>
    <span class="mini-pill">${state.exam.scope.title}</span>
    <span class="mini-pill">${DIFFICULTY_META[state.exam.difficulty].title}</span>
    <span class="mini-pill">${answeredCount} answered</span>
    <span class="mini-pill">${30 - answeredCount} unanswered</span>
  `;

  examOverlay.classList.add("hidden");
  resultOverlay.classList.remove("hidden");
  state.exam = null;
  renderScopes();
  renderDifficulties();
  renderProgressSummary();
}

function closeResult() {
  resultOverlay.classList.add("hidden");
}

function exitExam() {
  if (!state.exam) {
    return;
  }
  if (window.confirm("End this exam now and see the current result?")) {
    finishExam(false);
  }
}

function resetProgress() {
  if (!window.confirm("Delete all saved progress from this browser?")) {
    return;
  }
  state.progress = {};
  saveProgress();
  renderScopes();
  renderDifficulties();
  renderProgressSummary();
}

closeResultBtn.addEventListener("click", closeResult);
exitExamBtn.addEventListener("click", exitExam);
resetProgressBtn.addEventListener("click", resetProgress);

renderSubjects();
renderScopes();
renderDifficulties();
renderProgressSummary();
