import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, Form, useActionData } from 'react-router-dom';
import './contact.css';
// images
import locationImg from '../../assets/images/location.png';
import phoneImg from '../../assets/images/phone-call.png';
import emailImg from '../../assets/images/email.png';

import { FaWhatsapp } from 'react-icons/fa';

import { URL } from '../../App';

import Loading from '../../components/Loading';

import { toast } from 'react-toastify';

const opt = {
	position: toast.POSITION.TOP_CENTER,
	theme: 'colored',
	hideProgressBar: true,
};

let map =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159019.04030805102!2d-0.006866832327827696!3d51.482525396909296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8afb31d647aa3%3A0x31adb65f3f5a8bf8!2s20%20Sussex%20Rd%2C%20Erith%20DA8%201JB!5e0!3m2!1sen!2suk!4v1668516813646!5m2!1sen!2suk';

export async function action({ request }) {
	const formData = await request.formData();

	// const fields = Object.fromEntries(formData);
	// console.log('RUN', fields);

	const name = formData.get('name');
	const email = formData.get('email');
	const comment = formData.get('comment');

	try {
		let url = '/api/email/';
		let options = {
			method: 'POST',
			body: JSON.stringify({ name, email, comment }),
			headers: {
				'Content-Type': 'application/json',
				credentials: 'include',
			},
		};

		let baseUrl = URL;
		const res = await fetch(`${baseUrl}${url}`, options);
		const data = await res.json();

		if (data?.msg) {
			// toast.success(data.msg, opt);
			toast.success('Success!', opt);
		} else {
			// toast.error(data.errors, opt);
			toast.error('Issue found', opt);
		}
		// console.log(data);
		return data;
	} catch (err) {
		toast.error(err.error, opt);
		return err.errors;
	}
}

const Contact = () => {
	//data returned form fetch
	let message = useActionData(); // result from form submit
	// state
	const navigation = useNavigation(); // form submit status "idle" or "submitting"

	const formRef = useRef();
	const focusRef = useRef();

	// field inputs are not correct
	const [nameErr, setNameErr] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const [commentErr, setCommentErr] = useState('');

	// form submission result
	const [signInErr, setSignInErr] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		if (message?.msg) {
			setSuccess(message.msg);
			setSignInErr('');

			//clear fields
			formRef.current.reset();
			//focus on name input field
			focusRef.current.focus();
		}

		if (message?.errors) {
			setSuccess('');
			setSignInErr(message.errors);
		}
	}, [message]);

	const handleChange = (e, item) => {
		setSignInErr('');
		setSuccess('');

		/* eslint-disable */
		const emailRegEx = RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		if (item === 'name') {
			// setName(e.target.value);

			e.target.value.length < 3
				? setNameErr('Name must be at least 3 characters!')
				: setNameErr('');
		}
		if (item === 'email') {
			// setEmail(e.target.value);
			!emailRegEx.test(e.target.value)
				? setEmailErr('Invalid Email!')
				: setEmailErr('');
		}

		if (item === 'comment') {
			// setComment(e.target.value);
			e.target.value.length < 10
				? setCommentErr('Please provide more details')
				: setCommentErr('');
		}
	};

	return (
		<>
			<section className='main-container contact-grid'>
				<div id='contact-info'>
					<h1 id='contact-title'>Tell us more about your project</h1>
					<h3 id='free-title'>
						Free quotation on cost and time with no obligation
					</h3>

					<p id='contact-title-sub'>
						Please fill out the quick form and we will be in touch with lighting
						speed.
					</p>
				</div>

				{navigation === 'submitting' && <Loading />}

				{signInErr && (
					<div className='alert alert-danger text-center'>
						<span className='text-danger text-capitalize'>{signInErr}</span>
					</div>
				)}

				{success && (
					<div className='alert alert-success text-center'>
						<span className='text-success text-capitalize'>{success}</span>
					</div>
				)}

				<div id='contact-container'>
					<div className='form-container'>
						<h3 id='contact-form-title'>Contact us</h3>

						<Form className='contact-form' method='post' ref={formRef}>
							<div className='form-group'>
								<label htmlFor='name'>Name:</label>
								<input
									type='text'
									name='name'
									className='form-control'
									placeholder='Full Name'
									id='name'
									required
									onChange={(e) => handleChange(e, 'name')}
									// value={name}
									autoComplete='off'
									autoFocus
									ref={focusRef}
								/>
								{nameErr && <small className='text-danger'>{nameErr}</small>}
							</div>

							<div className='form-group'>
								<label htmlFor='email'>Email:</label>
								<input
									type='email'
									name='email'
									className='form-control'
									id='email'
									onChange={(e) => handleChange(e, 'email')}
									// value={email}
									autoComplete='off'
								/>
								{emailErr && <small className='text-danger'>{emailErr}</small>}
							</div>

							<div className='form-group'>
								<label htmlFor='comment'>Briefly describe what you need:</label>
								<textarea
									rows={4}
									cols={50}
									name='comment'
									autoComplete='off'
									// value={comment}
									onChange={(e) => handleChange(e, 'comment')}
									data-testid='custom-element'
								></textarea>
								{commentErr && (
									<small className='text-danger'>{commentErr}</small>
								)}
							</div>

							<button
								disabled={navigation.state === 'submitting'}
								type='submit'
								className='btn btn-blue'
								id='btn-save'
							>
								{navigation.state === 'submitting' ? 'Sending.....' : 'Submit'}
							</button>
						</Form>
					</div>
				</div>

				<div className='address'>
					<div className='address-box'>
						<div className='leftside-div'>
							<img className='img-bg' src={locationImg} alt='location' />
						</div>
						<div className='rightside-div'>
							<p>
								DW-Serv
								<br></br>Sussex Road
								<br></br>Erith
								<br></br>Kent
								<br></br>DA8 1JB
							</p>
						</div>
					</div>

					<div className='address-box'>
						<div className='leftside-div'>
							<img src={phoneImg} alt='phone' />
						</div>
						<div className='rightside-div'>
							<p>01322 xxxxxx</p>
						</div>
					</div>

					<div className='address-box'>
						<div className='leftside-div'>
							<img className='img-color' src={emailImg} alt='email' />
						</div>

						<div className='rightside-div'>
							<p>test@gmail.com</p>
						</div>
					</div>
				</div>
			</section>

			<section className='main-container' id='section-map'>
				<div id='google-map'>
					<iframe src={map} loading='lazy' id='map-frame'></iframe>
				</div>
			</section>

			<div>
				<a
					href='https://wa.me/1111111111'
					className='whatsapp_float'
					target='_blank'
					rel='noopener noreferrer'
				>
					<FaWhatsapp className='whatsapp-icon' />
				</a>
			</div>
		</>
	);
};

export default Contact;
