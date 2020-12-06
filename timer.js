/*
 * todo
 *
 * set active class on the body, remove
 * popup confirm() modal if deep work < 1 hour, or something
 */

document.addEventListener( 'DOMContentLoaded', () => app.init() );

const app = {
	startTime   : 0,
	stopwatchID : null,
	activeTimer : null,

	// register event handlers, etc
	init: () => {
		const startButtons  = document.querySelectorAll( 'button.start-timer' );

		startButtons.forEach( button => {
			button.addEventListener( 'click', app.toggleTimers );
		} );
	},

	// start one timer, stop the other
	toggleTimers: ( event ) => {
		const timers     = document.querySelectorAll( '.elapsed-time' );
		const newTimerId = event.target.dataset.timerId;

		clearInterval( app.stopwatchID );

		for ( timer of timers ) {
			if ( timer.dataset.timerId === newTimerId ) {
				app.startTime   = Date.now();
				app.stopwatchID = setInterval( app.updateTimer, 500 );
				app.activeTimer = timer;

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
	},

	// print the elapsed time. callback for `setInterval()`
	updateTimer: () => {
		const elapsedSeconds = Date.now() - app.startTime;

		app.activeTimer.innerHTML = new Date( elapsedSeconds ).toISOString().substr( 11, 8 );
	},
}
