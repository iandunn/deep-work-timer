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

	init: () => {
		const buttons = document.querySelectorAll( 'button.start-timer' );

		buttons.forEach( element => {
			element.addEventListener( 'click', app.toggleTimers );
		} );
	},

	toggleTimers: ( event ) => {
		const timers = document.querySelectorAll( '.timer-value' );

		clearInterval( app.stopwatchID );

		for ( timer of timers ) {
			if ( timer.parentElement.id === event.target.parentElement.id ) {
				app.startTime   = Date.now();
				app.stopwatchID = setInterval( app.updateTimer, 500 );
				app.activeTimer = timer;

			} else {
				timer.innerHTML = '00:00:00';
			}
		}
	},

	updateTimer: () => {
		const elapsedSeconds = Date.now() - app.startTime;

		app.activeTimer.innerHTML = new Date( elapsedSeconds ).toISOString().substr( 11, 8 );
	}
}
