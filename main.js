// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
      // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");
      // If Name Is Empty
    if (yourName == null || yourName == "") {
            // Set Name To Unknown
        document.querySelector(".name span").innerHTML = 'Unknown';
    }
      // Name Is Not Empty
    else {

        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
}
let count = 0;
// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children)

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);


// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    
    // Add Click Event
    block.addEventListener('click', function () {
        //Trigger The Flip Block Function
        flipBlock(block);
    });
});

//Flip Block Function
function flipBlock(selectedBlock) {
    //Add class is-flipped
    selectedBlock.classList.add('is-flipped');

    //Colleced all Flipped Cards
    let allFilippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //if theres two selected blocks
    if (allFilippedBlocks.length === 2) {

        //Stop clicking Function
        stopClicking();

        //check matched block function
        checkMatchedBlocks(allFilippedBlocks[0], allFilippedBlocks[1]);
        
    }
}

// stop clicking function
function stopClicking() {
    //Add class no clicking on main containier
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        //Remove class No Clicking After the duration
        blocksContainer.classList.remove('no-clicking');
    }, duration)
}

//check Matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
        if (count == 9) {
            document.getElementById("winnig").style.visibility = "visible";
        } else { count = count + 1; }
        console.log(count);
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        }, duration)
        document.getElementById('fail').play();

        
    }
}

// shuffle function
function shuffle(array) {
    // setting vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        //get random number
        random = Math.floor(Math.random() * current);
        //Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}
