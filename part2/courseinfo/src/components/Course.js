import Header from "./Header";
import Part from "./Part"
import Total from "./Total";

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <div>
                {course.parts.map(element =>
                    <Part key={element.id} parts={element.name} exercises={element.exercises} />)}
            </div>
            <div>
                <Total parts={course.parts} />
            </div>
        </div>
    )
}

export default Course;