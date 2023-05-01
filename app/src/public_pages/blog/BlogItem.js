import { useEffect, useState } from 'react';

import { useParams, Link, useLocation } from 'react-router-dom';

import fakeData from './data';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const delay = () => new Promise((res) => setTimeout(() => res(), 1000));

const BlogItem = () => {
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const location = useLocation();
	// console.log(location);

	useEffect(() => {
		const myFun = async () => {
			await delay();
			let x = fakeData.filter((item) => item.id === id);
			// console.log(x);
			setPost(x[0]);
			setIsLoading(false);
		};

		myFun();

		// });
	}, [id]);

	//prev page location sent by Bloglist component via link - Stores the type if used
	const search = location.state?.search;

	return (
		<main className='main-container'>
			{!isLoading && (
				<Link to={`..${search}`} relative='path'>
					Back
				</Link>
			)}
			<div className='user-post'>
				<img
					className='blog-image'
					src='https://picsum.photos/200'
					alt='blog'
				/>

				<div className='blog-item-bottom'>
					<h1>{post.title || <Skeleton />}</h1>
					<p>{post.descripton || <Skeleton />}</p>
					<p>{post.main || <Skeleton />}</p>

					<p>{post.date || <Skeleton />}</p>

					<br />
					<b>{post.type || <Skeleton />}</b>
				</div>
			</div>
		</main>
	);
};

export default BlogItem;
