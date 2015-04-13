In order to test source maps, here are the requirements: 

- having at least two files packaged into one
- preferably picking files from different folders

However, the test will just make the plugin work with those files and generate a source map, it will in that way only check that this doesn't fail. To check that the source map is correctly generated, it is preferable to use create a meaningful program, and debug it inside a browser supporting source maps.
