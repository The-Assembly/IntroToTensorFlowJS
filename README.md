# Linear Regression

If you are not running it on a server/loclhost open index.html in firefox. Other browsers aren't supported with the tensorflow js api because security reasons.

If you are running it on a host (such as node/wamp/nginx), can open it on any browser

There are two different methods used here, each in a separate subfolder:
1- Using the TFJS Layers API (Using_layers)
2- Using the TFJS Core API (Using_core)

# Digit Recognizer

If you are not running it on a server/loclhost open index.html in firefox. Other browsers aren't supported with the tensorflow js api because security reasons.

If you are running it on a host go crazy and open it on any browser

PS : I recommend running it on node / wamp or something that'll put it on a localhost / host

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


