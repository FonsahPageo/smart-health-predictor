FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN python -m ensurepip && pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
