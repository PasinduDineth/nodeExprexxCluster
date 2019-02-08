// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

       // Count the machine's CPUs
       var cpuCount = require('os').cpus().length;
        console.log("CPU count =>",cpuCount);
       // Create a worker for each CPU
       for (var i = 0; i < cpuCount; i += 1) {
           cluster.fork();
       }

        // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {

    // Include Express
    var express = require('express');

    // Create a new Express application
    var app = express();

    // Add a basic route – index page
    app.get('/', function (req, res) {
        console.log('aa');
        res.send('Hello from Worker ' + cluster.worker.id);
    });

    // Bind to a port
    app.listen(3000);
    console.log('Worker %d running!', cluster.worker.id);
}