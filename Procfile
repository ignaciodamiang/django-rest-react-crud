web: python manage.py check --deploy && python manage.py migrate --noinput && python manage.py collectstatic --noinput --verbosity 2 && gunicorn django_crud_api.wsgi:application
