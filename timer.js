/*
 * todo
 *
 * set active class on the body, remove
 * popup confirm() modal if deep work < 1 hour, or something
 * setup HMR as progressive enhancement, don't require `watch` task to be running for normal changes though
 */

let startTime = 0;
let stopwatchID = null;
let activeTimer = null;

// register event handlers, etc
const init = () => {
	const startButtons = document.querySelectorAll( 'button.start-timer' );

	startButtons.forEach( button => {
		button.addEventListener( 'click', toggleTimers );
	} );
}

// start one timer, stop the other
const toggleTimers = ( event ) => {
	const timers     = document.querySelectorAll( '.elapsed-time' );
	const newTimerId = event.target.dataset.timerId;

	clearInterval( stopwatchID );

	for ( const timer of timers ) {
		if ( timer.dataset.timerId === newTimerId ) {
			startTime   = Date.now();
			stopwatchID = setInterval( updateTimer, 500 );
			activeTimer = timer;

			// This helps reinforce which mode you're in, without having to switch the active tab.
			document.title = timer.parentElement.querySelector( 'h2' ).innerText + ' - Deep Work Timer';

			/*
			 * This makes it easy to tell which mode you're in, without having to look at each timer.
			 *
			 * This doesn't account for `body` having any other classes, but right now it doesn't need to.
			 */
			document.getElementsByTagName( 'body' )[0].classList = 'active-' + newTimerId;

		} else {
			timer.innerHTML = '00:00:00';
		}
	}
}

// print the elapsed time. callback for `setInterval()`
const updateTimer = () => {
	const elapsedSeconds = Date.now() - startTime;

	activeTimer.innerHTML = new Date( elapsedSeconds ).toISOString().substr( 11, 8 );
}

init();
