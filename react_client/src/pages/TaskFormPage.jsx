import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate('/');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue('title', title);
        setValue('description', description);
      }
    }
    loadTask();
  }, []);

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
