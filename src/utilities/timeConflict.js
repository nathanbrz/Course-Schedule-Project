const testCourses = [
  {
    F101: {
      term: "Fall",
      number: "101",
      meets: "MWF 11:00-11:50",
      title: "Computer Science: Concepts, Philosophy, and Connections",
    },
    F110: {
      term: "Fall",
      number: "110",
      meets: "MWF 10:00-10:50",
      title: "Intro Programming for non-majors",
    },
    F111: {
      term: "Fall",
      number: "111",
      meets: "MWF 13:00-13:50",
      title: "Fundamentals of Computer Programming I",
    },
    F211: {
      term: "Fall",
      number: "211",
      meets: "MWF 12:30-13:50",
      title: "Fundamentals of Computer Programming II",
    },
    F212: {
      term: "Fall",
      number: "212",
      meets: "MWF 15:00-15:50",
      title: "Discrete Math",
    },
  },
  {
    F213: {
      term: "Fall",
      number: "213",
      meets: "MWF 9:00-9:50",
      title: "Data Structures",
    },
    F310: {
      term: "Fall",
      number: "310",
      meets: "TuTh 14:00-15:20",
      title: "Operating Systems",
    },
    F311: {
      term: "Fall",
      number: "311",
      meets: "TuTh 15:30-16:50",
      title: "Algorithms",
    },
    F410: {
      term: "Fall",
      number: "410",
      meets: "MWF 10:00-11:20",
      title: "Artificial Intelligence",
    },
    F411: {
      term: "Fall",
      number: "411",
      meets: "MWF 11:30-12:50",
      title: "Machine Learning",
    },
  },
  {
    W101: {
      term: "Winter",
      number: "101",
      meets: "MWF 10:00-10:50",
      title: "Intro to Computer Science",
    },
    W110: {
      term: "Winter",
      number: "110",
      meets: "TuTh 09:00-10:20",
      title: "Introduction to Java",
    },
    W210: {
      term: "Winter",
      number: "210",
      meets: "MWF 13:00-14:20",
      title: "Database Systems",
    },
    W211: {
      term: "Winter",
      number: "211",
      meets: "",
      title: "Computer Graphics",
    },
    W311: {
      term: "Winter",
      number: "311",
      meets: "TuTh 14:00-15:20",
      title: "Web Development",
    },
  },
  {
    S101: {
      term: "Spring",
      number: "101",
      meets: "MWF 11:00-12:00",
      title: "Introduction to Python",
    },
    S110: {
      term: "Spring",
      number: "110",
      meets: "MWF 12:00-13:00",
      title: "Advanced Python",
    },
    S111: {
      term: "Spring",
      number: "111",
      meets: "TuTh 14:00-15:20",
      title: "Software Engineering",
    },
    S210: {
      term: "Spring",
      number: "210",
      meets: "TuTh 10:30-11:50",
      title: "Computer Networks",
    },
    S211: {
      term: "Spring",
      number: "211",
      meets: "",
      title: "Special Topics in Computer Science",
    },
  },
];

// Function to deconstruct the 'meets' string into days and time range
function meetDeconstruct(meetString) {
  if (!meetString) return null;

  const days = meetString.match(/[A-Za-z]+/g)[0];
  const times = meetString.match(/\d{1,2}:\d{2}/g);

  // Convert time into a comparable number (in minutes)
  const startTime = convertToMinutes(times[0]);
  const endTime = convertToMinutes(times[1]);

  return {
    days,
    startTime,
    endTime,
  };
}

// Helper function to convert time (e.g., "11:00") into minutes since 00:00
function convertToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Function to compare two classes and determine if they have a time conflict
export default function classConflict(classA, classB) {
  // First check if the classes are in the same term
  if (classA.term !== classB.term) {
    return false; // No conflict if they are in different terms
  }

  // Deconstruct the 'meets' property of both classes
  const meetA = meetDeconstruct(classA.meets);
  const meetB = meetDeconstruct(classB.meets);

  // If either of the meet times is missing, there's no conflict
  if (!meetA || !meetB) return false;

  // Check if they meet on any common days
  const commonDays = meetA.days
    .split("")
    .some((day) => meetB.days.includes(day));
  if (!commonDays) return false;

  // Check for time overlap
  const timeOverlap =
    meetA.startTime < meetB.endTime && meetA.endTime > meetB.startTime;

  return timeOverlap;
}

// // Example usage
// const courseA = testCourses[0].F101; // "MWF 11:00-11:50"
// const courseB = testCourses[1].F410; // "MWF 10:00-11:20"

// console.log("Testing");
// console.log(classConflict(courseA, courseB)); // true or false based on conflict
