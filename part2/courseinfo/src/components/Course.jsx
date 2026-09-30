const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => 
  parts.map(part => (
    <Part 
      key = {part.id}
      name = {part.name} 
      exercises={part.exercises}
    />
  ))

const Total = ({parts}) => 
  <p>
    <b>total of {parts.reduce((acc,part) => acc + part.exercises, 0)} exercises</b>
  </p>

const Course = ({course}) => (
  <div >
    <Header name = {course.name} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
  </div>
)

export default Course  