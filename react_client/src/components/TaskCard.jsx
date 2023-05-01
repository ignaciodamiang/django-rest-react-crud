import PropTypes from 'prop-types';

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export function TaskCard({ task }) {
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      {task.done ? <p>Done</p> : <p>Undone</p>}
    </div>
  );
}
