import React, { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import BlogCard from './BlogCard';
import './blog.css';

import fakeData from './data';

const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

const getData = async () => {
	try {
		await delay();

		const resData = fakeData;

		return { msg: resData };
	} catch (err) {
		if (err) {
			return { errors: err.message };
		}
	}
};

export async function loader() {
	const data = await getData();
	return data;
}

const Buttons = (props) => {
	return (
		<div>
			<div className='filter-buttons'>
				<button
					onClick={() => {
						props.setSearchParams({ type: 'Excel' });
						props.reset();
					}}
					className='typefilter'
				>
					Excel
				</button>
				<button
					onClick={() => {
						props.setSearchParams({ type: 'Access' });
						props.reset();
					}}
					className='typefilter'
				>
					Access
				</button>
				<button
					onClick={() => {
						props.setSearchParams({ type: 'Bi' });
						props.reset();
					}}
					className='typefilter'
				>
					Bi
				</button>
				{props && (
					<button
						onClick={() => {
							props.setSearchParams({ type: 'Web Development' });
							props.reset();
						}}
						className='typefilter'
					>
						Web
					</button>
				)}
			</div>

			{props.typeFilter && (
				<button
					onClick={() => {
						props.setSearchParams({});
						props.reset();
					}}
					className='typefilter-clear'
				>
					Clear filter
				</button>
			)}
		</div>
	);
};

const BlogList = () => {
	const data = useLoaderData();
	// console.log(data);
	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter = searchParams.get('type');

	const displayItems = typeFilter
		? data?.msg.filter((item) => item.type === typeFilter)
		: data?.msg;

	const [next, setNext] = useState(4);

	const handleShowMorePosts = () => {
		setNext((prev) => prev + 4);
	};

	const reset = () => {
		setNext(4);
	};

	return (
		<>
			<main className='main-container'>
				<h2 style={{ marginBottom: '0.5em' }}>Latest Blog & News</h2>

				{data?.errors && <p>{data.errors}</p>}
				<div className='user-container'>
					{data?.msg && (
						<Buttons
							setSearchParams={setSearchParams}
							typeFilter={typeFilter}
							reset={reset}
						/>
					)}
					<br />
					{data?.msg &&
						displayItems
							.sort((a, b) => new Date(b.date) - new Date(a.date))
							.slice(0, next)
							.map((item) => (
								<BlogCard
									blog={item}
									key={item.id}
									searchParams={searchParams}
								/>
							))}
				</div>

				{next < displayItems.length && (
					<button className='load-more' onClick={handleShowMorePosts}>
						Load More
					</button>
				)}
			</main>
		</>
	);
};

export default BlogList;
