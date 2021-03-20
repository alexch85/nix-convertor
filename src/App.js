import './App.scss';
import logo from './assets/nix-logo.svg';
import Field from './components/Field/Field';

import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

function App() {
	return (
		<div className='App'>
			<div className='convertor_logo'>
				<img alt='logo' src={logo} />
				Convertor
			</div>
			<div className='convertor_body'>
				<div className='convertor_fields'>
					<Field name='amount' type='number' />
					<Field name='from' type='select' />
					<button className='switch-btn' alt='switch-currencies'>
						<HiOutlineSwitchHorizontal />
					</button>
					<Field name='to' type='select' />
				</div>
				<button className='convert-btn' alt='convert'>
					Convert
				</button>
			</div>
		</div>
	);
}

export default App;
