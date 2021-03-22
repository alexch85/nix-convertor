import './Field.scss';

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
					<div className='currency_select'>
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
					<input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
		  ));
	return <>{field}</>;
}
