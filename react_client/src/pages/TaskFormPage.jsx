import { useForm } from 'react-hook-form';
import { createTask, deleteTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    await createTask(data);
    navigate('/');
  });

  return (
    <div>
      <h1>Task Form</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          name='3'
          placeholder='Description'
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button>Save</button>
      </form>
      {params.id && (
        <button
          onClick={() => {
            const confirm = window.confirm('Are you sure?');
            if (confirm) {
              deleteTask(params.id);
              navigate('/');
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
