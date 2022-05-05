# Nextjs Introduction

## Library vs FrameWork

    library = we call the code
    framework = framework call the our code

## Page

react-router-dom없이 pages 폴더 안에 파일만 생성하면 페이지처리 해줌

## Pre-render

CSR

리액트에서는 실제 html은 그저 root div하나 뿐이다.

브라우저가 자바스크립트를 불러서 UI 생성

실제 html은 비어잇음

스크립트가 오지않는 한 첫 화면은 새하얀 화면.

Next.js는 서버에서 실제로 빌드된(ui가 생성되어 있는) html을 먼저 보내준다. (SSR)

그 후 react.js가 전송되면 그때부터 react.js 앱이 된다.

이 과정을 Hydration이라 한다.

## Link

기존 a태그로 이동하면 우리가 원하는 클라이언트사이드 페이지 이동이 되지 않고 새로 로드되는 것을 확인할 수 있다. 그래서 next.js에서 제공하는 링크컴포넌트 활용

```js
import Link from "next/link";

const Navbar = () => (
	<Link href='/'>
		<a
			// Link의 props로 커스텀할 수 없어서 a태그를 감싸고 커스텀한다.
			style={{ color: router.pathname === "/" ? "red" : "blue" }}
			className='hello'
		>
			HOME
		</a>
	</Link>
);
```

## styled jsx

```js
const Navbar = () => {
	const router = useRouter();

	return (
		<nav className={styles.nav}>
			<Link href='/'>
				<a>HOME</a>
			</Link>
			<Link href='/about'>
				<a>About</a>
			</Link>
			// 이 모듈에 독립적으로 적용되는 css
			<style jsx>{`
				nav {
					background-color: tomato;
				}
				a {
					text-decoration: none;
				}
			`}</style>
		</nav>
	);
};
```

## \_app

next.js는 페이지별로 필요한 코드만 적용하기 때문에 전체적으로 공통 적용하려는 로직이나 스타일, ui가 있다면 \_app.js파일을 활용한다.

```js
import Navbar from "../components/Navbar";
import "../styles/globals.css";
// CSS 파일 또한 페이지별로는 모듈만 import할 수 있다. 글로벌한 css를 적용하려면 _app.js파일에서 import해야된다.

export default function App({ Component, pageProps }) {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
			<style jsx global>
				{`
					a {
						color: white;
					}
				`}
			</style>
		</>
	);
}
```

## redirects / rewrite

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/contact", // 들어간 주소
				destination: "/form", // 리다이렉트할 주소
				permanent: false, // 브라우저나 검색엔진이 기억할지 여부
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/api/movies", // 요청할 주소
				destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
				// 실제 요청하는 api 주소
			},
		];
	},
};

module.exports = nextConfig;
```

## getServerSideProps

next.js는 client와 server 구조로 나뉘어져있다.

서버에서 실행하는 함수들이 있고 클라이언트에서 적용할 수 있는 함수들이 나뉘어져 있다.

```js
export default function Home({ result }) {}

export async function getServerSideProps() {
	const { results } = await (await fetch("/api/movies")).json();
	return {
		props: {
			results,
		},
	};
}
```

서버에서 페이지 html을 보내줄 때 필요한 것은 props로 담아서 보내줄 수 있다.

## router

```js
const onClick = (id, title) => {
	router.push(
		{
			pathname: `/movies/${id}`,
			query: {
				id,
				title,
			},
		},
		`/movies/${id}` // url을 마스킹해준다.
	);
};
```

매번 fetch를 선택할 수도 있지만 처음 홈페이지에서 가지고 있는 데이터라면 url과 같이 보내서 로딩시간을 줄이는 것도 괜찮은 것 같다.

## catch-all url

```zsh
// [...id].js

/ movie / 11 / 22 / 33 / 44 / 55;

query: {
	id: [11, 22, 33, 44, 55];
}
```

쿼리들을 배열로 묶어서 한번에 접근할 수 있게 도와준다.
