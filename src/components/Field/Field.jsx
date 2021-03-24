import './Field.scss';
import getSymbolFromCurrency from 'currency-symbol-map';

export default function Field({
	name,
	type,
	amount,
	setAmount,
	currencyOptions,
	onChangeCurrency,
	currency,
	currencyNames,
	setToCurrency,
	setFromCurrency,
}) {
	const flag = currency?.slice(0, -1).toLowerCase();

	let field;
	type === 'select'
		? (field = (
				<div className='field'>
					<h4>{name}</h4>
					<div className='field_container'>
						<img className='flag_img' src={`https://www.countryflags.io/${flag}/flat/32.png`} alt='flag' />
						<select value={currency} onChange={onChangeCurrency}>
							{currencyOptions.map((curr) => (
								<option key={curr} value={curr}>
									{curr} {`- ${currencyNames && currencyNames[curr]}`}
								</option>
							))}
						</select>
					</div>
				</div>
		  ))
		: (field = (
				<div className='field'>
					<h4>{name}</h4>
					<div className='field_container'>
						<span>{getSymbolFromCurrency(currency)}</span>
						<input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
					</div>
				</div>
		  ));
	return <>{field}</>;
}
