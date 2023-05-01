import { Link } from 'react-router-dom';
const ErrorHandler = () => {
	return (
		<center>
			<h1>Oops an error occured with this page!</h1>

			<Link className='link-item underline' to='/'>
				Please retry from the Homepage
			</Link>
		</center>
	);
};

export default ErrorHandler;
