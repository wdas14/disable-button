import React from 'react';
import {Observable} from 'rxjs';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			clicks: 0,
			disable: false
		}

		this.bashable = this.bashable.bind(this);
	}

	componentDidMount() {
		const button = document.querySelector('#submitOnce');
        const clicks$ = Observable.fromEvent(button, 'click');
        const result = clicks$.debounce(() => Observable.interval(1000));
        result.subscribe(x => this.nonBashable(x));
	}

	bashable() {
		let count = this.state.clicks;
		count++;
		this.setState({bashableText: `I'm bashable. Clicks: ${count}`, clicks: count})
	}

	nonBashable(x) {
		if(x) {
			let count = 0;
			count++;
            this.setState({nonBashableText: `I'm not bashable I'm afraid. Clicks: ${count}`, disable: true});
        }
	}

	render() {
		return (
			<>
				<button onClick={this.bashable}>bashable</button>
				<div>{this.state.bashableText}</div>
				<button id="submitOnce" disabled={this.state.disable}>not bashable</button>
				<div>{this.state.nonBashableText}</div>
			</>
		);
	}
}

export default App;
