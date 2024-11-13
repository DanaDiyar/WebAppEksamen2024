import { useState } from "react";
import { courses } from "../data/courses";
import { categories } from "../data/categories";
import { useParams, useRouter } from "next/navigation";


function Courses() {
    const [value, setValue] = useState("");
    const [data, setData] = useState(courses);
  
    const handleFilter = (event) => {
      const category = event.target.value;
      setValue(category);
      if (category && category.length > 0) {
        const content = courses.filter((course) =>
          course.category.toLocaleLowerCase().includes(category.toLowerCase())
        );
        setData(content);
      } else {
        setData(courses);
      }
    };
  
    return (
      <>
        <header className="courses_header">
          <h2 className="courses_title" data-testid="title">
            Alle kurs
          </h2>
          <label className="filter_label" htmlFor="filter">
            <span className="sr_only">Velg kategori:</span>
            <select
              id="filter"
              name="filter"
              data-testid="filter"
              value={value}
              onChange={handleFilter}
              className="filter_select"
            >
              <option value="">Alle</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </header>
        <section className="courses_grid" data-testid="courses">
          {data && data.length > 0 ? (
            data.map((course) => (
              <article
                className="course_card"
                key={course.id}
                data-testid="course_wrapper"
              >
                <span className="course_category">
                  [{course.category}]
                </span>
                <h3
                  className="course_title"
                  data-testid="courses_title"
                >
                  <a href={`/kurs/${course.slug}`}>{course.title}</a>
                </h3>
                <p
                  className="course_description"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <a
                  className="course_link"
                  data-testid="courses_url"
                  href={`/kurs/${course.slug}`}
                >
                  Til kurs
                </a>
              </article>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
      </>
    );
  }

  export default Courses;