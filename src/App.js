import { useState, useEffect } from 'react';
import './App.scss';

import logo from './assets/nix-logo.svg';
import Field from './components/Field/Field';

import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

const exApiUrl = 'https://api.exchangeratesapi.io/latest';
const namesJsonUrl = 'https://openexchangerates.org/api/currencies.json';

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [currencyNames, setCurrencyNames] = useState();
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [toCurrency, setToCurrency] = useState('EUR');
	const [result, setResult] = useState(false);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		const fetchCurrencyOptions = async () => {
			const response = await fetch(exApiUrl);
			const data = await response.json();
			console.log(data);
			return setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
		};
		fetchCurrencyOptions();
		console.log(currencyOptions);
	}, []);

	useEffect(() => {
		const fetchCurrencyNames = async () => {
			const resp = await fetch(namesJsonUrl);
			const namesData = await resp.json();
			console.log(namesData);
			return setCurrencyNames(namesData);
		};
		fetchCurrencyNames();
	}, []);

	const toggleResultHandler = () => setResult((prevResult) => !prevResult);

	const onChangeFromCurrency = (e) => setFromCurrency(e.target.value);
	const onChangeToCurrency = (e) => setToCurrency(e.target.value);
	return (
		<div className='App'>
			<div className='convertor_logo'>
				<img alt='logo' src={logo} />
				Convertor
			</div>
			<div className='convertor_body'>
				<div className='convertor_fields'>
					<Field name='amount' type='number' amount={amount} setAmount={setAmount} />
					<Field
						name='from'
						type='select'
						currencyOptions={currencyOptions}
						setFromCurrency={setFromCurrency}
						currency={fromCurrency}
						onChangeCurrency={onChangeFromCurrency}
						currencyNames={currencyNames}
					/>
					<button className='switch_btn' alt='switch-currencies'>
						<HiOutlineSwitchHorizontal />
					</button>
					<Field
						name='to'
						type='select'
						currencyOptions={currencyOptions}
						setToCurrency={setToCurrency}
						currency={toCurrency}
						onChangeCurrency={onChangeToCurrency}
						currencyNames={currencyNames}
					/>
				</div>
				<button className='convert_btn' alt='convert' onClick={toggleResultHandler}>
					Convert
				</button>
				{result && (
					<div className='convert_result'>
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
