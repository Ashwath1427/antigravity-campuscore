import py_compile
import sys

# Try compiling dashboard.js as python just to see if it reads it? No, py_compile doesn't work for JS.
# We need to evaluate javascript.
# I can use Microsoft's quick JS evaluator via cscript? No.
# I can write a small HTML file with <script src="js/dashboard.js"></script> and serve it locally, but we don't have a browser.
# But I can write a python script to do a regex check or just use Node!
# Node is not available.
