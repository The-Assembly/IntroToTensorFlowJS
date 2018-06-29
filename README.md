# Linear Regression

For either sample, you can open index.html in Firefox directly from file explorer, without loading it on to a web server first. The js won't run properly in other browsers due to security reasons, so you won't see the desired results on those.

If you are running it on a web server (such as node/wamp/nginx), you can open it on any browser.

There are two different methods used here, each in a separate subfolder:
1- Using the TFJS Layers API (Using_layers)
2- Using the TFJS Core API (Using_core)

# Digit Recognizer

For either sample, you can open index.html in Firefox directly from file explorer, without loading it on to a web server first. The js won't run properly in other browsers due to security reasons, so you won't see the desired results on those.

If you are running it on a web server (such as node/wamp/nginx), you can open it on any browser.

# Digit Recognizer Browser

Open the folder in a terminal and run: <code>npm install</code>

If you don't have a file named <b>.babelrc</b> create one and copy the following code into it

    {
    "presets": [
        [
        "env",
        {
            "esmodules": false,
            "targets": {
            "browsers": [
                "> 3%"
            ]
            }
        }
        ]
    ],
    "plugins": [
        "transform-runtime"
    ]
    }

Decrease or increase the number of epochs on line 86 in index.js depending on the specs of your computer


