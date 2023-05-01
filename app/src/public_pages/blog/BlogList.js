import React, { useState, Suspense } from 'react';
import { useLoaderData, useSearchParams, defer, Await } from 'react-router-dom';

import BlogCard from './BlogCard';
import './blog.css';

import fakeData from './data';
import CardSkeleton from './CardSkeleton';
import ErrorHandler from '../../components/ErrorHandler';

const delay = () => new Promise((res) => setTimeout(() => res(), 1000));

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
	const dataPromise = getData();
	return defer({ blogs: dataPromise });
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

	const [next, setNext] = useState(4);

	const handleShowMorePosts = () => {
		setNext((prev) => prev + 4);
	};

	const reset = () => {
		setNext(4);
	};

	function myContent(blogs) {
		let data = blogs;

		const typeFilter = searchParams.get('type');

		const displayItems = typeFilter
			? data.msg.filter((item) => item.type === typeFilter)
			: blogs.msg;

		let content1 = data?.msg ? (
			<>
				<Buttons
					setSearchParams={setSearchParams}
					typeFilter={typeFilter}
					reset={reset}
				/>
				<br />
			</>
		) : null;

		let content2 = displayItems
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, next)
			.map((item) => (
				<BlogCard blog={item} key={item.id} searchParams={searchParams} />
			));

		let content3 =
			next < displayItems.length ? (
				<button className='load-more' onClick={handleShowMorePosts}>
					Load More
				</button>
			) : null;

		return (
			<>
				{content1}
				<div className='user-container'>{content2}</div>
				{content3}
			</>
		);
	}

	return (
		<>
			<main className='main-container'>
				<h2>Latest Blog & News</h2>

				<Suspense
					fallback={
						<>
							<div className='skelton-container'>
								<CardSkeleton cards={4} />
							</div>
						</>
					}
				>
					<Await resolve={data.blogs} errorElement={<ErrorHandler />}>
						{(blogs) => myContent(blogs)}
					</Await>
				</Suspense>
			</main>
		</>
	);
};

export default BlogList;
