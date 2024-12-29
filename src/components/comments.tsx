import React, { useState } from 'react';
import '../styles/comments.css';

interface Comment {
  name: string;
  text: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { name: 'Bob Fossil', text: 'Oh, I am so glad you taught me all about the big brown angry guys in the woods...' }
  ]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      setComments([...comments, { name, text }]);
      setName('');
      setText('');
    }
  };

  return (
    <section className="comments" aria-labelledby="comments-section">
      <h3 id="comments-section" tabIndex={29}>Comments</h3>
      <div
        id="show-comments-toggle"
        className="show-hide"
        role="button"
        aria-expanded={showComments}
        tabIndex={30}
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? 'Hide comments' : 'Show comments'}
      </div>

      {showComments && (
        <div className="comment-wrapper">
          <h4 tabIndex={31}>Add a Comment</h4>
          <form
            className="comment-form"
            aria-label="Add a Comment"
            onSubmit={handleAddComment}
          >
            <div className="flex-pair">
              <label htmlFor="name" tabIndex={32}>Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                tabIndex={33}
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment" tabIndex={34}>Your Comment:</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Enter your comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                tabIndex={35}
              />
            </div>
            <div>
              <button
                type="submit"
                className="submit-button"
                tabIndex={36}
                aria-label="Submit Comment"
              >
                Submit
              </button>
            </div>
          </form>

          <h4 tabIndex={37}>Comments</h4>
          <ul className="comment-container" tabIndex={38}>
            {comments.map((comment, index) => (
              <li key={index} tabIndex={39}>
                <p tabIndex={40}><strong>{comment.name}</strong></p>
                <p tabIndex={41}>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Comments;