# Base container image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

RUN python -m spacy download en_core_web_sm

# Copy the current directory contents into the container at /app
COPY . .

# Run the application
CMD [ "fastapi", "run", "app.py" ]
