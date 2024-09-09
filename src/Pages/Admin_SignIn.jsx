function LoginForm() {
	return (
		<>
			<section className="h-screen flex">
				<div className="flex m-auto flex-col  ">
					<h1 className=" text-center text-4xl sm:text-6xl  lg:text-8xl uppercase font-bold text-white mb-10 ">
						Admin Sign in
					</h1>
					<form
						className="flex flex-col flex-grow  gap-5 p-3 lg:p-5 lg:mx-20 justify-center lg:items-center w-72   sm:self-center"
						action="">
						<input
							className="lg:px-5 px-3 lg:py-3 py-2   text-xs lg:text-base rounded-xl   lg:w-full outline lg:min-w-[500px] lg:min-h-[50px] outline-black"
							type="text"
							name=""
							id=""
							placeholder="Email"
						/>
						<input
							className="lg:px-5 px-3 lg:py-3 py-2   text-xs lg:text-base rounded-xl  lg:w-full outline lg:min-w-[500px] lg:min-h-[50px] outline-black"
							type="text"
							name=""
							id=""
							placeholder="password"
						/>
						<button
							className="bg-white py-1 px-3 lg:py-3 lg:px-5 rounded-xl text-lg lg:text-2xl text-black font-bold uppercase tracking-wider self-center "
							type="button">
							Submit
						</button>
					</form>
					{/* <button className="text-white text-lg font-semibold tracking-wider">forgot password?</button> */}
				</div>
			</section>
		</>
	);
}
export default LoginForm;
