import os
import subprocess

# Change directory to where the server.js file is located
os.chdir(r"C:\Users\manja\OneDrive - South Point Education Society\Riju Documents\Coding\HTML\My Portfolio\backend")

# Run the Node.js script
subprocess.run(["node", "server.js"])

# Pause (in case you need to observe the output)
input("Press Enter to continue...")