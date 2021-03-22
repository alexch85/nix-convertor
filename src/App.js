import './App.scss';
import logo from './assets/nix-logo.svg';
import Field from './components/Field/Field';

import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { useState } from 'react';

function App() {
	const [result, setResult] = useState(false);
	const [amount, setAmount] = useState(0);

	const toggleResultHandler = () => setResult((prevResult) => !prevResult);
	return (
		<div className='App'>
			<div className='convertor_logo'>
				<img alt='logo' src={logo} />
				Convertor
			</div>
			<div className='convertor_body'>
				<div className='convertor_fields'>
					<Field name='amount' type='number' amount={amount} setAmount={setAmount} />
					<Field name='from' type='select' />
					<button className='switch-btn' alt='switch-currencies'>
						<HiOutlineSwitchHorizontal />
					</button>
					<Field name='to' type='select' />
				</div>
				<button className='convert-btn' alt='convert' onClick={toggleResultHandler}>
					Convert
				</button>
				{result && (
					<div className='convert-result'>
						<p>100 American Dollars =</p>
						<h2>329.00 New Israeli shekels</h2>
						<p>1 ILS = 0.309 USD 1 USD = 3.29ILS</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
