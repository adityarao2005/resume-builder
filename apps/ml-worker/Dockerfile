# Base container image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Run the application
CMD [ "fastapi", "dev", "app.py" ]
