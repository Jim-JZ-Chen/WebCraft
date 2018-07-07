function Sight()
{	
}

Sight.prototype.init = function()
{
	var a =`
		<style>
			#blocker {

				position: absolute;

				width: 100%;
				height: 100%;

				background-color: rgba(0,0,0,0.5);
				z-index : 3;
			}

			#instructions {
				position: absolute;
				width: 100%;
				height: 100%;

				display: -webkit-box;
				display: -moz-box;
				display: box;

				-webkit-box-orient: horizontal;
				-moz-box-orient: horizontal;
				box-orient: horizontal;

				-webkit-box-pack: center;
				-moz-box-pack: center;
				box-pack: center;

				-webkit-box-align: center;
				-moz-box-align: center;
				box-align: center;

				color: #ffffff;
				text-align: center;

				cursor: pointer;
				z-index : 3;
			}

		</style>



		<style type="text/css">

	#sight1
	{
		background-color: black;
		height: 2px;
		width: 15px;
		position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
		z-index : 3;
	}

	#sight2
	{
		background-color: black;
		height: 15px;
		width: 2px;
		position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
		z-index : 3;
	}

	</style>
		
		<div id="blocker">

			<div id="instructions">
				<span style="font-size:40px">Click to play</span>
				<br />
				(W, A, S, D = Move, left click to destroy block, right click to place block)
			</div>

		</div>

	<div id= 'sight1'></div>
	<div id= 'sight2'></div>

	`;
	//wirte the html code above
	document.write(a);

	//get the html element
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );

	//this two div element is the front sight on the center of screen
	var sight1 = document.getElementById( 'sight1' );
	var sight2 = document.getElementById( 'sight2' );
	blocker.style.display = 'block';
	sight1.style.display = 'none';
	sight2.style.display = 'none';
	// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

	var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

	if ( !havePointerLock ) 
	{
		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
		return null;
	}

	var element = document.body;

	var pointerlockchange = function ( event ) {

		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

			blocker.style.display = 'none';
			sight1.style.display = 'block';
			sight2.style.display = 'block';

		} else {

			blocker.style.display = 'block';
			sight1.style.display = 'none';
			sight2.style.display = 'none';
			instructions.style.display = '';

		}

	};

	var pointerlockerror = function ( event ) {

		instructions.style.display = '';

	};

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	instructions.addEventListener( 'click', function ( event ) 
	{

		instructions.style.display = 'none';

		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();

	}, false );
}