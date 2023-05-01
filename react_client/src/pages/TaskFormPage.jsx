import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
      toast.success('Task updated successfully', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });
    } else {
      await createTask(data);
      toast.success('Task created successfully', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });
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
  }, [params.id, setValue]);

  return (
    <div className='max-w-xl mx-auto'>
      <h1>Task Form</h1>
      <form onSubmit={onSubmit}>
        <input
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          rows='3'
          placeholder='Description'
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>
          Save
        </button>
      </form>
      {params.id && (
        <button
          className='bg-zinc-600 p-3 rounded-lg block w-full mt-3'
          onClick={() => {
            const confirm = window.confirm('Are you sure?');
            if (confirm) {
              deleteTask(params.id);
              toast.success('Task deleted succesfully', {
                position: 'bottom-right',
                style: {
                  background: '#101010',
                  color: '#fff',
                },
              });
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
