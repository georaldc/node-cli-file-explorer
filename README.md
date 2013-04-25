Node.js CLI File Explorer
=========================

A quick CLI-based project I did while learning node.js (as well as git-related stuff). Based on an example found in the Smashing Node.js ebook by Guillermo Rauch.

Description
-----------

Running this project in node will show a listing of all files found in the project directory. You can then enter a number to choose a file or directory. If a directory is chosen, any files found there will be listed allowing you to again make a new selection. Execution ends if a file is chosen, or if the selected directory does not contain any files.

Issues
------

- Selecting a non text file such as an image may result in a freezing CLI due to the program trying to output the file to the console. 