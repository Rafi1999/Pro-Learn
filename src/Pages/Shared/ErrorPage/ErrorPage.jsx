
import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const { error, status } = useRouteError()
  return (
    <section className='flex items-center h-screen p-16 text-gray-900'>
      <div className='container flex flex-col items-center justify-center px-5'>
        <img src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg" className='w-1/2' alt="" />
        <div className='max-w-md text-center'>
          <h2 className='mb-7 font-extrabold text-8xl text-gray-600'>
            <span className='sr-only'>Error</span> {status || 404}
          </h2>
          <p className='text-2xl font-semibold md:text-3xl mb-6'>
            {error?.message}
          </p>
          <Link
            to='/'
            className='btn font-semibold rounded-xl bg-cyan-300 text-gray-900 hover:bg-cyan-400'
          >          
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage