import { useState, useEffect } from "react";
import { getLesson, getComments, createComment, getCourse } from "../services/courseService";

  function Lesson() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [lessonComments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const courseSlug = "javascript-101";
    const lessonSlug = "variabler";
  
    const handleComment = (event) => {
      setComment(event.target.value);
    };
  
    const handleName = (event) => {
      setName(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
      if (!comment || !name) {
        setFormError(true);
      } else {
        await createComment({
          id: `${Math.floor(Math.random() * 1000 + 1)}`,
          createdBy: {
            id: Math.floor(Math.random() * 1000 + 1),
            name,
          },
          comment,
          lesson: { slug: lessonSlug },
        });
        const commentsData = await getComments(lessonSlug);
        setComments(commentsData);
        setSuccess(true);
      }
    };
  
    useEffect(() => {
      const getContent = async () => {
        const lessonDate = await getLesson(courseSlug, lessonSlug);
        const courseData = await getCourse(courseSlug, lessonSlug);
        const commentsData = await getComments(lessonSlug);
        setLesson(lessonDate);
        setCourse(courseData);
        setComments(commentsData);
      };
      getContent();
    }, [courseSlug, lessonSlug]);
  
    return (
      <div>
        <div className="lesson_header">
          <h3 data-testid="course_title" className="course_title">
            <a className="course_link" href={`/kurs/${course?.slug}`}>
              {course?.title}
            </a>
          </h3>
          <span className="course_category" data-testid="course_category" >
            Kategori: <span className="category_bold">{course?.category}</span>
          </span>
        </div>
        <h2 className="lesson_title" data-testid="lesson_title">
          {lesson?.title}
        </h2>
        <p
          data-testid="lesson_preAmble"
          className="lesson_preAmble"
        >
          {lesson?.preAmble}
        </p>
        {lesson?.text?.length > 0 &&
          lesson.text.map((text) => (
            <p
              data-testid="lesson_text"
              className="lesson_text"
              key={text.id}
            >
              {text.text}
            </p>
          ))}
        <section data-testid="comments">
          <h4 className="comments_section">
            Kommentarer ({lessonComments?.length})
          </h4>
          <form className="comment_form" data-testid="comment_form" onSubmit={handleSubmit} noValidate>
            <label className="form_label" htmlFor="name">
              <span className="label_text">Navn*</span>
              <input
                data-testid="form_name"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleName}
                className="form_input"
              />
            </label>
            <label className="form_label" htmlFor="comment">
              <span className="label_text">
                Legg til kommentar*
              </span>
              <textarea
                data-testid="form_textarea"
                type="text"
                name="comment"
                id="comment"
                value={comment}
                onChange={handleComment}
                className="form_textarea"
                cols="30"
              />
            </label>
            <button
              className="submit_button"
              data-testid="form_submit"
              type="submit"
            >
              Legg til kommentar
            </button>
            {formError ? (
              <p className="error message" data-testid="form_error">
                Fyll ut alle felter med *
              </p>
            ) : null}
            {success ? (
              <p
                className="success_message"
                data-testid="form_success"
              >
                Skjema sendt
              </p>
            ) : null}
          </form>
          <ul className="comments_list" data-testid="comments_list">
            {lessonComments?.length > 0
              ? lessonComments.map((c) => (
                  <li
                    className="comment_item"
                    key={c.id}
                  >
                    <h5 data-testid="user_comment_name" className="comment_name">
                      {c.createdBy.name}
                    </h5>
                    <p className="comment_text" data-testid="user_comment">{c.comment}</p>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </div>
    );
  }

  export default Lesson;