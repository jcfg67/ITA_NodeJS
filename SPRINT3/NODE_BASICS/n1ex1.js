function recursiveMessage() {
    console.log('Running...');
    setTimeout(recursiveMessage, 1000);
}

recursiveMessage();

