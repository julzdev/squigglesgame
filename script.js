// Background scrolling speed
let move_speed = 10;
	
// Gravity constant value
let gravity = 0.5;
	
// Getting reference to the bird element
let bone = document.querySelector('.bone');
	
// Getting bird element properties
let bone_props = bone.getBoundingClientRect();
let background =
	document.querySelector('.background')
			.getBoundingClientRect();
	
// Getting reference to the score element
let score_val =
	document.querySelector('.score_val');
let message =
	document.querySelector('.message');
let score_title =
	document.querySelector('.score_title');

let helper =
document.querySelector('.helper');
	
// Setting initial game state to start
let game_state = 'Start';
	
// Add an eventlistener for key presses
document.addEventListener('keydown', (e) => {
	
// Start the game if enter key is pressed
if (e.key == 'Enter' &&
	game_state != 'Play') {
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
	e.remove();
	});
	bone.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
	score_val.innerHTML = '0';
    helper.innerHTML = 'press "space button" to jump!';
	play();
}
});
function play() {
    function move() {
        
        // Detect if game has ended
        if (game_state != 'Play') return;
        
        // Getting reference to all the pipe elements
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            
        let pipe_sprite_props = element.getBoundingClientRect();
        bone_props = bone.getBoundingClientRect();
            
        // Delete the pipes if they have moved out
        // of the screen hence saving memory
        if (pipe_sprite_props.right <= 0) {
            element.remove();
        } else {
            // Collision detection with bird and pipes
            if (
            bone_props.left < pipe_sprite_props.left +
            pipe_sprite_props.width &&
            bone_props.left +
            bone_props.width > pipe_sprite_props.left &&
            bone_props.top < pipe_sprite_props.top +
            pipe_sprite_props.height &&
            bone_props.top +
            bone_props.height > pipe_sprite_props.top
            ) {
                
            // Change game state and end the game
            // if collision occurs
            game_state = 'End';
            message.innerHTML = 'Reload Page To Restart';
            message.style.left = '26vw';
            return;
            } else {
            // Increase the score if player
            // has the successfully dodged the
            if (
                pipe_sprite_props.right < bone_props.left &&
                pipe_sprite_props.right +
                move_speed >= bone_props.left &&
                element.increase_score == '1'
            ) {
                score_val.innerHTML = +score_val.innerHTML + 1;
            }
            element.style.left =
                pipe_sprite_props.left - move_speed + 'px';
            }
        }
        });

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bone_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        bone_dy = bone_dy + gravity;
        document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowUp' || e.key == ' ') {
            bone_dy = -7.6;
        }
        });

        // Collision detection with bird and
        // window top and bottom

        if (bone_props.top <= 0 ||
            bone_props.bottom >= background.bottom) {
        game_state = 'End';
        message.innerHTML = 'Reload Page To Restart';
        message.style.left = '26vw';
        return;
        }
        bone.style.top = bone_props.top + bone_dy + 'px';
        bone_props = bone.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;
        
    // Constant value for the gap between two pipes
    let pipe_gap = 35;
    function create_pipe() {
        if (game_state != 'Play') return;
        
        // Create another set of pipes
        // if distance between two pipe has exceeded
        // a predefined value
        if (pipe_seperation > 115) {
        pipe_seperation = 0
            
        // Calculate random position of pipes on y axis
        let pipe_posi = Math.floor(Math.random() * 43) + 8;
        let pipe_sprite_inv = document.createElement('div');
        pipe_sprite_inv.className = 'pipe_sprite';
        pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
        pipe_sprite_inv.style.left = '100vw';
            
        // Append the created pipe element in DOM
        document.body.appendChild(pipe_sprite_inv);
        let pipe_sprite = document.createElement('div');
        pipe_sprite.className = 'pipe_sprite';
        pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
        pipe_sprite.style.left = '100vw';
        pipe_sprite.increase_score = '1';
            
        // Append the created pipe element in DOM
        document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
