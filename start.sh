#!/bin/bash

PORT=3000
LOG_FILE="output.log"

# Check if something is running on the specified port
check_port() {
    lsof -i :$PORT | grep LISTEN > /dev/null
    return $?
}

# Ask to stop the running process
stop_process() {
    local PID
    PID=$(lsof -t -i :$PORT)
    echo "Process running on port $PORT with PID $PID."
    
    read -p "Do you want to stop it? (yes/no): " choice
    case "$choice" in
        yes|y|Y)
            echo "Stopping process with PID $PID..."
            sudo kill -9 $PID
            echo "Process stopped."
            ;;
        no|n|N)
            echo "Keeping the existing process running."
            exit 0
            ;;
        *)
            echo "Invalid input. Exiting."
            exit 1
            ;;
    esac
}

# Start the server
start_server() {
    echo "Starting server on port $PORT..."
    nohup npm run dev -- 0.0.0.0 --port $PORT > $LOG_FILE 2>&1 &
    echo "Server started with nohup. Logs are being written to $LOG_FILE."
}

# Main logic
if check_port; then
    echo "Something is already running on port $PORT."
    stop_process
fi

start_server

