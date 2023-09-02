import { FC } from 'react'

import TodoList from '../../widgets/TodoList/TodoList';

import './App.scss';

const App: FC = () => {
	return (
		<div className="app">
			<header className="app-header">
				<img src={"/logo.svg"} className="app-logo" alt="logo" />
			</header>
			<main className="app-content">
				<section className="app-todo">
					<TodoList/>
				</section>
			</main>
		</div>
	);
}

export default App;
