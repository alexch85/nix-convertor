import { useState, useEffect, useCallback } from 'react';
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
	const [result, setResult] = useState(null);
	const [showResult, setShowResult] = useState(false);
	const [amount, setAmount] = useState(1);
	const [exchangeRate, setExchangeRate] = useState();

	//GET CURRENCY DATA FROM API
	useEffect(() => {
		const fetchCurrencyOptions = async () => {
			const response = await fetch(exApiUrl);
			const data = await response.json();
			console.log(data);
			return setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
		};
		fetchCurrencyOptions();
	}, []);

	//GET CURRENCY NAMES FROM API
	useEffect(() => {
		const fetchCurrencyNames = async () => {
			const resp = await fetch(namesJsonUrl);
			const namesData = await resp.json();
			console.log(namesData);
			return setCurrencyNames(namesData);
		};
		fetchCurrencyNames();
	}, []);

	//SET AMOUNT HANDLER
	const setAmountHandler = (e) => {
		e >= 0 && setAmount(e);
	};

	//CALC AMOUNT HANDLER
	const amoutClacHandler = useCallback(() => {
		if (amount && amount > 0) {
			const calcResult = amount * exchangeRate;
			setResult(calcResult);
		}
	}, [amount, exchangeRate]);

	//GET EXCHANGE RATE FROM API
	useEffect(() => {
		const fetchExchangeRate = async () => {
			const resp = await fetch(`${exApiUrl}?base=${fromCurrency}&symbols=${toCurrency}`);
			const exchangeRate = await resp.json();
			console.log(exchangeRate);
			return setExchangeRate(exchangeRate.rates[toCurrency]);
		};
		fetchExchangeRate();
		amoutClacHandler();
	}, [fromCurrency, toCurrency, amoutClacHandler]);

	//ONCHANGE CURRENCY HANDLERS
	const onChangeFromCurrency = (e) => {
		e.target.value !== toCurrency && setFromCurrency(e.target.value);
	};
	const onChangeToCurrency = (e) => {
		e.target.value !== fromCurrency && setToCurrency(e.target.value);
	};

	//TOGGLE CURRENCIES HANDLER
	const toggleCurrencyHandler = () => {
		const savedFromCurrency = fromCurrency;
		setFromCurrency(toCurrency);
		setToCurrency(savedFromCurrency);
		amoutClacHandler();
	};

	//TOGGLE SHOW RESULT
	const toggleShowResult = () => {
		setShowResult(true);
	};

	exchangeRate && console.log(exchangeRate);
	return (
		<div className='App'>
			<div className='convertor_logo'>
				<img alt='logo' src={logo} />
				Convertor
			</div>
			<div className='convertor_body'>
				<div className='convertor_fields'>
					<Field
						name='amount'
						type='number'
						amount={amount}
						setAmount={setAmountHandler}
						currency={fromCurrency}
					/>
					<Field
						name='from'
						type='select'
						currencyOptions={currencyOptions}
						setFromCurrency={setFromCurrency}
						currency={fromCurrency}
						onChangeCurrency={onChangeFromCurrency}
						currencyNames={currencyNames}
					/>
					<button className='switch_btn' alt='switch-currencies' onClick={toggleCurrencyHandler}>
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
				<button className='convert_btn' alt='convert' onClick={toggleShowResult}>
					Convert
				</button>
				{showResult && (
					<div className='convert_result'>
						<p>
							{amount} {currencyNames[fromCurrency]} =
						</p>
						<h2>
							{result.toFixed(3)} {currencyNames[toCurrency]}
						</h2>
						<p>
							1 {fromCurrency} = {(1 * exchangeRate).toFixed(3)}
							{toCurrency} 1 {toCurrency} = {(1 / exchangeRate).toFixed(3)}
							{fromCurrency}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
