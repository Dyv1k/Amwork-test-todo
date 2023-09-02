import { FC } from 'react'

import TodoList from '../../widgets/TodoList/TodoList';

import logo_img from '../../images/logo.svg'

import './App.scss';

const App: FC = () => {
	return (
		<div className="app">
			<header className="app-header">
				<img src={logo_img} className="app-logo" alt="logo" />
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
