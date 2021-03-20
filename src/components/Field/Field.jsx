import './Field.scss';

export default function Field({ name, type }) {
	let field;
	type === 'select'
		? (field = (
				<div className='field'>
					<h4>{name}</h4>
					<select value='usd'>
						<option value='usd'>USD</option>
						<option value='eur'>EUR</option>
					</select>
				</div>
		  ))
		: (field = (
				<div className='field'>
					<h4>{name}</h4>
					<input type='number' />
				</div>
		  ));
	return <>{field}</>;
}