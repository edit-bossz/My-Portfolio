import subprocess

# Path to the Node.js executable
node_path = "node"

# Path to the server.js file
script_path = r"C:\Users\manja\OneDrive - South Point Education Society\Riju Documents\Coding\HTML\My Portfolio\backend\server.js"

try:
    # Run the server.js script
    result = subprocess.run([node_path, script_path], capture_output=True, text=True, check=True)

    # Print the output from server.js
    print("Output from server.js:")
    print(result.stdout)

except subprocess.CalledProcessError as e:
    # Print the error if server.js fails
    print("Error running server.js:")
    print(e.stderr)
